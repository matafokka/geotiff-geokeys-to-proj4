/* This script generates meridians from epsg database. Can be used standalone or in a worker. */

const forEach = require("./forEachEntryInEPSG.js");
const toDeg = require("./data/toDeg.js");

forEach(`
	SELECT pm.prime_meridian_code AS id, pm.greenwich_longitude AS lng, pm.uom_code AS uom
	FROM epsg.epsg_primemeridian AS pm
`, (result) => {
	let degs = toDeg(result.lng, result.uom);
	if (degs === null)
		return undefined;
	return degs;
}, "GeogPrimeMeridianGeoKey", `/**
* Maps EPSG prime meridians to their longitudes. Proj4 parameter is "+pm".
* @type {Object}
*/`);
