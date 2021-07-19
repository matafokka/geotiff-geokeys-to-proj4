/* This script generates datums from epsg.io. Can be used standalone or in a worker. */

const KnownDatums = require("./data/KnownDatums.js");
const meridians = require("./data/GeogPrimeMeridianGeoKey.js");
const ellipsoids = require("./data/GeogEllipsoidGeoKey.js");
const forEach = require("./forEachEntryInEPSG.js");

forEach(`
	SELECT d.datum_code AS id, d.ellipsoid_code AS e, d.prime_meridian_code AS pm
	FROM epsg.epsg_datum AS d
	WHERE (d.ellipsoid_code IS NOT NULL OR d.prime_meridian_code IS NOT NULL)
	  AND d.datum_type NOT LIKE 'vertical'
	  AND d.datum_type NOT LIKE 'engineering'
`, (result) => {
	let meridian = result.pm.toString();
	let ellipsoid = result.e.toString();

	let str = "";
	if (ellipsoid in ellipsoids)
		str += ellipsoids[ellipsoid];
	if (meridian in meridians)
		str += " +pm=" + meridians[meridian];

	let index = result.id.toString();
	if (KnownDatums[index])
		str += " +towgs84=" + KnownDatums[index];

	return str;
}, "GeogGeodeticDatumGeoKey", `/**
* Maps EPSG datums to their proj4 definition. Append values directly to Proj4 string.
* @type {Object}
*/`);