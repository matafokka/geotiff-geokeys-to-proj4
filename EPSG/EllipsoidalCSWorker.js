/* This script generates ellipsoidal CS from epsg.io. Can be used standalone or in a worker. */

const Units = require("./data/Units.js");
const forEach = require("./forEachEntryInEPSG.js");

forEach(`
	SELECT c.coord_sys_code AS id, c.coord_sys_name AS d
	FROM epsg.epsg_coordinatesystem AS c
	WHERE c.coord_sys_type LIKE 'ellipsoidal'
	   OR c.coord_sys_type LIKE 'spherical'
`, (result) => {

	// For some reason, CS parameters are merged into one string instead of being split to the columns
	// Example:
	// Ellipsoidal 3D CS. Axes: latitude, longitude, ellipsoidal height. Orientations: north, east, up. UoM: degree, degree, metre.
	// Let's just hope this structure won't change later, ha-ha.
	let sentencesStr = result.d.toLowerCase(); // Normalize string, though, it already seems normalized
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

	let orientation = "";
	for (let direction of crs.orientations)
		orientation += direction[0];

	let uomsNames = {
		x: crs.uom[0],
		y: crs.uom[1]
	};

	if (!uomsNames.y) // noinspection JSSuspiciousNameCombination
		uomsNames.y = uomsNames.x;

	let uoms = {};
	let axes = ["x", "y"];
	for (let axis of axes) {
		let uom = uomsNames[axis];
		let m;
		if (uom === "deg" || uom === "degree" || uom === "degrees") // Can't just find deg because there're degree with hemisphere and dec degree
			m = 1;
		else if (uom.includes("grad") || uom.includes("gon"))
			m = Units["9105"].m * 180 / Math.PI;
		else if (uom.includes("rad")) // grad handled by previous case
			m = Units["9101"].m * 180 / Math.PI;
		else
			return;

		// CRS uoms doesn't use other units than specified above for now, but let's kinda future-proof it
		if (uom.includes("μ") || uom.includes("m"))
			m *= 0.000001;
		uoms[axis] = m;
	}

	return {
		axis: orientation,
		x: uoms.x,
		y: uoms.y,
	};

}, "EllipsoidalCS", `/**
* Maps EPSG ellipsoidal and spherical CS to their proj4 definitions. Values are objects where:
* axis - "+axis" Proj4 parameter.
* x, y - value to multiply x or y coordinates by to convert them to degrees. If it's not present, multiplication is not needed.
* @type {Object}
*/`);