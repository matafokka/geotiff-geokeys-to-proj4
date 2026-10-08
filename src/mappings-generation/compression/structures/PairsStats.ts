import { SPACE_SIZE } from "@/mappings-generation/compression/shared/const";
import { type MaxHeapItem, MaxHeap } from "@/shared/utils/MaxHeap";

/** Largest pair candidate */
interface PairCandidate<T> extends MaxHeapItem {
  a: T;
  b: T;
  version: number;
}

/** Tracks statistics of the grouped pairs and finds the largest pair */
export class PairsStats {
  // We prefer nested maps to composite keys because they're faster

  /** Stores each undirected pair in a canonical order: `Smaller ID -> Larger ID -> Occurrences` */
  private pairs = new Map<number, Map<number, number>>();

  /**
   * Version of each currently existing pair.
   *
   * Incremented whenever its occurrence count changes or the pair is removed. This lets us detect stale candidates.
   */
  private versions = new Map<number, Map<number, number>>();

  /** Largest pairs candidates. The candidates are versioned and lazily invalidated. */
  private candidates = new MaxHeap<PairCandidate<number>>();

  constructor(private getItemSize: (id: number) => number) {}

  /** @returns Largest registered pair */
  getLargestPair() {
    while (this.candidates.size > 0) {
      const candidate = this.candidates.pop()!;
      const occurrences = this.pairs.get(candidate.a)?.get(candidate.b);

      if (this.getVersion(candidate.a, candidate.b) !== candidate.version) {
        continue;
      }

      const size = this.getPairSize(candidate.a, candidate.b);

      return {
        pair: [candidate.a, candidate.b],
        size,
        occurrences,
      };
    }
  }

  /** Adds to the usage count of a pair of items */
  add(a: number, b: number, count = 1) {
    if (a > b) {
      [a, b] = [b, a];
    }

    let paired = this.pairs.get(a);

    if (!paired) {
      paired = new Map();
      this.pairs.set(a, paired);
    }

    const occurrences = (paired.get(b) ?? 0) + count;
    paired.set(b, occurrences);

    const version = this.bumpVersion(a, b);
    this.pushCandidate(a, b, occurrences, version);
  }

  /** Subtracts from the usage count of a pair of items */
  remove(a: number, b: number, count = 1) {
    if (a > b) {
      [a, b] = [b, a];
    }

    const paired = this.pairs.get(a);

    if (!paired) {
      return;
    }

    const occurrences = paired.get(b);

    if (occurrences === undefined) {
      return;
    }

    const newCount = occurrences - count;
    const version = this.bumpVersion(a, b);

    if (newCount <= 0) {
      paired.delete(b);

      if (paired.size === 0) {
        this.pairs.delete(a);
      }
    } else {
      paired.set(b, newCount);
      this.pushCandidate(a, b, newCount, version);
    }
  }

  private getPairSize(a: number, b: number) {
    return this.getItemSize(a) + this.getItemSize(b) + SPACE_SIZE;
  }

  private pushCandidate(a: number, b: number, occurrences: number, version?: number) {
    // Singleton pairs cannot be grouped together
    if (occurrences < 2) {
      return;
    }

    version ??= this.getVersion(a, b);

    this.candidates.push({
      a,
      b,
      version,
      score: this.getPairSize(a, b) * occurrences,
    });
  }

  private bumpVersion(a: number, b: number): number {
    let versions = this.versions.get(a);

    if (!versions) {
      versions = new Map();
      this.versions.set(a, versions);
    }

    const version = (versions.get(b) ?? 0) + 1;
    versions.set(b, version);

    return version;
  }

  private getVersion(a: number, b: number): number {
    return this.versions.get(a)?.get(b) ?? 0;
  }
}
