import { conversionsGenerator } from "@/generators/conversionsGenerator";
import { crsGenerator } from "@/generators/crsGenerator";
import { datumsGenerator } from "@/generators/datumsGenerator";
import { ellipsoidsGenerator } from "@/generators/ellipsoidsGenerator";
import { PCSKeys } from "@/mappings/predefined/PCSKeys";
import { ProjCoordTransGeoKey } from "@/mappings/predefined/ProjCoordTransGeoKey";
import type { GeoKeys } from "@/types/GeoKeys";

/**
 * Runs given callback for each proj4 string
 * @param cb Callback that accepts proj4 string. If returns a string then the original string will be replaced by it.
 */
export function forEachProjString(cb: (str: string) => string | void) {
  const wrappedCb = (str: string) => cb(str) ?? str;

  const plainObjects: Record<string, string | undefined>[] = [
    datumsGenerator,
    ellipsoidsGenerator,
    conversionsGenerator,
  ]
    .filter((gen) => gen.writable)
    .map((gen) => gen.state)
    .concat([ProjCoordTransGeoKey]);

  for (const obj of plainObjects) {
    for (const key in obj) {
      obj[key] = wrappedCb(obj[key]!);
    }
  }

  for (const key in crsGenerator.state) {
    const value = crsGenerator.state[key];

    switch (typeof value) {
      case "string":
        crsGenerator.state[key] = wrappedCb(value);
        break;

      case "object": {
        value.p = wrappedCb(value.p);
        break;
      }
    }
  }

  for (const obj of PCSKeys) {
    for (const key in obj) {
      const value = obj[key as keyof GeoKeys]!;
      value.p = wrappedCb(value.p);
    }
  }
}
