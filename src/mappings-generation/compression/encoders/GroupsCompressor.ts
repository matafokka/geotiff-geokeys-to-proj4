import { SequencePool } from "@/mappings-generation/compression/sequence-generation/SequencePool";
import { DICT_ENTRY_SIZE } from "@/mappings-generation/compression/shared/const";
import type { Groups } from "@/mappings-generation/compression/structures/Groups";
import type { Group } from "@/mappings-generation/compression/shared/types";

interface CompressedEntry {
  group: Group;
  sequence: string;
  sequenceSize: number;
}

/** {@link GroupsCompressor} options */
export interface GroupsCompressorOptions {
  /** Groups to compress */
  groups: Groups;

  /** Ranges of characters that may be used for compression */
  ranges: number[];
}

/** Compresses prebuilt groups */
export class GroupsCompressor {
  /**
   * Uncompressed groups - groups to be unwrapped and kept in-line.
   *
   * Maps a group ID to the group itself
   */
  private uncompressed = new Map<number, Group>();

  /**
   * Groups to be compressed.
   *
   * Maps a group ID to the compression data.
   */
  private compressed = new Map<number, CompressedEntry>();

  /** Maps a compression sequence to a group ID. For reverse mapping, see {@link fromGroup}. */
  private toGroup = new Map<string, number>();

  /** Maps a group ID to a compression sequence. For reverse mapping, see {@link toGroup}. */
  private fromGroup = new Map<number, string>();

  private groups: Groups;

  /** Compression sequences pool */
  private sequences: SequencePool;

  constructor(options: GroupsCompressorOptions) {
    this.sequences = new SequencePool(options.ranges);
    this.groups = options.groups;

    const groups = this.groups.all();

    for (const group of groups) {
      this.uncompressed.set(group.id, group);
    }
  }

  /** @returns A group that produces positive savings */
  private getBest(): CompressedEntry | undefined {
    const sequence = this.sequences.get();
    const sequenceSize = Buffer.byteLength(sequence);

    let maxSaved = 0;
    let best: Group | undefined;

    for (const [_, group] of this.uncompressed) {
      const saved = GroupsCompressor.savings(group, sequenceSize);

      if (saved > maxSaved) {
        maxSaved = saved;
        best = group;
      }
    }

    if (best) {
      return { group: best, sequence, sequenceSize };
    }

    this.sequences.hold(sequence);
  }

  /** Removes the group that produces the best savings and returns it */
  private removeBest() {
    const best = this.getBest();

    if (!best) {
      return;
    }

    this.markCompressed(best);
    return best;
  }

  /** @returns The compressed group whose compression produces the most loss */
  private getWorst() {
    let worstLoss = -Infinity;
    let worst: CompressedEntry | undefined;

    for (const [_, compressed] of this.compressed) {
      const loss = -GroupsCompressor.savings(compressed.group, compressed.sequenceSize);

      if (loss > worstLoss) {
        worstLoss = loss;
        worst = compressed;
      }
    }

    if (worstLoss >= 0) {
      return worst;
    }
  }

  /** Removes the compressed group that produces the most loss and returns it */
  private removeWorst() {
    const worst = this.getWorst();

    if (!worst) {
      return;
    }

    this.markUncompressed(worst);
    return worst;
  }

  private markCompressed(entry: CompressedEntry) {
    this.uncompressed.delete(entry.group.id);
    this.compressed.set(entry.group.id, entry);

    this.toGroup.set(entry.sequence, entry.group.id);
    this.fromGroup.set(entry.group.id, entry.sequence);

    // Ancestors now see this group as a compression sequence
    this.updateParentsSize(entry.group, entry.sequenceSize - entry.group.size);

    // Descendants now appear only once, inside this group's dictionary entry.
    this.updateChildrenCount(entry.group, -(entry.group.count - 1));
  }

  private markUncompressed(entry: CompressedEntry) {
    this.compressed.delete(entry.group.id);
    this.uncompressed.set(entry.group.id, entry.group);

    this.toGroup.delete(entry.sequence);
    this.fromGroup.delete(entry.group.id);

    // This sequence is free, reuse it
    this.sequences.hold(entry.sequence);

    // Ancestors now see this group as its whole contents
    this.updateParentsSize(entry.group, entry.group.size - entry.sequenceSize);

    // Descendants now appear at every occurrence of this group
    this.updateChildrenCount(entry.group, entry.group.count - 1);
  }

  /**
   * Reprioritizes already set compression sequences.
   *
   * Marks newly unprofitable groups as uncompressed.
   *
   * Another optimization loop is required after calling this.
   *
   * The whole logic reduces bundle size by a couple of kilobytes.
   *
   * @returns Whether changes to the sizes have been made
   */
  private optimizeSequences(): boolean {
    const ranked = [...this.compressed.values()].sort((a, b) => b.group.count - a.group.count);
    let sizesChanged = false;

    for (const entry of ranked) {
      this.sequences.hold(entry.sequence);
    }

    for (let i = 0; i < ranked.length; i++) {
      const entry = ranked[i];
      const sequence = this.sequences.get();

      if (entry.sequence === sequence) {
        continue;
      }

      const other = this.compressed.get(this.toGroup.get(sequence)!);
      const sequenceSize = Buffer.byteLength(sequence);
      const sizeDelta = sequenceSize - entry.sequenceSize;

      // TODO: Swap sequences in the pool and don't update the groups
      if (sizeDelta) {
        sizesChanged = true;
        this.updateParentsSize(entry.group, sizeDelta);

        if (other) {
          this.updateParentsSize(other.group, -sizeDelta);
        }
      }

      this.toGroup.set(sequence, entry.group.id);
      this.fromGroup.set(entry.group.id, sequence);

      if (other) {
        this.toGroup.set(entry.sequence, other.group.id);
        this.fromGroup.set(other.group.id, entry.sequence);

        other.sequence = entry.sequence;
        other.sequenceSize = entry.sequenceSize;
      } else {
        this.toGroup.delete(entry.sequence);
      }

      entry.sequence = sequence;
      entry.sequenceSize = sequenceSize;
    }

    if (!sizesChanged) {
      return false;
    }

    for (const entry of ranked) {
      if (GroupsCompressor.savings(entry.group, entry.sequenceSize) <= 0) {
        this.markUncompressed(entry);
      }
    }

    return true;
  }

  private updateParentsSize(group: Group, delta: number) {
    this.groups.walkUp(group, (p) => {
      p.size += delta;
      return this.shouldStopWalk(p);
    });
  }

  private updateChildrenCount(group: Group, delta: number) {
    this.groups.walkDown(group, (c) => {
      c.count += delta;
      return this.shouldStopWalk(c);
    });
  }

  /**
   * Whether groups update traversal should be stopped.
   *
   * The traversal stops at the first compressed:
   *
   * 1. Ancestor - further ancestors see that ancestor as a compressed sequence whose size is fixed.
   * 1. Descendant - their own descendants size does not affect the given group's size.
   *
   * @param group Group
   * @returns Whether the traversal should be stopped.
   */
  private shouldStopWalk(group: Group) {
    return this.compressed.has(group.id);
  }

  compress() {
    // 1. Compress the group whose compression produces the best savings.
    //
    //    If a parent is compressed after its child, the child occurs less times in the dataset. This may render its
    //    compression to produce a loss instead of profit.
    //
    // 2. If there's no profitable group, decompress the group that produces the most loss.
    //
    //    This may leave shorter compression sequences unused.
    //
    // 3. Reprioritize compression sequences already in use.
    //
    // 4. Repeat the process until no changes to the groups and sequences are made.

    while (this.removeBest() || this.removeWorst() || this.optimizeSequences()) {
      // Noop
    }

    return { toGroup: this.toGroup, fromGroup: this.fromGroup, uncompressed: this.uncompressed };
  }

  /**
   * Calculates savings made by compression the given group.
   *
   * When returned value is:
   *
   * 1. Positive - compression is profitable.
   * 1. Negative - compression produces a loss.
   * 1. 0 - compression doesn't affect the dataset size.
   */
  private static savings(group: Group, sequenceSize: number): number {
    const uncompressed = group.size * group.count;
    const compressed = DICT_ENTRY_SIZE + group.size + sequenceSize * (group.count + 1);
    return uncompressed - compressed;
  }
}
