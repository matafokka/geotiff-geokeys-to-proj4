/* This script generates datums. Can be used standalone or in a worker. */

const KnownDatums = require("./data/KnownDatums.js");
const meridians = require("./data/GeogPrimeMeridianGeoKey.js");
const ellipsoids = require("./data/GeogEllipsoidGeoKey.js");
const forEach = require("./forEachEntryInEPSG.js");

const addedIds = {}; // For ensemble datums

forEach(`
	SELECT
		d.datum_code AS id,
		d.ellipsoid_code AS ellipsoid,
		d.prime_meridian_code AS pm,
		member_data.ellipsoid_code AS ref_ellipsoid,
		member_data.prime_meridian_code AS ref_pm
	FROM epsg.epsg_datum as d
		LEFT JOIN epsg.epsg_datumensemblemember member ON d.datum_code = member.datum_ensemble_code
		LEFT JOIN epsg.epsg_datum member_data on member_data.datum_code = member.datum_code
	WHERE
		d.datum_type NOT LIKE 'vertical' AND
		d.datum_type NOT LIKE 'engineering' AND
		(
			d.ellipsoid_code IS NOT NULL OR
			member_data.ellipsoid_code IS NOT NULL
		) AND
		(
			d.prime_meridian_code IS NOT NULL OR
			member_data.prime_meridian_code IS NOT NULL
		)
	-- Get newest ensemble datums realizations first
	ORDER BY member.datum_sequence DESC

`, (result) => {
	const id = result.id + "";

	if (addedIds[id])
		return;

	addedIds[id] = true;
	const meridian = (result.pm || result.ref_pm) + "";
	const ellipsoid = (result.ellipsoid || result.ref_ellipsoid) + "";
	let str = "";

	if (ellipsoid in ellipsoids)
		str += ellipsoids[ellipsoid];

	if (meridian in meridians)
		str += " +pm=" + meridians[meridian];

	if (KnownDatums[id])
		str += " +towgs84=" + KnownDatums[id];

	return str;
}, "GeogGeodeticDatumGeoKey", `/**
* Maps EPSG datums to their proj4 definition. Append values directly to Proj4 string.
* @type {Object}
*/`);