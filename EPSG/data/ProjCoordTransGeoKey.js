// Commented lines describes projections which are not defined in Proj4 and I can't find correct definition.
// Even libgeotiff doesn't provide those definitions, what can a simple person like me do then? Source: https://github.com/OSGeo/libgeotiff/blob/master/libgeotiff/geotiff_proj4.c

/**
 * Maps Coordinate Transformation Codes to "+proj" definitions
 * @type {Object}
 */
module.exports = {
	"1": "tmerc", // CT_TransverseMercator
	// "2": "", // CT_TransvMercator_Modified_Alaska
	"3": "omerc", // CT_ObliqueMercator
	"4": "labrd", // CT_ObliqueMercator_Laborde (source: https://www.bluemarblegeo.com/knowledgebase/GeoCalcPBW/Content/ClassDef/Projection/Projections/Laborde.html)
	// "5": "", // CT_ObliqueMercator_Rosenmund
	"6": "omerc +ellps=sphere", // CT_ObliqueMercator_Spherical. Assumed to be oblique mercator but using spherical ellipsoid.
	"7": "merc", // CT_Mercator
	"8": "lcc", // CT_LambertConfConic_2SP. For some reason, libgeotiff defines it exactly the same as CT_LambertConfConic_Helmert (source: https://github.com/OSGeo/libgeotiff/blob/7da5bacae7814c65ebb78f0b64e1141fbcb3de1e/libgeotiff/geotiff_proj4.c#L1237)
	"9": "lcc", // CT_LambertConfConic_Helmert, this one is 1SP.
	"10": "laea", // CT_LambertAzimEqualArea
	"11": "aea", // CT_AlbersEqualArea
	"12": "aeqd", // CT_AzimuthalEquidistant
	"13": "eqdc", // CT_EquidistantConic
	"14": "stere", // CT_Stereographic
	"15": "stere", // CT_PolarStereographic
	"16": "sterea", // CT_ObliqueStereographic
	"17": "eqc", // CT_Equirectangular
	"18": "cass", // CT_CassiniSoldner
	"19": "gnom", // CT_Gnomonic
	"20": "mill", // CT_MillerCylindrical
	"21": "ortho", // CT_Orthographic
	"22": "poly", // CT_Polyconic
	"23": "robin", // CT_Robinson
	"24": "sinu", // CT_Sinusoidal
	"25": "vandg", // CT_VanDerGrinten
	"26": "nzmg", // CT_NewZealandMapGrid
	"27": "tmerc +k_0=1", // CT_TransvMercator_SouthOriented
	"28": "cea", // Can't find this one in GeoTIFF docs, but it's CEA: https://download.osgeo.org/geotiff/samples/gdal_eg/cea.txt
}