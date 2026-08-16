import { conversionsGenerator } from "@/generators/conversionsGenerator";
import { crsGenerator } from "@/generators/crsGenerator";
import { datumsGenerator } from "@/generators/datumsGenerator";
import { ellipsoidsGenerator } from "@/generators/ellipsoidsGenerator";
import { writeMapping } from "@/utils/writeMapping";
import { PCSKeys } from "@/mappings/predefined/PCSKeys";
import { ProjCoordTransGeoKey } from "@/mappings/predefined/ProjCoordTransGeoKey";
import type { GeoKeys } from "@/types/GeoKeys";
import { keyValuesToProj4, proj4ToKeyValues } from "@/utils/proj4";

// TODO: Try compressing key-value sequences or even different key-value and pairs combinations

const tokenToCompressed: Record<string, string | undefined> = {};
const compressedToToken: Record<string, string | undefined> = {};

/** Replacement chars ranges */
const ranges = [
  // Strings always have only latin characters, never characters from the other alphabets.
  // To avoid collisions, encode only in non-latin characters.

  // Two bytes per char
  //
  161, 767,
  //
  880, 2047,
  //
  // Three bytes per char
  //
  2048, 8191,
  //
  8208, 8231,
  //
  8240, 8286,
  //
  8304, 8399,
  //
  8448, 55295,
  //
  57344, 65519,
];

// Compression sequence generation logic
//
// We start at the first available char and move up to the last available char.
// When we have no chars left, we reset the char and add another char to the sequence.
// Then again, we start with the first char and move up.
// Now, when we have no chars left, we reset the first char, move up second char and repeat the algorithm again.
//
// Example for [a, b] range:
// [a]
// [b]
// [a, a]
// [b, a]
// [a, b]
// [b, b]
// [a, a, a]
// [b, a, a]
// [a, b, a]
// And so on...

function getCompressedPart() {
  const rangeStart = 0;
  return { code: ranges[rangeStart], rangeStart };
}

const compressedSequence = [getCompressedPart()];

function getCompressedSequence() {
  return compressedSequence.map((part) => String.fromCharCode(part.code)).join("");
}

function updateCompressedSequence() {
  let sequenceExhausted = false;

  for (let i = 0; i < compressedSequence.length; i++) {
    const part = compressedSequence[i];
    const nextCode = part.code + 1;

    if (nextCode <= ranges[part.rangeStart + 1]) {
      part.code = nextCode;
      return;
    }

    const nextRangeStart = part.rangeStart + 2;

    if (nextRangeStart < ranges.length) {
      part.rangeStart = nextRangeStart;
      part.code = ranges[nextRangeStart];
      return;
    }

    compressedSequence[i] = getCompressedPart();
    sequenceExhausted = i === compressedSequence.length - 1;
  }

  if (!sequenceExhausted) {
    return;
  }

  for (let i = 0; i < compressedSequence.length; i++) {
    compressedSequence[i] = getCompressedPart();
  }

  compressedSequence.push(getCompressedPart());
}

/** Compresses proj4 strings in all mapping generators. Modifies global state in-place. */
export function compressMappings() {
  // Calculate number of occurrences of each token

  const tokensToOccurrences: Record<string, number | undefined> = {};
  const tokensOrder: string[] = [];

  const addToStats = (token: string) => {
    if (!token) {
      return;
    }

    const prevCount = tokensToOccurrences[token] || 0;

    if (!prevCount) {
      tokensOrder.push(token);
    }

    if (token) {
      tokensToOccurrences[token] = prevCount + 1;
    }
  };

  forEachProjString((str) => {
    const pairs = proj4ToKeyValues(str);

    for (const pair of pairs) {
      for (const token of pair) {
        addToStats(token);
      }
    }
  });

  // Calculate total uncompressed size for each token

  const tokensToUncompressedSize: Record<string, number | undefined> = {};

  for (const token of tokensOrder) {
    tokensToUncompressedSize[token] = tokensToOccurrences[token]! * Buffer.byteLength(token);
  }

  // Sort descending. This will encode more occurring tokens with less bytes to achieve greater compression ratio.
  tokensOrder.sort((a, b) => tokensToUncompressedSize[b]! - tokensToUncompressedSize[a]!);

  // Compress each token

  for (const token of tokensOrder) {
    const occurrences = tokensToOccurrences[token]!;
    const compressed = getCompressedSequence();

    const dictEntrySize = Buffer.byteLength(`${compressed}:"${token}",`);
    const compressedTokenSize = Buffer.byteLength(compressed);
    const compressedSize = dictEntrySize + compressedTokenSize * occurrences;

    if (tokensToUncompressedSize[token]! <= compressedSize) {
      continue;
    }

    tokenToCompressed[token] = compressed;
    compressedToToken[compressed] = token;
    updateCompressedSequence();
  }

  forEachProjString(compressProj4);
}

function forEachProjString(cb: (str: string) => string | void) {
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
      const value = obj[key]!;
      obj[key] = wrappedCb(value);
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

function compressProj4(str: string) {
  return keyValuesToProj4(proj4ToKeyValues(str).map((kv) => kv.map((v) => tokenToCompressed[v] || v)));
}

/** Writes generated dictionary to the disk */
export async function writeDict() {
  await writeMapping({
    name: "proj4dict",
    jsdoc: ["Maps a key or value character to an actual token"],
    type: "Record<string, string | undefined>",
    object: compressedToToken,
  });
}
