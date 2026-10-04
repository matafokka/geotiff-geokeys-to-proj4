import { conversionsGenerator } from "@/mappings-generation/generators/conversionsGenerator";
import { crsGenerator } from "@/mappings-generation/generators/crsGenerator";
import { datumsGenerator } from "@/mappings-generation/generators/datumsGenerator";
import { ellipsoidsGenerator } from "@/mappings-generation/generators/ellipsoidsGenerator";
import { meridiansGenerator } from "@/mappings-generation/generators/meridiansGenerator";
import { unitsGenerator } from "@/mappings-generation/generators/unitsGenerator";
import { verticalCsGenerator } from "@/mappings-generation/generators/verticalCsGenerator";
import type { Generator } from "@/mappings-generation/generators/mappingGenerator";
import { compressMappings } from "@/mappings-generation/compression/compressMappings";
import { writePredefinedMappings } from "@/mappings-generation/writers/writePredefinedMappings";
import { writeCompressionDict } from "@/mappings-generation/writers/writeCompressionDict";
import { dedupeProj4 } from "@/mappings-generation/transformations/dedupeProj4";

const generators: Generator<any>[] = [
  conversionsGenerator,
  crsGenerator,
  datumsGenerator,
  ellipsoidsGenerator,
  meridiansGenerator,
  unitsGenerator,
  verticalCsGenerator,
];

export async function generateMappings() {
  await Promise.all(generators.map((gen) => gen.generate()));
  dedupeProj4();
  generators.forEach((gen) => gen.backup());
  const dict = compressMappings();
  await Promise.all(generators.map((gen) => gen.write()).concat(writeCompressionDict(dict), writePredefinedMappings()));
}
