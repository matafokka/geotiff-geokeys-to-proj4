import { EllipsoidsNamesToProj } from "@/mappings-generation/predefined-mappings/EllipsoidsNamesToProj";
import { unitsGenerator } from "@/mappings-generation/generators/unitsGenerator";
import { ARGS } from "@/cli/args";
import { mappingGenerator } from "@/mappings-generation/generators/mappingGenerator";
import type { WithEpsgId } from "@/mappings-generation/types/misc";

interface Row extends WithEpsgId {
  name: string;
  a: number;
  b: number | null;
  f: number | null;
  uom: number;
}

export const ellipsoidsGenerator = mappingGenerator<Row, string>({
  name: "GeogEllipsoidGeoKey",
  type: "string",

  jsdoc: ['Maps EPSG ellipsoids to their data. Proj4 parameter is "+ellps"'],

  query: `
    SELECT
      e.ellipsoid_code  AS id,
      e.ellipsoid_name  AS name,
      e.semi_major_axis AS a,
      e.semi_minor_axis AS b,
      e.inv_flattening  AS f,
      e.uom_code AS uom
    FROM
      ${ARGS.schema}.epsg_ellipsoid AS e
  `,

  dependencies: [unitsGenerator],

  onEach: (row) => {
    // Get ellipsoid definition
    const fromCode = EllipsoidsNamesToProj[row.id];
    let ellipsoidString = "";

    if (fromCode) {
      ellipsoidString = fromCode;
    } else {
      let prevName = "";

      for (const name in EllipsoidsNamesToProj) {
        if (row.name.startsWith(name) && name.length > prevName.length) {
          prevName = name;
          ellipsoidString = EllipsoidsNamesToProj[name] ?? "";
        }
      }
    }

    if (ellipsoidString) {
      ellipsoidString = "+ellps=" + ellipsoidString + " ";
    }

    // Get axes
    const uom = unitsGenerator.state[row.uom];

    if (!uom) {
      return;
    }

    const a = row.a * uom.m;

    let b: number | undefined;

    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions -- 0 value is invalid
    if (row.f) {
      b = a - a / row.f;
      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions -- 0 value is invalid
    } else if (row.b) {
      b = row.b * uom.m;
    }

    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions -- 0 value is invalid
    if (!a || !b) {
      return;
    }

    return `${ellipsoidString}+a=${a} +b=${b}`;
  },
});
