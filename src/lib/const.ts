/**
 * Represents a user-defined value
 */
export const USER_DEFINED = 32767;

/** Order in which tokens should be written to final string to make it look nice */
export const KEYS_ORDER = [
  "proj",
  "lat_0",
  "lon_0",
  "lat_1",
  "lat_ts",
  "lon_1",
  "lat_2",
  "lon_2",
  "k_0",
  "x_0",
  "y_0",
  "ellps",
  "a",
  "b",
  "pm",
  "towgs84",
  "approx",
].map((v) => "+" + v);
