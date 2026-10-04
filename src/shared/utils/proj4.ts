/** Splits Proj4 string into an array of `key=value` strings */
export function proj4ToKeyValueStrings(str: string) {
  return str.match(/[^\s]+/g) || [];
}

/** Splits Proj4 string into an array of key-value pairs */
export function proj4ToKeyValues(str: string) {
  return proj4ToKeyValueStrings(str)
    .map((v) => v.split("=", 2).filter((v) => v))
    .filter((v) => v.length) as ([string] | [string, string])[];
}

export function keyValuesToProj4(pairs: string[][]) {
  let result = "";

  for (let i = 0; i < pairs.length; i++) {
    let [k = "", v = ""] = pairs[i];

    k = k.trim();

    if (!k) {
      continue;
    }

    if (result) {
      result += " ";
    }

    v = v.trim();
    result += v ? k + "=" + v : k;
  }

  return result;
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
