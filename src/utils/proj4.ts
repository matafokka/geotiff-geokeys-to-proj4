/** Splits Proj4 string into an array of key-value pairs */
export function proj4ToKeyValues(str: string) {
  return str.split(/\s+/).map((kv) =>
    kv
      .split("=")
      .map((v) => v.trim())
      .filter((v) => v),
  ) as ([string] | [string, string])[];
}

export function keyValuesToProj4(pairs: string[][]) {
  return pairs
    .map((kv) =>
      kv
        .map((v) => v.trim())
        .filter((v) => v)
        .join("="),
    )
    .join(" ");
}

/**
 * Transforms Proj4 string into key-value pairs.
 *
 * If value is an empty string then key doesn't accept a value (example: `+no_defs`).
 *
 * @param str Proj4 string
 * @returns Key-value pairs
 */
export function proj4ToObj(str: string) {
  const obj: Record<string, string | undefined> = {};
  const kv = proj4ToKeyValues(str);

  for (const [key, value = ""] of kv) {
    obj[key] = value;
  }

  return obj;
}

/**
 * Transforms key-value pairs into the Proj4 string
 *
 * @param obj Key-value pairs
 * @param order Order in which keys should appear in the string. Example: `["+proj", "+towgs84"]`
 * @returns Proj4 string
 */
export function objToProj4(obj: Record<string, string | undefined>, order: string[] = []) {
  const keys = order.concat(Object.keys(obj));
  const processedKeys: Record<string, true | undefined> = {};
  const pairs: string[][] = [];

  for (const key of keys) {
    if (!(key in obj) || processedKeys[key]) {
      continue;
    }

    processedKeys[key] = true;
    pairs.push([key, obj[key] || ""]);
  }

  return keyValuesToProj4(pairs);
}
