import type { Groups } from "@/mappings-generation/compression/structures/Groups";
import type { GroupsCompressor } from "@/mappings-generation/compression/encoders/GroupsCompressor";
import type { GroupItem, GroupType } from "@/mappings-generation/compression/shared/types";
import { proj4ToKeyValueStrings } from "@/shared/utils/proj4";

export class ItemsEncoder {
  constructor(
    private compressorOutput: ReturnType<GroupsCompressor["compress"]>,
    private groups: Groups,
  ) {}

  private encodeRaw(items: Iterable<GroupItem>, type: GroupType): string {
    const newItems: string[] = [];

    for (const item of items) {
      // String literal
      if (typeof item === "string") {
        newItems.push(item);
        continue;
      }

      // Encoded sequences

      const sequence = this.compressorOutput.fromGroup.get(item);

      if (sequence) {
        newItems.push(sequence);
        continue;
      }

      const unwrapped = this.compressorOutput.uncompressed.get(item);

      if (unwrapped) {
        newItems.push(this.encodeRaw(unwrapped.items, unwrapped.type));
        continue;
      }

      // Group of string literals

      const group = this.groups.getById(item)!;

      if (group.items.every((v) => typeof v === "string")) {
        newItems.push(this.encodeRaw(group.items, group.type));
        continue;
      }

      // Every groups should've been either added to the dict or unwrapped

      console.log(this.groups.getById(item));
      throw new Error(`Group "${item}" has not been processed while pruning`);
    }

    return newItems.join(type === "KeyValueGroup" ? " " : "=");
  }

  /**
   * Encodes given items as a string.
   *
   * Unwraps unprofitable groups if encountered.
   *
   * Sorts resulting string to help out other compression algorithm (for example, gzip and brotli at HTTP level).
   */
  encode(items: Iterable<GroupItem>, type: GroupType): string {
    // Lexicographical sorting seems to be a good option, though, other sorting methods (such as sorting by frequency)
    // may produce better results.

    return proj4ToKeyValueStrings(this.encodeRaw(items, type)).sort().join(" ");
  }
}
