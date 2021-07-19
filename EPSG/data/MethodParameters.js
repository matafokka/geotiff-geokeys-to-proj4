/**
 * Maps methods' parameters to their Proj4 definitions.
 *
 * Based on data from epsg.org (not epsg.io!)
 *
 * @type {Object}
 */
module.exports = {
	"8801": "lat_0",
	"8802": "lon_0",
	"8805": "k_0",
	"8806": "x_0",
	"8807": "y_0",
	"8813": "alpha", // Source: http://geotiff.maptools.org/proj_list/hotine_oblique_mercator.html
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

	// For polar aspect azimuthal projections which Proj4 doesn't seem to support

	"8832": "lat_0",
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

	// Proj4 doesn't support commented parameters.
	// I feel like I should leave them here anyway.

	// "8811": "", // For an oblique projection, this is the latitude of the point at which the azimuth of the central line is defined.
	// "8812": "", // For an oblique projection, this is the longitude of the point at which the azimuth of the central line is defined
	// "8814": "", // The angle at the natural origin of an oblique projection through which the natural coordinate reference system is rotated to make the projection north axis parallel with true north.
	// "8830": "", // The longitude of the western limit of the first zone of a Transverse Mercator zoned grid system.
	// "8831": "" // The longitude width of a zone of a Transverse Mercator zoned grid system

	// Only used in krovak for the moment being. Hardcoded in Proj4. I'll leave them in case Proj4 will ever support them.
	// "8818": "lat_1", // Pseudo standard parallel
	// "8819": "k_0", // Scale factor on pseudo standard parallel

}