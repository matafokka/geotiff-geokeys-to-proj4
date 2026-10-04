/** Conversion parameters that transform a coordinate into units accepted by proj4 */
export interface CoordinateConversionParameters {
  /** X multiplier */
  x: number;

  /** Y multiplier */
  y: number;

  /** Z multiplier */
  z: number;
}

/** A coordinate in a concrete GeoTIFF's CRS. This is **not** a pixel coordinate! */
export interface SourceCoordinate {
  /** X Coordinate */
  x: number;

  /** Y coordinate */
  y: number;

  /**
   * Z coordinate (pixel value).
   *
   * If you don't need heights omit this value. The resulting Z coordinate will be 0.
   */
  z?: number;
}

/** Coordinate in a target CRS */
export interface ConvertedCoordinate {
  /** X coordinate (coordinate of a first axis of CRS) of a point */
  x: number;

  /** Y coordinate (coordinate of a second axis of CRS) of a point */
  y: number;

  /**
   * Z coordinate (coordinate of a third axis of CRS) of a point, i.e. transformed pixel value. Always points up.
   *
   * If source coordinate doesn't have Z axis then this will be 0.
   */
  z: number;
}
