import { PLAIN_TEXT_MAP } from "@/shared/formats/__tests__/fixtures";
import { decodePlainTextMap, encodePlainTextMap } from "@/shared/formats/plain-text-map";
import { expect, it, describe } from "vitest";

describe("plain-text-map", () => {
  it("Converts from object and back", () => {
    expect(decodePlainTextMap(encodePlainTextMap(PLAIN_TEXT_MAP))).toEqual(PLAIN_TEXT_MAP);
  });
});
