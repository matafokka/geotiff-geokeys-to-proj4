import type { GeoKeys } from "@/types/GeoKeys";
import { cloneWithJson } from "@/utils/misc";

/** PCS key description */
export interface PCSKey {
  /** Proj4 definitions */
  p: string;

  /**
   * Units type:
   *
   * - 1 - Angular
   * - 2 - Linear
   * - 3 - Ratio
   */
  u: 1 | 2 | 3;
}

export type PCSKeysMappings = Partial<Record<keyof GeoKeys, PCSKey>>[];

/**
 * Maps "simple" PCS keys their Proj4 definitions and units.
 *
 * There're multiple mappings. Latter ones take precedence over previous onces.
 *
 * **Explanation**
 *
 * GeoTIFF defines following centers: natural origin, projection center and just center.
 *
 * Natural and projection's centers seem to have no difference at all, even `libgeotiff` defines them as equal.
 *
 * Proj4 doesn't support natural origins, so projection's center should take precedence.
 *
 * And there's "just center" which appears to be as same as the other centers. `libgeotiff` doesn't support it at all.
 * We assume that they're same as the other centers but make other centers override them.
 *
 * Finally, the centers hierarchy is following: "just center", natural origin, projection center.
 */
export const PCSKeys: PCSKeysMappings = [
  // Keys without overrides and "just center" keys

  {
    ProjStdParallel1GeoKey: {
      u: 1,
      p: "+lat_1",
    },
    ProjStdParallel2GeoKey: {
      u: 1,
      p: "+lat_2",
    },

    ProjCenterLongGeoKey: {
      u: 1,
      p: "+lon_0",
    },
    ProjCenterLatGeoKey: {
      u: 1,
      p: "+lat_0",
    },
    ProjCenterEastingGeoKey: {
      u: 2,
      p: "+x_0",
    },
    ProjCenterNorthingGeoKey: {
      u: 2,
      p: "+y_0",
    },
    ProjScaleAtCenterGeoKey: {
      u: 3,
      p: "+k_0",
    },
  },

  // Natural origin keys

  {
    ProjNatOriginLongGeoKey: {
      u: 1,
      p: "+lon_0",
    },
    ProjNatOriginLatGeoKey: {
      u: 1,
      p: "+lat_0",
    },
    ProjFalseOriginEastingGeoKey: {
      u: 2,
      p: "+x_0",
    },
    ProjFalseOriginNorthingGeoKey: {
      u: 2,
      p: "+y_0",
    },
    ProjScaleAtNatOriginGeoKey: {
      u: 3,
      p: "+k_0",
    },
  },

  // Projection center keys

  {
    ProjFalseOriginLongGeoKey: {
      u: 1,
      p: "+lon_0",
    },
    ProjFalseOriginLatGeoKey: {
      u: 1,
      p: "+lat_0",
    },
    ProjFalseEastingGeoKey: {
      u: 2,
      p: "+x_0",
    },
    ProjFalseNorthingGeoKey: {
      u: 2,
      p: "+y_0",
    },
  },
];

// Aliases

PCSKeys[1].ProjStdParallelGeoKey = cloneWithJson(PCSKeys[0].ProjStdParallel1GeoKey);
PCSKeys[2].ProjOriginLongGeoKey = cloneWithJson(PCSKeys[1].ProjNatOriginLongGeoKey);
PCSKeys[2].ProjOriginLatGeoKey = cloneWithJson(PCSKeys[1].ProjNatOriginLatGeoKey);
PCSKeys[2].ProjScaleAtOriginGeoKey = cloneWithJson(PCSKeys[1].ProjScaleAtNatOriginGeoKey);
