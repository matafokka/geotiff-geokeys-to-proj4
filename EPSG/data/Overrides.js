/**
 * Some parameters must be overridden or transformed in some way. This function performs all necessary transforms.
 * @param tokens {Record<string, string | undefined | null>} Proj4 string tokens
 * @param geoKeys {Record<string, number>} Geokeys
 */
module.exports = function override(tokens, geoKeys) {
	let proj = tokens["+proj"], a = tokens["+a"], b = tokens["+b"];

	// Some geokeys should be mapped to different Proj4 parameters than specified in PCSKeys.js

	if (proj === "cea") {
		tokens["+lat_ts"] = tokens["+lat_1"];
		delete tokens["+lat_1"];
	}

	if (proj === "merc") {
		tokens["+lat_ts"] = tokens["+lat_0"];
		delete tokens["+lat_0"];
	}

	const crsCode = geoKeys.ProjectedCRSGeoKey || geoKeys.ProjectedCSTypeGeoKey;

	// Web Mercator requires a sphere.
	// Original CRS defines an ellipsoid for some reason, it also should be replaced with a sphere.
	// See: https://github.com/matafokka/geotiff-geokeys-to-proj4/issues/7
	if (crsCode === 3857 && tokens["+a"]) {
		tokens["+b"] = tokens["+a"];
	}

	// These projections doesn't work with spheres, proj4 requires +approx parameter in this case
	if (a === b && a !== undefined && (proj === "tmerc" || proj === "utm" || proj === "etmerc"))
		tokens["+approx"] = null;
}