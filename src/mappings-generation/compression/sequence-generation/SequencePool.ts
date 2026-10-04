import { SequenceGenerator } from "@/mappings-generation/compression/sequence-generation/SequenceGenerator";
import { MaxHeap, type MaxHeapItem } from "@/shared/utils/MaxHeap";

interface PoolItem extends MaxHeapItem {
  sequence: string;
}

/**
 * A sequence pool capable of both generating sequences and temporary holding previously generated sequences
 */
export class SequencePool {
  private heap = new MaxHeap<PoolItem>();
  private set = new Set<string>();
  private generator: SequenceGenerator;

  /**
   * Constructs sequence pool
   * @param ranges Replacement characters ranges
   */
  constructor(ranges: number[]) {
    this.generator = new SequenceGenerator(ranges);
  }

  /** @returns Next shortest available sequence */
  get() {
    const fromHeap = this.heap.pop();

    if (fromHeap) {
      this.set.delete(fromHeap.sequence);
      return fromHeap.sequence;
    }

    return this.generator.pop();
  }

  /** Temporary holds given sequence. Only previously generated sequences should be passed. */
  hold(sequence: string) {
    if (this.set.has(sequence)) {
      return;
    }

    this.set.add(sequence);
    this.heap.push({ sequence, score: -Buffer.byteLength(sequence) });
  }
}
