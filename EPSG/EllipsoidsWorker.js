/* This script generates ellipsoids from epsg database. Can be used standalone or in a worker. */

const forEach = require("./forEachEntryInEPSG.js");
const Units = require("./data/Units.js");
const names = require("./data/EllipsoidsNamesToProj.js");

forEach(`
	SELECT e.ellipsoid_code  AS id,
	       e.ellipsoid_name  AS name,
	       e.semi_major_axis AS a,
	       e.semi_minor_axis AS b,
	       e.inv_flattening  AS f,
	       e.uom_code        AS uom
	FROM epsg.epsg_ellipsoid AS e
`, (result) => {

	// Get ellipsoid definition
	let ellipsoidString = "";
	let fromCode = names[result.id.toString()];
	if (fromCode)
		ellipsoidString = fromCode;
	else {
		let prevName = "";
		for (let name in names) {
			if (result.name.startsWith(name) && name.length > prevName.length) {
				prevName = name;
				ellipsoidString = names[name];
			}
		}
	}

	if (ellipsoidString !== "")
		ellipsoidString = "+ellps=" + ellipsoidString + " ";

	// Get axes
	let uom = Units[result.uom.toString()];
	if (!uom)
		return undefined;
	uom = uom.m;

	let a = result.a * uom, b = result.b * uom;
	if (result.f)
		b = a - a / result.f;

	if (!a || !b)
		return;

	return `${ellipsoidString}+a=${a} +b=${b}`;
}, "GeogEllipsoidGeoKey", `/**
* Maps EPSG ellipsoids to their data. Proj4 parameter is "+ellps".
* @type {Object}
*/`);