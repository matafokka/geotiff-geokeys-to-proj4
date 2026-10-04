import { conversionsGenerator } from "@/mappings-generation/generators/conversionsGenerator";
import { crsGenerator } from "@/mappings-generation/generators/crsGenerator";
import { datumsGenerator } from "@/mappings-generation/generators/datumsGenerator";
import { ellipsoidsGenerator } from "@/mappings-generation/generators/ellipsoidsGenerator";
import { PCSKeys } from "@/mappings-generation/predefined-mappings/PCSKeys";
import { ProjCoordTransGeoKey } from "@/mappings-generation/predefined-mappings/ProjCoordTransGeoKey";
import type { GeoKeys } from "@/shared/types/GeoKeys";

/**
 * Runs given callback for each proj4 string
 * @param cb Callback that accepts proj4 string. If returns a string then the original string will be replaced by it.
 */
export function forEachProjString(cb: (str: string, id: number) => string | void) {
  let id = 0;
  const wrappedCb = (str: string) => cb(str, id++) ?? str;

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
