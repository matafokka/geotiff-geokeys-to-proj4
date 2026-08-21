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

function getCompressedPart() {
  const rangeStart = 0;
  return { code: ranges[rangeStart], rangeStart };
}

function getInitialSequence() {
  return [getCompressedPart()];
}

/** Generates a sequence of characters that must replace an original string */
export class CompressionSequenceGenerator {
  protected sequence = getInitialSequence();

  /** @returns Current sequence */
  getSequence() {
    return this.sequence.map((part) => String.fromCharCode(part.code)).join("");
  }

  /** Updates current sequence */
  updateSequence() {
    let sequenceExhausted = false;

    for (let i = 0; i < this.sequence.length; i++) {
      const part = this.sequence[i];
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

      this.sequence[i] = getCompressedPart();
      sequenceExhausted = i === this.sequence.length - 1;
    }

    if (!sequenceExhausted) {
      return;
    }

    for (let i = 0; i < this.sequence.length; i++) {
      this.sequence[i] = getCompressedPart();
    }

    this.sequence.push(getCompressedPart());
  }

  /** Resets current sequence */
  reset() {
    this.sequence = getInitialSequence();
  }
}
