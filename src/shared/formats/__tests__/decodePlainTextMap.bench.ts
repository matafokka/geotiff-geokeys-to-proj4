import { test } from "vitest";

test("decodePlainTextMap()", async ({ bench }) => {
  const { PLAIN_TEXT_MAP } = await import("@/shared/formats/__tests__/fixtures");
  const { decodePlainTextMap, encodePlainTextMap } = await import("@/shared/formats/plain-text-map");

  const encoded = encodePlainTextMap(PLAIN_TEXT_MAP);
  bench("Decoding", () => decodePlainTextMap(encoded)).run();
});
