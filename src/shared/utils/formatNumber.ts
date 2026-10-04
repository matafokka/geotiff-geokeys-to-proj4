/** {@link formatNumber} options */
export interface FormatNumberOptions {
  /**
   * Thousands separator
   *
   * @default " "
   */
  thousandsSep?: string;

  /**
   * Decimals separator
   *
   * @default "."
   */
  decimalsSep?: string;
}

/**
 * Formats a number
 * @param n Number
 * @param options Formatting options
 * @returns Formatted number
 */
export function formatNumber(n: number, options: FormatNumberOptions = {}) {
  const { thousandsSep = " ", decimalsSep = "." } = options;

  const [int, float] = (n + "").split(".");
  const parts: string[] = [];

  for (let i = int.length - 1; i >= 0; i -= 3) {
    parts.push(int.substring(i - 2, i + 1));
  }

  const fInt = parts.reverse().join(thousandsSep);

  if (float) {
    return fInt + decimalsSep + float;
  }

  return fInt;
}
