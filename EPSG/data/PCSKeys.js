/**
 *
 * Fields of this object contains mapping of some "simple" PCS keys to an object where:
 * 1. `p` - Proj4 definitions
 * 1. `u` - If set to 1, units are angular. if 2 -- linear, and 3 -- ratio.
 *
 * Yup, there's an object in an object. Fields of this object are o1, o2 and o3. Latter Fields takes precedence over previous ones. Let me explain.
 *
 * GeoTIFF defines following centers: natural origin, projection center and just center. Natural and projection's centers seems to have no difference at all, even libgeotiff defines them as same. Proj4 doesn't support natural origins, so projection's center should take precedence.
 *
 * And there's "just center" which appears to be as same as the other centers. Though, libgeotiff doesn't support it at all. So, let's assume them to be as same as the other centers and make other centers override them.
 *
 * So the centers hierarchy is following: "just center", natural origin, projection center.
 *
 * @type {Object}
 */
let k = {

	/**
	 * Keys without overrides and "just center" keys
	 */
	o1: {
		ProjStdParallel1GeoKey: {
			u: 1,
			p: "lat_1"
		},
		ProjStdParallel2GeoKey: {
			u: 1,
			p: "lat_2"
		},

		ProjCenterLongGeoKey: {
			u: 1,
			p: "lon_0"
		},
		ProjCenterLatGeoKey: {
			u: 1,
			p: "lat_0"
		},
		ProjCenterEastingGeoKey: {
			u: 2,
			p: "x_0"
		},
		ProjCenterNorthingGeoKey: {
			u: 2,
			p: "y_0"
		},
		ProjScaleAtCenterGeoKey: {
			u: 3,
			p: "k_0"
		},
	},

	/**
	 * Natural origin keys
	 */
	o2: {
		ProjNatOriginLongGeoKey: {
			u: 1,
			p: "lon_0"
		},
		ProjNatOriginLatGeoKey: {
			u: 1,
			p: "lat_0"
		},
		ProjFalseOriginEastingGeoKey: {
			u: 2,
			p: "x_0"
		},
		ProjFalseOriginNorthingGeoKey: {
			u: 2,
			p: "y_0"
		},
		ProjScaleAtNatOriginGeoKey: {
			u: 3,
			p: "k_0"
		},
	},


	/**
	 * Projection center keys
	 */
	o3: {
		ProjFalseOriginLongGeoKey: {
			u: 1,
			p: "lon_0"
		},
		ProjFalseOriginLatGeoKey: {
			u: 1,
			p: "lat_0"
		},
		ProjFalseEastingGeoKey: {
			u: 2,
			p: "x_0"
		},
		ProjFalseNorthingGeoKey: {
			u: 2,
			p: "y_0"
		},
	}
}

// Aliases

k.o2.ProjStdParallelGeoKey = k.o1.ProjStdParallel1GeoKey;
k.o3.ProjOriginLongGeoKey = k.o2.ProjNatOriginLongGeoKey;
k.o3.ProjOriginLatGeoKey = k.o2.ProjNatOriginLatGeoKey;
k.o3.ProjScaleAtOriginGeoKey = k.o2.ProjScaleAtNatOriginGeoKey;

module.exports = k;