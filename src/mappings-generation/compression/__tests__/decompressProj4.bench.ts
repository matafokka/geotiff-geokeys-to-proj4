import { test } from "vitest";

test("decompressProj4() performance", async ({ bench }) => {
  const { CRS } = await import("@/lib/mappings/compressed/CRS");
  const { GeogEllipsoidGeoKey } = await import("@/lib/mappings/compressed/GeogEllipsoidGeoKey");
  const { decompressProj4 } = await import("@/mappings-generation/compression/decompressProj4");

  const single = CRS[2000] as string;

  bench("Decompress single string", () => decompressProj4(single)).run();

  bench("Decompress object", () => {
    for (const key in GeogEllipsoidGeoKey) {
      decompressProj4(GeogEllipsoidGeoKey[key]!);
    }
  }).run();
});
