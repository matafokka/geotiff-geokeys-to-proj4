/* This script generates GCS from epsg.io. Can be used standalone or in a worker. */

/*
Some EPSG GCS are using 3D cartesian coordinate systems (see https://en.wikipedia.org/wiki/Geographic_coordinate_system#3D_Cartesian_coordinates and https://en.wikipedia.org/wiki/Geographic_coordinate_conversion#From_ECEF_to_geodetic_coordinates).

There's no way to map images (2D planes) to such systems, that's why we won't support such GCS.

I don't know, Why GeoTIFF lists these GCS as supported.

GeoTIFF also contains ModelTiepointTag which can be used to specify XYZ coordinates of a set of points. However:
	1. It's unclear whether Z represents height or distance from the Earth's center.
	2. "this third dimension is provided in anticipation of future support for 3D digital elevation models and vertical coordinate systems".
So, for now, there's no standard use for this tag.
*/

const datums = require("./data/GeogGeodeticDatumGeoKey.js");
const conversions = require("./data/ProjectionGeoKey.js");
const Units = require("./data/Units.js");
const additionalCrs = require("./data/AdditionalCRS.js");
const forEach = require("./forEachEntryInEPSG.js");

function getObjectFromProjString(proj) {
	if (!proj)
		return {}

	const pairs = proj.split(" ");
	const obj = {};

	for (const pair of pairs) {
		const [key, value] = pair.split("=");
		obj[key] = value ?? null;
	}

	return obj;
}

// These CS have messed up description, but they're ok without transformation
const CS_IGNORE_ORIENTATION = {
	1035: true,
	1036: true,
	1037: true,
	1038: true,
	4499: true,
	4463: true,
	4464: true,
	4465: true,
	4466: true,
	4467: true,
	4468: true,
	4469: true,
	4470: true,
	6500: true,
}

const orientationLettersStr = "nsewud";
const ORIENTATION_LETTERS = {};

for (const letter of orientationLettersStr)
	ORIENTATION_LETTERS[letter] = true;

forEach(`
	SELECT crs.coord_ref_sys_code AS id,
		crs.coord_ref_sys_kind as type,
		cs.coord_sys_name as cs_name,
		crs.cmpd_horizcrs_code AS compound_base_crs,
		crs.datum_code AS datum,
		crs.base_crs_code AS base_crs,
		crs.projection_conv_code AS conversion,
		cs.coord_sys_code AS cs_id,
		base_crs_data.datum_code AS base_datum
	FROM epsg.epsg_coordinatereferencesystem as crs
		LEFT JOIN epsg.epsg_coordinatereferencesystem base_crs_data ON crs.base_crs_code = base_crs_data.coord_ref_sys_code
		LEFT JOIN epsg.epsg_coordinatesystem cs ON cs.coord_sys_code = crs.coord_sys_code
	WHERE crs.coord_ref_sys_kind NOT LIKE 'vertical' and crs.coord_ref_sys_kind NOT LIKE 'engineering'
	ORDER BY crs.coord_ref_sys_kind DESC
`, async (result, fetchedCRS) => {

	// Due to sorting, compound CRS comes last
	if (result.type === "compound")
		return fetchedCRS[result.compound_base_crs.toString()];

	let conversion = conversions[result.conversion + ""];

	if (!conversion) {
		if (result.type === "projected")
			return;
		else if (result.type === "geocentric")
			conversion = "geocent";
		else
			conversion = "longlat";
	}

	const datum = datums[result.datum] || datums[result.base_datum];

	// Datum is always present, but I like to check anyway
	if (!datum)
		return;

	const conversionKeys = getObjectFromProjString("+proj=" + conversion);
	const datumKeys = getObjectFromProjString(datum);

	for (const key in datumKeys) {
		conversionKeys[key] = datumKeys[key];
	}

	// Exceptions

	if (result.cs_id === 4468) {
		const value = parseFloat(conversionKeys["+lat_0"]);
		conversionKeys["+lat_0"] = (isNaN(value) ? 0 : value) + 90; // Not sure if it must be added or replaced
	}

	// Merge keys into a string

	let projStr = "";
	for (const key in conversionKeys) {
		projStr += key;
		const value = conversionKeys[key];

		if (value !== null) {
			projStr += "=" + value;
		}

		projStr += " ";
	}

	projStr = projStr.substring(0, projStr.length - 1);

	if (!result.cs_name)
		return projStr;

	// Get orientation

	// For some reason, CS parameters are merged into one string instead of being split to the columns
	// Example:
	// Ellipsoidal 3D CS. Axes: latitude, longitude, ellipsoidal height. Orientations: north, east, up. UoM: degree, degree, metre.
	// Let's just hope this structure won't change later, ha-ha.
	let sentencesStr = result.cs_name.toLowerCase(); // Normalize string, though, it already seems normalized
	if (sentencesStr.endsWith("."))
		sentencesStr = sentencesStr.substring(0, sentencesStr.length - 1);
	let sentences = sentencesStr.split(". ");

	// We don't need CS description and axes
	sentences.shift();
	sentences.shift();

	// Split each sentence into parameter name (string before column) and values separated by a comma
	// CRS should have two fields: orientations and uom
	// uom can have one (for all axes), two (for lon and lat) or three (for lon, lat and height) units.
	// The third one is always for height. We don't need it, so we'll ignore it later.
	let crs = {};
	for (let sentence of sentences) {
		let paramName = "", columnIndex = 0;
		for (let symbol of sentence) {
			columnIndex++; // Accounting space
			if (symbol === ":")
				break;
			paramName += symbol;
		}
		crs[paramName] = sentence.substring(columnIndex + 1).split(", ");
	}

	// Get orientation, i.e. +axis parameter

	let orientation = "";
	let isOrientationValid = !!crs.orientations;

	if (crs.orientations) {
		for (let direction of crs.orientations) {
			const firstLetter = direction[0];

			if (!ORIENTATION_LETTERS[firstLetter]) {
				if (!CS_IGNORE_ORIENTATION[result.cs_id])
					return;

				isOrientationValid = false;
				break;
			}

			orientation += firstLetter;
		}
	}

	// Validate orientation further
	if (isOrientationValid) {
		const letters = {};

		for (const letter of orientation) {
			letters[letter] = (letters[letter] || -1) + 1;

			if (letters[letter] > 1) {
				isOrientationValid = false;

				if (CS_IGNORE_ORIENTATION[result.cs_id])
					break;
				else
					return;
			}
		}
	}

	let uomsNames = {
		x: crs.uom[0],
		y: crs.uom[1]
	};

	if (!uomsNames.y)
		uomsNames.y = uomsNames.x;

	let uoms = {};
	let axes = ["x", "y"];
	let isAngle = false;
	for (let axis of axes) {
		let uom = uomsNames[axis];
		let m;
		if (uom === "deg" || uom === "degree" || uom === "degrees") { // Can't just find deg because there're degree with hemisphere and dec degree
			m = 1;
			isAngle = true;
		} else if (uom.includes("grad") || uom.includes("gon")) {
			m = Units["9105"].m * 180 / Math.PI;
			isAngle = true;
		} else if (uom.includes("rad")) { // grad handled by previous case
			m = Units["9101"].m * 180 / Math.PI;
			isAngle = true;
		} else if (uom === "m" || uom.includes("met"))
			m = 1;
		else if (uom === "ft")
			m = 0.3048;
		else if (uom === "ftus")
			m = 0.3048006096;
		else if (uom === "ydind")
			m = 0.3047995;
		else if (uom === "ftcla")
			m = 0.3047972654;
		else if (uom === "ydcl")
			m = 3.3047972654;
		else if (uom === "chbnb")
			m = Units["9042"].m;
		else if (uom === "chse")
			m = 20.1167651215526;
		else if (uom === "chse(t)")
			m = 20.116756;
		else if (uom === "ftgc")
			m = 0.304799710181509;
		else if (uom === "ftse")
			m = 0.304799471538676;
		else if (uom === "km")
			m = 1000;
		else if (uom === "lkcla")
			m = 0.201166195164;
		else if (uom === "ydse")
			m = 0.914398414616029;
		else if (uom === "glm")
			m = 1.0000135965;
		else if (uom === "lk")
			m = 0.201168;
		else
			return;

		// Uoms doesn't use other units than specified above for now, but let's kinda future-proof it
		if (uom.includes("μ") || (isAngle && uom.includes("m")))
			m *= 0.000001;
		uoms[axis] = m;
	}

	if (orientation && isOrientationValid)
		projStr += " +axis=" + orientation;

	if (!isAngle && uoms.x == uoms.y && uoms.x) {
		if (uoms.x !== 1)
			projStr += " +to_meter=" + uoms.x;
	} else if (uoms.x || uoms.y) {
		return {
			p: projStr,
			x: uoms.x,
			y: uoms.y,
		}
	}

	return projStr;
}, "CRS", `/**
* Maps EPSG CRS to their proj4 definitions. Should be a base for Proj4 string.
* Corresponding geokeys are GeographicTypeGeoKey and ProjectedCSTypeGeoKey.
* @type {Object}
*/`, (obj) => {
	for (const key in additionalCrs) {
		if (!obj[key])
			obj[key] = additionalCrs[key]
	}
});