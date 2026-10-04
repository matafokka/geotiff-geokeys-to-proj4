/** Maps a pair to the rows containing that pair */
export class PairsToRows {
  private pairs = new Map<number, Map<number, Set<number>>>();

  /**
   * Adds a pair to row mapping
   * @param a First item
   * @param b Second item
   * @param index Row index
   */
  add(a: number, b: number, index: number) {
    if (a > b) {
      [a, b] = [b, a];
    }

    let paired = this.pairs.get(a);

    if (!paired) {
      paired = new Map();
      this.pairs.set(a, paired);
    }

    let rows = paired.get(b);

    if (!rows) {
      rows = new Set();
      paired.set(b, rows);
    }

    rows.add(index);
  }

  /**
   * Removes a pair to row mapping
   * @param a First item
   * @param b Second item
   * @param index Row index
   */
  remove(a: number, b: number, index: number) {
    if (a > b) {
      [a, b] = [b, a];
    }

    const paired = this.pairs.get(a);

    if (!paired) {
      return;
    }

    const rows = paired.get(b);

    if (!rows) {
      return;
    }

    rows.delete(index);

    if (!rows.size) {
      paired.delete(b);
    }

    if (!paired.size) {
      this.pairs.delete(a);
    }
  }

  /**
   * Returns rows containing given pair
   * @param a First item
   * @param b Second item
   * @returns Rows containing both items
   */
  get(a: number, b: number) {
    const set = this.pairs.get(a)?.get(b);
    return set ? [...set] : [];
  }
}
