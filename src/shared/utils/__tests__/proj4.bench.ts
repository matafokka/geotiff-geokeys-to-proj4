import { describe, test } from "vitest";

const str =
  "+proj=lcc +lat_1=43 +lat_2=45.5 +lat_0=41.75 +lon_0=-120.5 +x_0=400000 +y_0=0 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs +nadgrids=@null +wktext";

const pairs = [
  ["+proj", "lcc"],
  ["+lat_1", "43"],
  ["+lat_2", "45.5"],
  ["+lat_0", "41.75"],
  ["lon_0", "-120.5"],
  ["+x_0", "400000"],
  ["+y_0", "0"],
  ["+ellps", "GRS80"],
  ["+towgs84", "0,0,0,0,0,0,0"],
  ["+units", "m"],
  ["+no_defs"],
  ["+nadgrids", "@null"],
  ["+wktext"],
];

const obj = {
  "+proj": "lcc",
  "+lat_1": "43",
  "+lat_2": "45.5",
  "+lat_0": "41.75",
  "lon_0": "-120.5",
  "+x_0": "400000",
  "+y_0": "0",
  "+ellps": "GRS80",
  "+towgs84": "0,0,0,0,0,0,0",
  "+units": "m",
  "+no_defs": "",
  "+nadgrids": "@null",
  "+wktext": "",
};

const order = ["+proj", "+lat_1", "+lat_2", "+lat_0", "+lon_0", "+ellps", "+units", "+no_defs"];

describe("Proj4 Utilities", async () => {
  const { proj4ToKeyValueStrings, proj4ToKeyValues, keyValuesToProj4, proj4ToObj, objToProj4 } =
    await import("@/shared/utils/proj4");

  test("proj4ToKeyValueStrings()", ({ bench }) => {
    bench("Convert", () => proj4ToKeyValueStrings(str)).run();
  });

  test("proj4ToKeyValues()", ({ bench }) => {
    bench("Convert", () => proj4ToKeyValues(str)).run();
  });

  test("proj4ToObj()", ({ bench }) => {
    bench("Convert", () => proj4ToObj(str)).run();
  });

  test("keyValuesToProj4()", ({ bench }) => {
    bench("Convert", () => keyValuesToProj4(pairs)).run();
  });

  test("objToProj4()", ({ bench }) => {
    bench("No sorting", () => objToProj4(obj)).run();
    bench("With sorting", () => objToProj4(obj, order)).run();
  });
});
