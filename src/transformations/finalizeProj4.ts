import type { GeoKeys } from "@/types/GeoKeys";
import { toFixed } from "@/utils/math";

/**
 * Applies final Proj4 string transformations
 *
 * @param obj Proj4 string tokens
 * @param geoKeys Geokeys
 */
export function finalizeProj4(obj: Record<string, string | undefined>, geoKeys: GeoKeys) {
  const proj = obj["+proj"];
  const a = obj["+a"];
  const b = obj["+b"];

  // Some geokeys should be mapped to different Proj4 parameters than specified in PCSKeys

  if (proj === "cea") {
    obj["+lat_ts"] = obj["+lat_1"];
    delete obj["+lat_1"];
  }

  if (proj === "merc") {
    obj["+lat_ts"] = obj["+lat_0"];
    delete obj["+lat_0"];
  }

  const crsCode = geoKeys.ProjectedCRSGeoKey || geoKeys.ProjectedCSTypeGeoKey;

  // Web Mercator requires a sphere.
  // Original CRS defines an ellipsoid for some reason, it also should be replaced with a sphere.
  // See: https://github.com/matafokka/geotiff-geokeys-to-proj4/issues/7

  if (crsCode === 3857 && obj["+a"]) {
    obj["+b"] = obj["+a"];
  }

  // These projections don't work with spheres, Proj4 requires +approx parameter in this case
  if (a === b && a !== undefined && (proj === "tmerc" || proj === "utm" || proj === "etmerc")) {
    delete obj["+approx"];
  }

  // Prettify numbers
  for (const key in obj) {
    const value = obj[key];
    const float = toFixed(Number(value || "-"));

    if (!isNaN(float)) {
      obj[key] = float + "";
    }
  }
}
