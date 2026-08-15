import { writeMapping, type WriteMappingOptions } from "@/utils/writeMapping";
import { PCSKeys } from "@/mappings/predefined/PCSKeys";
import { ProjCoordTransGeoKey } from "@/mappings/predefined/ProjCoordTransGeoKey";

function getOptions(name: string) {
  return {
    name,
    jsdoc: [`See predefined ${name} mappings`],
  } satisfies Partial<WriteMappingOptions>;
}

const writeOpts: WriteMappingOptions[] = [
  {
    ...getOptions("PCSKeys"),
    object: PCSKeys,
    before: ['import type { PCSKeysMappings } from "@/mappings/predefined/PCSKeys" '],
    type: "PCSKeysMappings",
  },
  {
    ...getOptions("ProjCoordTransGeoKey"),
    object: ProjCoordTransGeoKey,
    type: "Record<string, string | undefined>",
  },
];

export async function writePredefinedMappings() {
  await Promise.all(writeOpts.map(writeMapping));
}
