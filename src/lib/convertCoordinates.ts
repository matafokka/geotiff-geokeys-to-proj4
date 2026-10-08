import type { ConvertedCoordinate, CoordinateConversionParameters, SourceCoordinate } from "@/lib/types/coordinates";

/**
 * Converts given coordinates to the coordinates accepted by Proj4.
 *
 * Accepts only CRS coordinates, not pixel coordinates!
 *
 * @param coord Source coordinate
 * @param parameters Conversion parameters
 * @return Converted coordinates
 */
export function convertCoordinates(
  coord: SourceCoordinate,
  parameters: CoordinateConversionParameters,
): ConvertedCoordinate {
  return {
    x: coord.x * parameters.x,
    y: coord.y * parameters.y,
    z: (coord.z ?? 0) * parameters.z,
  };
}
