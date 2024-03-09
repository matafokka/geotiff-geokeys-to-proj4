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
const additionalCrs = require("./data/AdditionalCRS.js");
const forEach = require("./forEachEntryInEPSG.js");
const csNameToObj = require("./utils/csNameToObj.js");
const csUomToMultiplier = require("./utils/csUomToMultiplier.js");
const verticalCS = require("./data/VerticalCS.js");

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
		crs.cmpd_horizcrs_code AS compound_horizontal_crs,
		crs.cmpd_vertcrs_code AS compound_vertical_crs,
		crs.datum_code AS datum,
		crs.base_crs_code AS base_crs,
		crs.projection_conv_code AS conversion,
		cs.coord_sys_code AS cs_id,
		base_crs_data.datum_code AS base_datum,
		base_crs_data.coord_sys_code AS base_crs_cs_code,
		vertical_crs_data.coord_sys_code AS vertical_cs
	FROM epsg.epsg_coordinatereferencesystem as crs
		LEFT JOIN epsg.epsg_coordinatereferencesystem base_crs_data ON crs.base_crs_code = base_crs_data.coord_ref_sys_code
		LEFT JOIN epsg.epsg_coordinatesystem cs ON cs.coord_sys_code = crs.coord_sys_code
		LEFT JOIN epsg.epsg_coordinatereferencesystem vertical_crs_data ON crs.cmpd_vertcrs_code = vertical_crs_data.coord_ref_sys_code
	WHERE crs.coord_ref_sys_kind NOT LIKE 'engineering'
	-- Make compound CRS and derived CRS come last, so we can reference previously fetched CRS
	ORDER BY crs.coord_ref_sys_kind DESC, crs.base_crs_code DESC
`, async (result, fetchedCRS) => {

	// Due to sorting, compound CRS comes last
	if (result.type === "compound") {
		const horizontalCRS = fetchedCRS[result.compound_horizontal_crs.toString()];
		const z = verticalCS[result.vertical_cs.toString()];

		if (!horizontalCRS || !z)
			return;

		if (typeof horizontalCRS === "string") {
			return {
				p: horizontalCRS,
				x: 1,
				y: 1,
				z,
			}
		}

		return { ...horizontalCRS, z };
	}

	// Return multiplier for vertical CRS
	if (result.type === "vertical") {
		return verticalCS[result.cs_id?.toString()] || verticalCS[result.base_crs_cs_code?.toString()];
	}

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

	// Get orientation, i.e. +axis parameter

	const cs = csNameToObj(result.cs_name);
	let orientation = "";
	let isOrientationValid = !!cs.orientations;

	if (cs.orientations) {
		for (let direction of cs.orientations) {
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

	const isVertical = result.type === "vertical";

	let uomsNames = {
		x: cs.uom[0],
		y: cs.uom[1],
		z: cs.uom[isVertical ? 0 : 2],
	};

	const isGeographic3d = result.type === "geographic 3D";
	const isGeocentric = result.type === "geocentric";

	if (!isGeographic3d && !isGeocentric)
		delete uomsNames.z;

	if (!uomsNames.y)
		uomsNames.y = uomsNames.x;

	if (!uomsNames.z) {
		if (isGeographic3d || isVertical)
			return;

		if (isGeocentric)
			uomsNames.z = uomsNames.x;
	}

	let uoms = {};
	let axes = ["x", "y", "z"];
	let isAngle = false;

	for (let axis of axes) {
		if (!uomsNames[axis])
			continue;

		const multiplier = csUomToMultiplier(uomsNames[axis]);

		if (!multiplier.m)
			return;

		isAngle = isAngle || multiplier.isAngle;
		uoms[axis] = multiplier.m;
	}

	if (orientation && isOrientationValid)
		projStr += " +axis=" + orientation;

	if (!isAngle && uoms.x == uoms.y && uoms.x) {
		if (uoms.x !== 1)
			projStr += " +to_meter=" + uoms.x;
	} else if (uoms.x || uoms.y) {
		return {
			p: projStr,
			...uoms,
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