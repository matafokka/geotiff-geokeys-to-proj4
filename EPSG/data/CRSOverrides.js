/**
 * Some geokeys should be mapped to different Proj4 parameters than specified in PCSKeys.js. This object provides a list of such overrides.
 *
 * Keys are projection names and values are objects where keys are original Proj4 parameters and values are their overrides.
 *
 * @type {Object}
 */
module.exports = {
	"cea": {
		"+lat_1": "+lat_ts",
	}
}