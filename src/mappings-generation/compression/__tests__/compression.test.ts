import { decompressProj4 } from "@/mappings-generation/compression/decompressProj4";
import { CRS } from "@/lib/mappings/compressed/CRS";
import { GeogEllipsoidGeoKey } from "@/lib/mappings/compressed/GeogEllipsoidGeoKey";
import { GeogGeodeticDatumGeoKey } from "@/lib/mappings/compressed/GeogGeodeticDatumGeoKey";
import { UncompressedCRS } from "@/lib/mappings/uncompressed/UncompressedCRS";
import { UncompressedGeogEllipsoidGeoKey } from "@/lib/mappings/uncompressed/UncompressedGeogEllipsoidGeoKey";
import { UncompressedGeogGeodeticDatumGeoKey } from "@/lib/mappings/uncompressed/UncompressedGeogGeodeticDatumGeoKey";
import { UncompressedProjectionGeoKey } from "@/lib/mappings/uncompressed/UncompressedProjectionGeoKey";
import { ProjCoordTransGeoKey } from "@/lib/mappings/compressed/ProjCoordTransGeoKey";
import { ProjCoordTransGeoKey as UncompressedProjCoordTransGeoKey } from "@/mappings-generation/predefined-mappings/ProjCoordTransGeoKey";
import { ProjectionGeoKey } from "@/lib/mappings/compressed/ProjectionGeoKey";
import type { CRSObj } from "@/mappings-generation/types/CRSObj";
import { proj4ToKeyValueStrings } from "@/shared/utils/proj4";
import { PCSKeys } from "@/lib/mappings/compressed/PCSKeys";
import { PCSKeys as UncompressedPCSKeys } from "@/mappings-generation/predefined-mappings/PCSKeys";
import type { GeoKeys } from "@/shared/types/GeoKeys";
import { afterEach, beforeEach, describe, expect, test } from "vitest";

interface Fixture {
  epsgIndex: string;
  compressed: string;
  uncompressed: string;
}

class FileFixtures {
  fixtures: Fixture[] = [];

  constructor(public name: string) {}
}

function getFiles() {
  const files: FileFixtures[] = [];

  interface PlainObjectMapping {
    name: string;
    compressed: Record<string, string | undefined>;
    uncompressed: Record<string, string | undefined>;
  }

  const plainObjects: PlainObjectMapping[] = [
    {
      name: "GeogGeodeticDatumGeoKey",
      compressed: GeogGeodeticDatumGeoKey,
      uncompressed: UncompressedGeogGeodeticDatumGeoKey,
    },
    { name: "GeogEllipsoidGeoKey", compressed: GeogEllipsoidGeoKey, uncompressed: UncompressedGeogEllipsoidGeoKey },
    { name: "ProjectionGeoKey", compressed: ProjectionGeoKey, uncompressed: UncompressedProjectionGeoKey },
    { name: "ProjCoordTransGeoKey", compressed: ProjCoordTransGeoKey, uncompressed: UncompressedProjCoordTransGeoKey },
  ];

  for (const pojo of plainObjects) {
    const fileFixtures = new FileFixtures(pojo.name);
    files.push(fileFixtures);

    for (const key in pojo.compressed) {
      fileFixtures.fixtures.push({
        epsgIndex: key,
        compressed: pojo.compressed[key]!,
        uncompressed: pojo.uncompressed[key]!,
      });
    }
  }

  const crsFixtures = new FileFixtures("CRS");
  files.push(crsFixtures);

  for (const key in CRS) {
    const value = CRS[key];
    const origValue = UncompressedCRS[key];

    switch (typeof value) {
      case "string":
        crsFixtures.fixtures.push({ epsgIndex: key, compressed: value, uncompressed: origValue as string });
        break;

      case "object":
        crsFixtures.fixtures.push({ epsgIndex: key, compressed: value.p, uncompressed: (origValue as CRSObj).p });
        break;
    }
  }

  const pcsKeysFixtures = new FileFixtures("PCSKeys");
  files.push(pcsKeysFixtures);

  for (let i = 0; i < PCSKeys.length; i++) {
    const encodedObj = PCSKeys[i];
    const originalObj = UncompressedPCSKeys[i];

    for (const key in encodedObj) {
      pcsKeysFixtures.fixtures.push({
        epsgIndex: key,
        compressed: encodedObj[key as keyof GeoKeys]!.p,
        uncompressed: originalObj[key as keyof GeoKeys]!.p,
      });
    }
  }

  return files;
}

function normalizeProj4String(str: string) {
  return proj4ToKeyValueStrings(str).sort().join(" ");
}

let bail = false;

describe.each(getFiles())(`File "$name" compressed correctly`, (file) => {
  beforeEach((ctx) => {
    if (bail) {
      ctx.skip();
    }
  });

  afterEach((ctx) => {
    if (ctx.task.result?.state === "fail") {
      bail = true;
    }
  });

  test.each(file.fixtures)(`EPSG index "$epsgIndex" compressed correctly`, (fixture) => {
    const decompressed = normalizeProj4String(decompressProj4(fixture.compressed));
    const original = normalizeProj4String(fixture.uncompressed);
    expect(decompressed).toEqual(original);
  });
});
