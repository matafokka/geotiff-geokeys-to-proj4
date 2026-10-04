/**
 * A single unit inside a group:
 *
 * 1. `string` - a literal value.
 * 1. `number` - an ID of another group.
 */
export type GroupItem = string | number;

export type GroupType = "KeyValueGroup" | "KeyValuePair" | "KeyOrValue";

export interface Group {
  /** Group ID */
  id: number;

  /** Number of times this group occurs */
  count: number;

  /**
   * A size in bytes that this group occupies. Calculated including its every descendant.
   *
   * Example:
   *
   * | ID | Children | Size | Remarks                                                                               |
   * |----|----------|------|---------------------------------------------------------------------------------------|
   * | 0  | ["a"]    | 1    | String size in bytes is calculated. Letter "a" takes up 1 byte.                       |
   * | 1  | ["b"]    | 1    |                                                                                       |
   * | 3  | ["c"]    | 1    |                                                                                       |
   * | 4  | ["d"]    | 1    |                                                                                       |
   * | 5  | [0, 1]   | 3    | This is basically ["a", (space), "b"] hence the size is 3 and not 2                   |
   * | 6  | [2, 3]   | 3    |                                                                                       |
   * | 7  | [5, 6]   | 7    | Groups 5 and 6 takes up 3 bytes each and are separated by a space which takes 1 byte. |
   */
  size: number;

  /** Group contents. See {@link GroupItem} for the details. */
  items: GroupItem[];

  /** Group type */
  type: GroupType;
}
