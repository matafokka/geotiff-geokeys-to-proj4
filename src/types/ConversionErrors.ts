import type { GeoKeys } from "@/types/GeoKeys";

/**
 * Which geokeys are not supported. Values are geokeys' EPSG codes.
 */
export type GeokeysNotSupportedErrors = { [K in keyof GeoKeys as `${K}NotSupported`]?: number };

/**
 * Errors that have occurred during conversion.
 *
 * If an error has not occurred, it won't be present in this object.
 *
 * **How to process these errors:**
 *
 * 1. If it's your program's user's GeoTIFF then show a warning.
 * 1. If it's your GeoTIFF then fix it.
 * 1. If you're sure that file is fine then please create an issue at
 * https://github.com/matafokka/geotiff-geokeys-to-proj4
 */
export interface ConversionErrors extends GeokeysNotSupportedErrors {
  /**
   * `true` when the specified CRS is both geodetic and projected, i.e. when both conditions are met:
   *
   * 1. `GeodeticCRSGeoKey` and/or `GeographicTypeGeoKey` is set.
   * 1. `ProjectedCRSGeoKey` and/or `ProjectedCSTypeGeoKey` is set.
   *
   * In this case, `GeographicTypeGeoKey` is used.
   *
   * The cause of this error is invalid geokeys.
   */
  bothGCSAndPCSAreSet?: boolean;

  /**
   * EPSG code of the specified CRS that either:
   *
   * 1. Can't be represented as Proj4 string.
   * 2. Is new and hasn't been added to this library.
   */
  CRSNotSupported?: number;

  /**
   * Geokey `GeogLinearUnitsGeoKey` is set to user-defined but `GeogLinearUnitSizeGeoKey` is not specified.
   *
   * In this case, it is assumed that every other key using this key is in meters.
   */
  GeogLinearUnitSizeGeoKeyNotDefined?: boolean;

  /**
   * Geokey `GeogAngularUnitsGeoKey` is set to user-defined but `GeogAngularUnitSizeGeoKey` is not specified.
   *
   * In this case, it is assumed that every other key using this key is in degrees.
   */
  GeogAngularUnitSizeGeoKeyNotDefined?: boolean;

  /**
   * Geokey `ProjLinearUnitsGeoKey` is set to user-defined but `ProjLinearUnitSizeGeoKey` is not specified.
   *
   * In this case, it is assumed that every other key using this key is in meters.
   */
  ProjLinearUnitSizeGeoKeyNotDefined?: boolean;

  /**
   * Conversion specified in `ProjectionGeoKey` is not supported by this library.
   *
   * Value is EPSG conversion code.
   */
  conversionNotSupported?: number;

  /**
   * Transformation specified in `ProjMethodGeoKey` or `ProjCoordTransGeoKey` is not supported by this library.
   *
   * Value is the projection's code.
   *
   * See http://geotiff.maptools.org/spec/geotiff6.html#6.3.3.3 for more information.
   */
  coordinateTransformationNotSupported?: number;

  /**
   * Vertical CS specified in `VerticalGeoKey` or `VerticalCSTypeGeoKey` is not supported by this library.
   *
   * Value is EPSG CS code.
   */
  verticalCsNotSupported?: number;

  /**
   * Vertical CS specified in `VerticalUnitsGeoKey` is not supported by this library.
   *
   * Value is EPSG units of measure code.
   */
  verticalCsUnitsNotSupported?: number;

  /**
   * Vertical datums are not supported by this library.
   *
   * This error is reported when vertical CRS is user-defined and `VerticalDatumGeoKey` is set.
   *
   * Value is EPSG datum code.
   */
  verticalDatumsNotSupported?: number;
}
