const NON_PRINTABLE_CHAR_REGEX = /[\p{Cc}\p{Cn}\p{Cs}\p{Cf}\s]/gu;

/**
 * Builds ranges of available characters.
 *
 * The ranges are array where:
 *
 * 1. Every element is a Unicode character code.
 * 1. Every odd element is a range start.
 * 1. Every even element is a range end.
 *
 * So the ranges format is:
 *
 * ```plain
 * [range_1_start_code, range_1_end_code, range_2_start_code, range_2_end_code, ...]
 * ```
 */
export class CharRangesBuilder {
  /** Characters that will be excluded from the sequence generation */
  private reserved = new Set<number>();

  /** Reserves characters in the string. These characters will be excluded from the ranges. */
  reserve(str: string) {
    for (const char of str) {
      this.reserved.add(char.codePointAt(0)!);
    }
  }

  /** Builds available characters ranges */
  build(): number[] {
    const end = 0x10ffff;
    const ranges: number[] = [];
    let rangeStart: number | undefined;

    for (let code = 0; code <= end; code++) {
      if (this.isCharAvailable(code)) {
        if (rangeStart === undefined) {
          rangeStart = code;
        }

        if (code === end) {
          ranges.push(rangeStart, code);
          break;
        }

        continue;
      }

      if (rangeStart !== undefined) {
        ranges.push(rangeStart, code - 1);
        rangeStart = undefined;
      }
    }

    return ranges;
  }

  /** Resets the state of this builder */
  reset() {
    this.reserved.clear();
  }

  /**
   * Checks if character can be stringified into JSON. Returns `false` for characters that are:
   *
   * 1. Reserved.
   * 1. Non-printable.
   * 1. Stringified with escaping.
   *
   * @param code Character code
   * @returns Whether character can be stringified.
   */
  private isCharAvailable(code: number) {
    if (this.reserved.has(code)) {
      return false;
    }

    const char = String.fromCodePoint(code);
    return !char.match(NON_PRINTABLE_CHAR_REGEX) && `"${char}"` === JSON.stringify(char);
  }
}
