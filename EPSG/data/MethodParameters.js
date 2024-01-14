/**
 * Maps methods' parameters to their Proj4 definitions.
 *
 * Based on data from epsg.org, enriched by manually querying epsg.io
 *
 * @type {Object}
 */
module.exports = {
	"1036": "alpha",
	"1039": "h_0",
	"8801": "lat_0",
	"8802": "lon_0",
	"8805": "k_0",
	"8806": "x_0",
	"8807": "y_0",
	"8811": "lat_0", // For an oblique projection, this is the latitude of the point at which the azimuth of the central line is defined
	"8812": "lonc", // For an oblique projection, this is the longitude of the point at which the azimuth of the central line is defined
	"8813": "alpha", // Source: http://geotiff.maptools.org/proj_list/hotine_oblique_mercator.html
	"8814": "gamma", // The angle at the natural origin of an oblique projection through which the natural coordinate reference system is rotated to make the projection north axis parallel with true north.
	"8815": "k_0",
	"8816": "x_0",
	"8817": "y_0",
	"8821": "lat_0",
	"8822": "lon_0",
	"8823": "lat_1",
	"8824": "lat_2",
	"8826": "x_0",
	"8827": "y_0",
	"8828": "lat_0",
	"8829": "lon_0",

	// For polar aspect azimuthal projections

	"8832": "lat_ts",
	"8833": "lon_0",

	// For topocentric CS

	"8834": "lat_0",
	"8835": "lon_0",
	"8836": "h_0",
	"8837": "X_0",
	"8838": "Y_0",
	"8839": "Z_0",

	// For vertical perspective projections

	"8840": "h",

	// Proj4 transforms parameters

	"8601": "dlat",
	"8602": "dlon",
	"8603": "dh",
	"8604": "dh",
	"8605": "dx",
	"8606": "dy",
	"8607": "dz",
	"8608": "rx",
	"8609": "ry",
	"8610": "rz",
	"8611": "s",

	// Only used in krovak for the moment being
	// "8818": "lat_1", // Pseudo standard parallel, not sure if it's not supported by Proj4 or hardcoded into it
	"8819": "k_0", // Scale factor on pseudo standard parallel

	// Proj4 doesn't support commented parameters.
	// I feel like I should leave them here anyway.

	// "8814": "",
	// "8830": "", // The longitude of the western limit of the first zone of a Transverse Mercator zoned grid system.
	// "8831": "" // The longitude width of a zone of a Transverse Mercator zoned grid system

}