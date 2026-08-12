import { ARGS } from "@/cli/args";
import { mappingGenerator } from "@/generators/mappingGenerator";
import type { WithEpsgId } from "@/types/misc";
import { parseCsName } from "@/mappings/parseCsName";
import { getCsUomInfo } from "@/mappings/getCsUomInfo";

interface Row extends WithEpsgId {
  name: string;
}

export default mappingGenerator<Row, number>({
  name: "VerticalCS",
  type: "number",

  jsdoc: ["Maps vertical CS codes to height/depth multipliers. Resulting value always points up."],

  query: `
    SELECT
      cs.coord_sys_code AS id,
      cs.coord_sys_name as name
    FROM
      ${ARGS.schema}.epsg_coordinatesystem as cs
    WHERE
      cs.coord_sys_type = 'vertical'
  `,

  onEach: (row) => {
    const name = row.name.toLowerCase();

    // Local depth is measured from the reference point which we can't get. Such systems should not be supported.
    if (name.includes("local depth")) {
      return;
    }

    const cs = parseCsName(name);
    const uom = cs.uom?.[0];

    if (!uom) {
      return;
    }

    let m = 1;

    const orientation = cs.orientation && cs.orientation[0];
    const axis = cs.axis && cs.axis[0];

    if (orientation) {
      m = orientation.includes("u") ? 1 : -1;
    } else if (axis?.includes("d")) {
      // If no orientation, and axis is depth
      m = -1;
    }

    const { m: uomM } = getCsUomInfo(uom);
    return uomM ? m * uomM : undefined;
  },
});
