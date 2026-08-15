/**
 * Parses CS name. Returns key-values pairs.
 *
 * For some reason, CS parameters are merged into one string instead of being split to the columns.
 *
 * Example name:
 *
 * ```plain
 * Ellipsoidal 3D CS. Axes: latitude, longitude, ellipsoidal height. Orientations: north, east, up. UoM: degree, degree, metre.
 * ```
 *
 * This will be parsed as:
 *
 * ```ts
 * {
 *   axes: ["latitude", "longitude", "ellipsoidal height"],
 *   orientations: ["north", "east", "up"],
 *   uom: ["degree", "degree", "metre"],
 * }
 * ```
 *
 * We hope that this structure won't change in future.
 *
 * @param name CS name
 * @returns Parsed CS params
 */
export function parseCsName(name: string) {
  name = name.toLowerCase();

  if (name.endsWith(".")) {
    name = name.substring(0, name.length - 1);
  }

  const sentences = name.split(". ");

  // Split each sentence into parameter name (string before column) and values separated by a comma
  const cs: Record<string, string[] | undefined> = {};

  for (const sentence of sentences) {
    let paramName = "";
    let columnIndex = 0;

    for (const symbol of sentence) {
      columnIndex++; // Accounting space

      if (symbol === ":") {
        break;
      }

      paramName += symbol;
    }

    const values = sentence
      .substring(columnIndex + 1)
      .split(", ")
      .map((v) => v.trim())
      .filter((v) => v);

    if (values.length) {
      cs[paramName] = values;
    }
  }

  return cs;
}
