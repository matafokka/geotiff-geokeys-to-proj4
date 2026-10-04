import { encodePlainTextMapWithDecoder } from "@/shared/formats/plain-text-map";
import { writeMapping } from "@/mappings-generation/writers/writeMapping";

/** Writes generated dictionary to the disk */
export async function writeCompressionDict(dict: Record<string, string | undefined>) {
  await writeMapping({
    name: "proj4dict",
    contentType: "compressed",
    before: ['import { decodePlainTextMap } from "@/shared/formats/plain-text-map"'],
    jsdoc: ["Maps a key or value character to an actual token"],
    type: "Record<string, string | undefined>",
    toWrite: encodePlainTextMapWithDecoder(dict),
  });
}
