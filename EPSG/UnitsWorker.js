/* This script generates units from EPSG database. Can be used standalone or in a worker. */

const BaseUnits = require("./data/KnownBaseUnits.js");
const forEach = require("./forEachEntryInEPSG.js");

forEach(`
	SELECT u.uom_code AS id, u.factor_b AS b, u.factor_c AS c, u.target_uom_code AS baseunit
	FROM epsg.epsg_unitofmeasure AS u
`, (result) => {

	// If current unit is base unit, no multiplication needed
	let baseUnit = BaseUnits[result.id.toString()];
	if (baseUnit) {
		return {
			m: 1,
			t: baseUnit,
		};
	}

	// If current unit is base but can't be used in GeoTIFF
	if (result.id === result.baseunit || result.b === null || result.c === null)
		return;

	baseUnit = BaseUnits[result.baseunit.toString()];
	if (!baseUnit)
		return;

	return {
		m: result.b / result.c,
		t: baseUnit,
	};

}, "Units", `/**
* Maps EPSG units to their multipliers to convert to meters (or standard base values, see below). Proj4 parameter is "+to_meter".
* 
* Some of these units for some reason represents speed, angular speed and time. They're converted to m/s, rad/s and s respectively. Moreover, there's unity and unity/s where length is dimensionless. I guess, they should be treated as meters when projecting.
*
* Each value is an object where \`t\` is unit description and \`m\` is a multiplier.
*
* @type {Object}
*/`);