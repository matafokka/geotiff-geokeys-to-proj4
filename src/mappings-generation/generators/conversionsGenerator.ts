import { MethodParameters } from "@/mappings-generation/predefined-mappings/MethodParameters";
import { Methods } from "@/mappings-generation/predefined-mappings/Methods";
import { ARGS } from "@/cli/args";
import { mappingGenerator } from "@/mappings-generation/generators/mappingGenerator";
import type { WithEpsgId } from "@/mappings-generation/types/misc";
import { radToDeg } from "@/shared/utils/math";
import { toDeg } from "@/mappings-generation/generators/utils/toDeg";
import { unitsGenerator } from "@/mappings-generation/generators/unitsGenerator";
import { objToProj4 } from "@/shared/utils/proj4";

interface Row extends WithEpsgId {
  method: number;
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
    const method = Methods[row.method];

    if (!method) {
      return;
    }

    const params: Record<string, number | undefined> = {};

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

      if (uomCode !== null && unitsGenerator.state[uomCode]) {
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

      params["+" + paramDef] = value;
    }

    // Exceptions

    // Polar Stereographic (variants B and C). If +lat_0 is not set, use North or South Pole by default.
    // Infer the Pole's hemisphere by the sign of latitude of true scale.
    // Since the projection covers only one hemisphere, this inference is correct.

    if ((row.method === 9829 || row.method === 9830) && params["+lat_0"] === undefined) {
      const latTs = params["+lat_ts"];

      if (latTs === undefined) {
        throw new Error("Cannot infer +lat_0 for Polar Stereographic: latitude of true scale is not set.");
      }

      params["+lat_0"] = Math.sign(latTs) * 90;
    }

    return method + " " + objToProj4(params);
  },
});
