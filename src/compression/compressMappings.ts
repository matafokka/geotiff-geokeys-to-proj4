import { keyValuesToProj4, proj4ToKeyValues } from "@/utils/proj4";
import { forEachProjString } from "@/compression/forEachProjString";
import { CompressionSequenceGenerator } from "@/compression/CompressionSequenceGenerator";

export const tokenToCompressed: Record<string, string | undefined> = {};
export const compressedToToken: Record<string, string | undefined> = {};

/** Compresses proj4 strings in all mapping generators. Modifies global state in-place. */
export function compressMappings() {
  const sequenceGenerator = new CompressionSequenceGenerator();

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

    tokensToOccurrences[token] = prevCount + 1;
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
    const compressed = sequenceGenerator.getSequence();

    const dictEntrySize = Buffer.byteLength(`${compressed}:"${token}",`);
    const compressedTokenSize = Buffer.byteLength(compressed);
    const compressedSize = dictEntrySize + compressedTokenSize * occurrences;

    if (tokensToUncompressedSize[token]! <= compressedSize) {
      continue;
    }

    tokenToCompressed[token] = compressed;
    compressedToToken[compressed] = token;
    sequenceGenerator.updateSequence();
  }

  forEachProjString(compressProj4);
}

function compressProj4(str: string) {
  return keyValuesToProj4(proj4ToKeyValues(str).map((kv) => kv.map((v) => tokenToCompressed[v] || v)));
}
