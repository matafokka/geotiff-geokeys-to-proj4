// TODO: Implement a proper compression algorithm

const tokens = [
  "a",
  "b",
  "axis",
  "ellps",
  "k",
  "k_0",
  "lat_0",
  "lon_0",
  "lon_wrap",
  "over",
  "pm",
  "proj",
  "units",
  "vunits",
  "x_0",
  "y_0",
  "to_meter",
  "vto_meter",
  "R",
  "south",
  "lat_1",
  "lat_2",
  "zone",
  "datum",
  "nadgrids",
  "towgs84",
  "no_defs",
  "approx",
  "lonc",
  "alpha",
  "gamma",
  "lat_ts",
  "h_0",
]
  .map((p) => "+" + p)
  .concat([
    "merc",
    "tmerc",
    "omerc",
    "poly",
    "lcc",
    "cea",
    "lcc",
    "laea",
    "aea",
    "aeqd",
    "eqc",
    "sterea",
    "stere",
    "cass",
    "col_urban",
    "krovak",
    "sphere",
    "GRS80",
    "NAD83",
    "longlat",
    "intl",
    "clrk66",
    "clrk80",
    "clrk80ign",
    "bessel",
    "krass",
    "evrst30",
    "GRS67",
    "WGS72",
    "WGS84",
    "6378245",
    "6378135",
    "6356863.018773047",
    "6356752.314140356",
    "6356752.314245179",
    "500000",
    "10000000",
  ]);

const tokenToChar: Record<string, string | undefined> = {};
const charToToken: Record<string, string | undefined> = {};

// Symbol ranges to replace tokens with. Strings always have only latin characters, never characters from the other
// alphabets. To avoid collisions with single-letter values, encode only in non-latin characters.
const ranges = [
  // Cyrillic characters
  1024, 1279,
];

let rangeStart = 0;
let charCode = ranges[rangeStart];

for (const token of tokens) {
  const char = String.fromCharCode(charCode);
  tokenToChar[token] = char;
  charToToken[char] = token;

  charCode++;

  if (charCode > ranges[rangeStart + 1]) {
    rangeStart += 2;
    charCode = ranges[rangeStart];
  }
}

/** Splits Proj4 string into an array of key-value pairs */
function proj4ToKeyValues(str: string) {
  return str.split(/\s+/).map((kv) =>
    kv
      .split("=")
      .map((v) => v.trim())
      .filter((v) => v),
  ) as ([string] | [string, string])[];
}

function keyValuesToProj4(pairs: string[][]) {
  return pairs
    .map((kv) =>
      kv
        .map((v) => v.trim())
        .filter((v) => v)
        .join("="),
    )
    .join(" ");
}

function transformer(map: Record<string, string | undefined>) {
  return (str: string) => keyValuesToProj4(proj4ToKeyValues(str).map((kv) => kv.map((v) => map[v] || v)));
}

/** Encodes Proj4 string for efficient storage in string literals */
export const encodeProj4 = transformer(tokenToChar);

/** Decodes Proj4 string encoded by {@link encodeProj4} */
export const decodeProj4 = transformer(charToToken);

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
