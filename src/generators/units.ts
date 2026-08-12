import { KnownBaseUnits } from "@/mappings/KnownBaseUnits";
import { ARGS } from "@/cli/args";
import { mappingGenerator } from "@/generators/mappingGenerator";
import type { WithEpsgId } from "@/types/misc";
import type { UnitsObj } from "@/types/UnitsObj";

interface Row extends WithEpsgId {
  base_unit: string | null;
  b: number | null;
  c: number | null;
}

export default mappingGenerator<Row, UnitsObj>({
  name: "Units",
  type: "UnitsObj",

  before: ['import type { UnitsObj } from "@/types/UnitsObj"'],

  jsdoc: [
    "Maps EPSG units to their: multipliers that converts them to meters (or standard base values, see below).",
    "",
    'Proj4 parameter is "+to_meter".',
    "",
    "Some of these units for some reason represents speed, angular speed and time.",
    "They're converted to m/s, rad/s and s respectively.",
    "Moreover, there's unity and unity/s where length is dimensionless.",
    "Looks like they should be treated as meters when projecting.",
    "",
    "Each value is either a multiplier",
  ],

  query: `
    SELECT
      u.uom_code AS id,
      u.factor_b AS b,
      u.factor_c AS c,
      u.target_uom_code AS base_unit
    FROM
      ${ARGS.schema}.epsg_unitofmeasure AS u
  `,

  onEach: (row) => {
    // If current unit is base unit, no multiplication needed
    let baseUnit = KnownBaseUnits[row.id];

    if (baseUnit) {
      return { m: 1, t: baseUnit };
    }

    // If current unit is base but can't be used in GeoTIFF
    if (row.id === row.base_unit || row.b === null || row.c === null) {
      return;
    }

    baseUnit = KnownBaseUnits[row.base_unit || ""];

    if (!baseUnit) {
      return;
    }

    return { m: row.b / row.c, t: baseUnit };
  },
});
