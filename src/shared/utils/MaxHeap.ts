export interface MaxHeapItem {
  score: number;
}

/**
 * Max-heap ordered by candidate score.
 *
 * Pair candidates are lazily invalidated by Pairs, so stale candidates
 * can remain in the heap until they reach the top.
 */
export class MaxHeap<T extends MaxHeapItem> {
  private heap: T[] = [];

  get size(): number {
    return this.heap.length;
  }

  push(candidate: T): void {
    const heap = this.heap;
    let i = heap.length;

    heap.push(candidate);

    while (i > 0) {
      const parent = (i - 1) >> 1;

      if (heap[parent].score >= candidate.score) {
        break;
      }

      heap[i] = heap[parent];
      i = parent;
    }

    heap[i] = candidate;
  }

  pop(): T | undefined {
    const heap = this.heap;

    if (heap.length === 0) {
      return undefined;
    }

    const result = heap[0];
    const last = heap.pop()!;

    if (heap.length === 0) {
      return result;
    }

    let i = 0;

    while (true) {
      const left = i * 2 + 1;

      if (left >= heap.length) {
        break;
      }

      const right = left + 1;

      let child = left;

      if (right < heap.length && heap[right].score > heap[left].score) {
        child = right;
      }

      if (heap[child].score <= last.score) {
        break;
      }

      heap[i] = heap[child];
      i = child;
    }

    heap[i] = last;

    return result;
  }
}
