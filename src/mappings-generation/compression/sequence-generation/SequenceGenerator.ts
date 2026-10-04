// Compression sequence generation logic
//
// First, a reserved characters must be registered. They will not be used for the sequence generation.
//
// Then, available characters ranges must be built.
//
// The generation starts at the first available char and move up to the last available char.
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

interface SequencePart {
  code: number;
  rangeStart: number;
}

/** Generates a sequence of characters that must replace an original string */
export class SequenceGenerator {
  /** Current sequence */
  private sequence: SequencePart[] = [];

  /**
   * Constructs the sequence generator
   * @param ranges Replacement characters ranges
   */
  constructor(private ranges: number[]) {
    this.reset();
  }

  /** @returns Current sequence */
  get() {
    return this.sequence.map((part) => String.fromCodePoint(part.code)).join("");
  }

  /** Returns current sequence and moves to the next sequences */
  pop() {
    const sequence = this.get();
    this.moveSequence();
    return sequence;
  }

  /** Resets current sequence */
  reset() {
    this.sequence = [this.createSequencePart()];
  }

  /** Updates current sequence */
  private moveSequence() {
    let sequenceExhausted = false;

    for (let i = 0; i < this.sequence.length; i++) {
      const part = this.sequence[i];
      const nextCode = part.code + 1;

      if (nextCode <= this.ranges[part.rangeStart + 1]) {
        part.code = nextCode;
        return;
      }

      const nextRangeStart = part.rangeStart + 2;

      if (nextRangeStart < this.ranges.length) {
        part.rangeStart = nextRangeStart;
        part.code = this.ranges[nextRangeStart];
        return;
      }

      this.sequence[i] = this.createSequencePart();
      sequenceExhausted = i === this.sequence.length - 1;
    }

    if (!sequenceExhausted) {
      return;
    }

    for (let i = 0; i < this.sequence.length; i++) {
      this.sequence[i] = this.createSequencePart();
    }

    this.sequence.push(this.createSequencePart());
  }

  /** @returns New sequence part */
  private createSequencePart(): SequencePart {
    const rangeStart = 0;
    return { code: this.ranges[rangeStart], rangeStart };
  }
}
