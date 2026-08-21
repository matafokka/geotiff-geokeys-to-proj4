import { conversionsGenerator } from "@/generators/conversionsGenerator";
import { crsGenerator } from "@/generators/crsGenerator";
import { datumsGenerator } from "@/generators/datumsGenerator";
import { ellipsoidsGenerator } from "@/generators/ellipsoidsGenerator";
import { meridiansGenerator } from "@/generators/meridiansGenerator";
import { unitsGenerator } from "@/generators/unitsGenerator";
import { verticalCsGenerator } from "@/generators/verticalCsGenerator";
import type { Generator } from "@/generators/mappingGenerator";
import { compressMappings } from "@/compression/compressMappings";
import { writePredefinedMappings } from "@/cli/writePredefinedMappings";
import { writeCompressionDict } from "@/cli/writeCompressionDict";

const generators: Generator<any>[] = [
  conversionsGenerator,
  crsGenerator,
  datumsGenerator,
  ellipsoidsGenerator,
  meridiansGenerator,
  unitsGenerator,
  verticalCsGenerator,
];

export async function generateCode() {
  await Promise.all(generators.map((gen) => gen.generate()));
  compressMappings();
  await Promise.all(generators.map((gen) => gen.write()).concat(writeCompressionDict(), writePredefinedMappings()));
}
