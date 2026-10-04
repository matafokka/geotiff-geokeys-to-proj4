// Commented lines describes projections which are not defined in Proj4. I couldn't find the correct definitions.
// Even libgeotiff doesn't provide the definitions, what can a simple person like me do then?
// Source: https://github.com/OSGeo/libgeotiff/blob/master/libgeotiff/geotiff_proj4.c

/**
 * Maps Coordinate Transformation Codes to "+proj" definitions
 */
export const ProjCoordTransGeoKey: Record<string, string | undefined> = {
  "1": "+proj=tmerc", // CT_TransverseMercator
  // "2": "", // CT_TransvMercator_Modified_Alaska
  "3": "+proj=omerc", // CT_ObliqueMercator
  "4": "+proj=labrd", // CT_ObliqueMercator_Laborde (source: https://www.bluemarblegeo.com/knowledgebase/GeoCalcPBW/Content/ClassDef/Projection/Projections/Laborde.html)
  // "5": "", // CT_ObliqueMercator_Rosenmund
  "6": "+proj=omerc +ellps=sphere", // CT_ObliqueMercator_Spherical. Assumed to be oblique mercator but using spherical ellipsoid.
  "7": "+proj=merc", // CT_Mercator
  "8": "+proj=lcc", // CT_LambertConfConic_2SP. For some reason, libgeotiff defines it exactly the same as CT_LambertConfConic_Helmert (source: https://github.com/OSGeo/libgeotiff/blob/7da5bacae7814c65ebb78f0b64e1141fbcb3de1e/libgeotiff/geotiff_proj4.c#L1237)
  "9": "+proj=lcc", // CT_LambertConfConic_Helmert, this one is 1SP.
  "10": "+proj=laea", // CT_LambertAzimEqualArea
  "11": "+proj=aea", // CT_AlbersEqualArea
  "12": "+proj=aeqd", // CT_AzimuthalEquidistant
  "13": "+proj=eqdc", // CT_EquidistantConic
  "14": "+proj=stere", // CT_Stereographic
  "15": "+proj=stere", // CT_PolarStereographic
  "16": "+proj=sterea", // CT_ObliqueStereographic
  "17": "+proj=eqc", // CT_Equirectangular
  "18": "+proj=cass", // CT_CassiniSoldner
  "19": "+proj=gnom", // CT_Gnomonic
  "20": "+proj=mill", // CT_MillerCylindrical
  "21": "+proj=ortho", // CT_Orthographic
  "22": "+proj=poly", // CT_Polyconic
  "23": "+proj=robin", // CT_Robinson
  "24": "+proj=sinu", // CT_Sinusoidal
  "25": "+proj=vandg", // CT_VanDerGrinten
  "26": "+proj=nzmg", // CT_NewZealandMapGrid
  "27": "+proj=tmerc +k_0=1", // CT_TransvMercator_SouthOriented
  "28": "+proj=cea", // Can't find this one in GeoTIFF docs, but it's CEA: https://download.osgeo.org/geotiff/samples/gdal_eg/cea.txt
};
