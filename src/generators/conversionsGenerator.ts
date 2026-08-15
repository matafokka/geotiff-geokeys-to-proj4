import { MethodParameters } from "@/mappings/predefined/MethodParameters";
import { Methods } from "@/mappings/predefined/Methods";
import { ARGS } from "@/cli/args";
import { mappingGenerator } from "@/generators/mappingGenerator";
import type { WithEpsgId } from "@/types/misc";
import { radToDeg } from "@/utils/math";
import { toDeg } from "@/generators/utils/toDeg";
import { unitsGenerator } from "@/generators/unitsGenerator";

interface Row extends WithEpsgId {
  method: string;
  params: {
    f1: number;
    f2: number | null;
    f3: number | null;
  }[];
}

const angularUnitsSubstrings = ["lat", "lon", "alpha", "gamma"];

export const conversionsGenerator = mappingGenerator<Row, string>({
  name: "ProjectionGeoKey",
  type: "string",

  jsdoc: [
    "Maps EPSG conversions to their Proj4 definitions.",
    "",
    "Corresponding geokeys are GeographicTypeGeoKey and ProjectedCSTypeGeoKey.",
  ],

  query: `
    SELECT
      op.coord_op_code AS id,
      op.coord_op_method_code AS method,
      json_agg((param.parameter_code, param.parameter_value, uom_code)) AS params
    FROM
      ${ARGS.schema}.epsg_coordoperation op
      INNER JOIN
        ${ARGS.schema}.epsg_coordoperationmethod method ON op.coord_op_method_code = method.coord_op_method_code
      INNER JOIN
        ${ARGS.schema}.epsg_coordoperationparamvalue param ON op.coord_op_code = param.coord_op_code
    GROUP BY
      id
  `,

  dependencies: [unitsGenerator],

  onEach: (row) => {
    let method = Methods[row.method];

    if (!method) {
      return;
    }

    for (const param of row.params) {
      const paramDef = MethodParameters[param.f1];

      if (!paramDef) {
        continue;
      }

      let value = param.f2;

      if (value === null) {
        return;
      }

      const uomCode = param.f3;

      if (uomCode && unitsGenerator.state[uomCode]) {
        let { m } = unitsGenerator.state[uomCode];

        if (angularUnitsSubstrings.some((str) => paramDef.includes(str))) {
          m = radToDeg(m); // Radians are angular base units
        }

        value *= m;
      } else if (param.f3 === null) {
        return;
      } else {
        value = toDeg(value, param.f3) ?? null;

        if (value === null) {
          return;
        }
      }

      method += ` +${paramDef}=${value}`;
    }

    return method;
  },
});
