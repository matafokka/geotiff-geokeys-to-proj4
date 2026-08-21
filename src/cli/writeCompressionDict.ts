import { compressedToToken } from "@/compression/compressMappings";
import { writeMapping } from "@/utils/writeMapping";

/** Writes generated dictionary to the disk */
export async function writeCompressionDict() {
  await writeMapping({
    name: "proj4dict",
    jsdoc: ["Maps a key or value character to an actual token"],
    type: "Record<string, string | undefined>",
    object: compressedToToken,
  });
}
