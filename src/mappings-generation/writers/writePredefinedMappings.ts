import { writeMapping, type WriteMappingOptions } from "@/mappings-generation/writers/writeMapping";
import { PCSKeys } from "@/mappings-generation/predefined-mappings/PCSKeys";
import { ProjCoordTransGeoKey } from "@/mappings-generation/predefined-mappings/ProjCoordTransGeoKey";
import { encodePlainTextMapWithDecoder } from "@/shared/formats/plain-text-map";

function getOptions(name: string) {
  return {
    name,
    contentType: "compressed",
    jsdoc: [`See predefined ${name} mappings`],
  } satisfies Partial<WriteMappingOptions>;
}

export async function writePredefinedMappings() {
  const writeOpts: WriteMappingOptions[] = [
    {
      ...getOptions("PCSKeys"),
      toWrite: PCSKeys,
      before: ['import type { PCSKeysMappings } from "@/mappings-generation/predefined-mappings/PCSKeys";'],
      type: "PCSKeysMappings",
    },
    {
      ...getOptions("ProjCoordTransGeoKey"),
      before: ['import { decodePlainTextMap } from "@/shared/formats/plain-text-map"'],
      toWrite: encodePlainTextMapWithDecoder(ProjCoordTransGeoKey),
      type: "Record<string, string | undefined>",
    },
  ];

  await Promise.all(writeOpts.map(writeMapping));
}
