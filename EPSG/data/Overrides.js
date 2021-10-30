/**
 * Some parameters must be overridden or transformed in some way. This function performs all necessary transforms.
 * @param tokens
 */
module.exports = function override(tokens) {
	let proj = tokens["+proj"], a = tokens["+a"], b = tokens["+b"];

	// Some geokeys should be mapped to different Proj4 parameters than specified in PCSKeys.js
	// For now, only this transform is known. Others might come up later.
	if (proj === "cea") {
		tokens["+lat_ts"] = tokens["+lat_1"];
		delete tokens["+lat_1"];
	}

	// These projections doesn't work with spheres, proj4 requires +approx parameter in this case
	if (a === b && a !== undefined && (proj === "tmerc" || proj === "utm" || proj === "etmerc"))
		tokens["+approx"] = null;
}