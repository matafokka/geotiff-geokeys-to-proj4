import { keyValuesToProj4, proj4ToKeyValues } from "@/shared/utils/proj4";
import { forEachProjString } from "@/mappings-generation/transformations/forEachProjString";
import { CharRangesBuilder } from "@/mappings-generation/compression/sequence-generation/CharRangesBuilder";
import { PLAIN_TEXT_MAP_SEPS } from "@/shared/formats/plain-text-map";
import { Groups } from "@/mappings-generation/compression/structures/Groups";
import { PairsStats } from "@/mappings-generation/compression/structures/PairsStats";
import { PairsToRows } from "@/mappings-generation/compression/structures/PairsToRows";
import { EQUALS_SIZE } from "@/mappings-generation/compression/shared/const";
import { GroupsCompressor } from "@/mappings-generation/compression/encoders/GroupsCompressor";
import { pipe } from "@/shared/utils/pipe";
import { ItemsEncoder } from "@/mappings-generation/compression/encoders/ItemsEncoder";
import { measured } from "@/shared/utils/perf";

/** Compresses proj4 strings in all mapping generators. Modifies global state in-place. */
export function compressMappings(): Record<string, string | undefined> {
  return pipe(
    measured("Prepare compression data", prepareData),
    measured("Initialize pairs", initPairs),
    measured("Build groups", buildGroups),
    measured("Compress groups", compressGroups),
  );
}

/** Prepares data that will be used throughout compression */
function prepareData() {
  const rangeBuilder = new CharRangesBuilder();
  rangeBuilder.reserve("='\"");

  for (const sep of PLAIN_TEXT_MAP_SEPS) {
    rangeBuilder.reserve(sep);
  }

  const groups = new Groups();
  const data: Set<number>[] = [];

  // Build initial groups with the keys, values and key-value pairs

  forEachProjString((str) => {
    const pairs = proj4ToKeyValues(str);
    const rowGroups = new Set<number>();
    data.push(rowGroups);

    for (const pair of pairs) {
      const pairAsLinks: number[] = [];
      let pairSize = 0;

      for (let i = 0; i < pair.length; i++) {
        let item = pair[i];

        if (i === 0) {
          item = item.startsWith("+") ? item.substring(1) : "+" + item;
          pair[i] = item;
        }

        rangeBuilder.reserve(item);

        const itemSize = Buffer.byteLength(item);
        pairSize += itemSize;

        const group = groups.add({
          items: [item],
          size: itemSize,
          type: "KeyOrValue",
        });

        pairAsLinks.push(group.id);
      }

      pairSize += EQUALS_SIZE * (pairAsLinks.length - 1);

      const group = groups.add({
        items: pairAsLinks,
        size: pairSize,
        type: "KeyValuePair",
      });

      rowGroups.add(group.id);
    }

    return keyValuesToProj4(pairs);
  });

  return {
    /** Dataset rows where key-value pairs have been replaced with the groups */
    data,

    /** Items groups */
    groups,

    /** Character ranges not present in the dataset and available for use in encoding */
    ranges: rangeBuilder.build(),
  };
}

/** Computes statistics and mappings for each pair in the dataset */
function initPairs(ctx: ReturnType<typeof prepareData>) {
  const { data, groups } = ctx;

  const pairs = new PairsStats((id) => groups.getById(id)!.size);
  const pairsToRows = new PairsToRows();

  // Register each possible pair in the dataset

  for (let row = 0; row < data.length; row++) {
    const items = [...data[row]];

    for (let i = 0; i < items.length - 1; i++) {
      for (let j = i + 1; j < items.length; j++) {
        const a = items[i];
        const b = items[j];
        pairs.add(a, b);
        pairsToRows.add(a, b, row);
      }
    }
  }

  return { ...ctx, pairs, pairsToRows };
}

/** Merges pairs into groups */
function buildGroups(ctx: ReturnType<typeof initPairs>) {
  const { data, groups, pairs, pairsToRows, ranges } = ctx;

  // Merge pairs until no profitable pairs are left

  while (true) {
    const largest = pairs.getLargestPair();

    if (!largest) {
      break;
    }

    const pairGroup = groups.add({
      items: largest.pair,
      size: largest.size,
      count: largest.occurrences,
      type: "KeyValueGroup",
    });

    // Update data

    const [a, b] = largest.pair;
    const rows = pairsToRows.get(a, b);
    pairs.remove(a, b, rows.length);

    for (const row of rows) {
      const rowGroups = data[row];

      pairsToRows.remove(a, b, row);

      rowGroups.delete(a);
      rowGroups.delete(b);

      for (const rowGroupId of rowGroups) {
        pairsToRows.remove(a, rowGroupId, row);
        pairsToRows.remove(b, rowGroupId, row);
        pairsToRows.add(pairGroup.id, rowGroupId, row);

        pairs.remove(a, rowGroupId);
        pairs.remove(b, rowGroupId);
        pairs.add(pairGroup.id, rowGroupId);
      }

      rowGroups.add(pairGroup.id);
    }
  }

  return { data, groups, ranges };
}

/**
 * Compresses the built groups
 *
 * @returns Dictionary
 */
function compressGroups(ctx: ReturnType<typeof buildGroups>) {
  const { data, groups, ranges } = ctx;

  const compressorOutput = new GroupsCompressor({
    groups,
    ranges,
  }).compress();

  const encoder = new ItemsEncoder(compressorOutput, groups);

  // Unwrap unprofitable groups in data
  const encodedData = data.map((s) => encoder.encode(s, "KeyValueGroup"));

  // Fill in the items in the dictionary and merge into a string

  const dict: Record<string, string | undefined> = {};

  for (const [id, sequence] of compressorOutput.toGroup) {
    const g = groups.getById(sequence)!;
    dict[id] = encoder.encode(g.items, g.type);
  }

  // Replace Proj4 strings with the encoded data

  forEachProjString((_, i) => encodedData[i]);

  return dict;
}
