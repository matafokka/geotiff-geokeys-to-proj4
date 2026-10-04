import {
  proj4ToKeyValueStrings,
  proj4ToKeyValues,
  keyValuesToProj4,
  proj4ToObj,
  objToProj4,
} from "@/shared/utils/proj4";
import { describe, it, expect } from "vitest";

describe("Proj4 Utilities", () => {
  describe("proj4ToKeyValueStrings()", () => {
    it("Split a standard Proj4 string by whitespace", () => {
      const input = "+proj=longlat +datum=WGS84 +no_defs";
      const expected = ["+proj=longlat", "+datum=WGS84", "+no_defs"];
      expect(proj4ToKeyValueStrings(input)).toEqual(expected);
    });

    it("Handles multiple continuous spaces and trim outputs", () => {
      const input = "  +proj=longlat    +no_defs  ";
      const expected = ["+proj=longlat", "+no_defs"];
      expect(proj4ToKeyValueStrings(input)).toEqual(expected);
    });

    it("Returns an empty array for an empty string", () => {
      expect(proj4ToKeyValueStrings("   ")).toEqual([]);
    });
  });

  describe("proj4ToKeyValues()", () => {
    it("Parses string as arrays of key-value tuples", () => {
      const input = "+proj=longlat +datum=WGS84 +no_defs";
      const expected = [["+proj", "longlat"], ["+datum", "WGS84"], ["+no_defs"]];
      expect(proj4ToKeyValues(input)).toEqual(expected);
    });

    it("should ignore malformed empty entries", () => {
      expect(proj4ToKeyValues("   =")).toEqual([]);
    });
  });

  describe("keyValuesToProj4", () => {
    it("Combines key-value arrays back into a Proj4 string", () => {
      const input = [["+proj", "longlat"], ["+datum", "WGS84"], ["+no_defs"]];
      const expected = "+proj=longlat +datum=WGS84 +no_defs";
      expect(keyValuesToProj4(input)).toBe(expected);
    });

    it("Filters out empty keys or values during formatting", () => {
      const input = [["+proj", "longlat"], [" "], ["+no_defs", ""]];
      expect(keyValuesToProj4(input)).toBe("+proj=longlat +no_defs");
    });
  });

  describe("proj4ToObj", () => {
    it("Converts a Proj4 string into an object representation", () => {
      const input = "+proj=longlat +datum=WGS84 +no_defs";
      const expected = {
        "+proj": "longlat",
        "+datum": "WGS84",
        "+no_defs": "",
      };
      expect(proj4ToObj(input)).toEqual(expected);
    });

    it("Returns an empty object for an empty string", () => {
      expect(proj4ToObj("   ")).toEqual({});
    });
  });

  describe("objToProj4", () => {
    it("Converts an object back into a Proj4 string", () => {
      const input = {
        "+proj": "longlat",
        "+datum": "WGS84",
        "+no_defs": "",
      };
      const expected = "+proj=longlat +datum=WGS84 +no_defs";
      expect(objToProj4(input)).toBe(expected);
    });

    it("Enforces the provided key order", () => {
      const input = {
        "+datum": "WGS84",
        "+no_defs": "",
        "+proj": "longlat",
      };
      const order = ["+proj", "+datum", "+no_defs"];
      const expected = "+proj=longlat +datum=WGS84 +no_defs";
      expect(objToProj4(input, order)).toBe(expected);
    });

    it("Appends unlisted object keys to the end when ordering", () => {
      const input = {
        "+ellps": "WGS84",
        "+proj": "longlat",
      };
      const order = ["+proj"];
      const expected = "+proj=longlat +ellps=WGS84";
      expect(objToProj4(input, order)).toBe(expected);
    });

    it("Ignores keys in the order array that do not exist in the object", () => {
      const input = { "+proj": "longlat" };
      const order = ["+missing_key", "+proj"];
      expect(objToProj4(input, order)).toBe("+proj=longlat");
    });
  });
});
