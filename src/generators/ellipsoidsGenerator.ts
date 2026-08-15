import { EllipsoidsNamesToProj } from "@/mappings/predefined/EllipsoidsNamesToProj";
import { unitsGenerator } from "@/generators/unitsGenerator";
import { ARGS } from "@/cli/args";
import { mappingGenerator } from "@/generators/mappingGenerator";
import type { WithEpsgId } from "@/types/misc";

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
          ellipsoidString = EllipsoidsNamesToProj[name] || "";
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

    if (row.f) {
      b = a - a / row.f;
    } else if (row.b) {
      b = row.b * uom.m;
    }

    if (!a || !b) {
      return;
    }

    return `${ellipsoidString}+a=${a} +b=${b}`;
  },
});
