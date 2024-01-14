/* This script generates conversions (used by GeoTIFF as ProjectionGeoKey). Can be used standalone or in a worker. */

const methods = require("./data/Methods.js")
const parameters = require("./data/MethodParameters.js");
const Units = require("./data/Units.js");
const toDeg = require("./data/toDeg.js");
const forEach = require("./forEachEntryInEPSG.js");

forEach(`
	SELECT op.coord_op_code                                                  AS id,
	       op.coord_op_method_code                                           AS method,
	       json_agg((param.parameter_code, param.parameter_value, uom_code)) AS params
	FROM epsg.epsg_coordoperation op
		     INNER JOIN
	     epsg.epsg_coordoperationmethod method ON op.coord_op_method_code = method.coord_op_method_code
		     INNER JOIN
	     epsg.epsg_coordoperationparamvalue param ON op.coord_op_code = param.coord_op_code
	GROUP BY id
`, (result) => {

	let method = methods[result.method.toString()];
	if (!method)
		return;

	for (let param of result.params) {
		let paramDef = parameters[param.f1.toString()], value = param.f2, uomCode = param.f3.toString();
		if (!paramDef)
			continue;

		if (uomCode in Units) {
			let {m} = Units[uomCode];
			if (paramDef.includes("lat") || paramDef.includes("lon") || paramDef.includes("alpha") || paramDef.includes("gamma"))
				m *= 180 / Math.PI; // Radians are angular base units
			value *= m;
		} else
			value = toDeg(value, param.f3);

		if (value === null)
			return;

		method += ` +${paramDef}=${value}`
	}

	return method;

}, "ProjectionGeoKey", `/**
* Maps EPSG conversions to their proj4 definitions.
* Corresponding geokeys are GeographicTypeGeoKey and ProjectedCSTypeGeoKey.
* @type {Object}
*/`);