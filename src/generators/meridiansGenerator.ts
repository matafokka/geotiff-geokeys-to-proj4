import { ARGS } from "@/cli/args";
import { mappingGenerator } from "@/generators/mappingGenerator";
import type { WithEpsgId } from "@/types/misc";
import { toDeg } from "@/generators/utils/toDeg";
import { unitsGenerator } from "@/generators/unitsGenerator";

interface Row extends WithEpsgId {
  lng: number;
  uom: number;
}

export const meridiansGenerator = mappingGenerator<Row, number>({
  name: "GeogPrimeMeridianGeoKey",
  type: "number",
  jsdoc: ['Maps EPSG prime meridians to their longitudes. Proj4 parameter is "+pm"'],
  dependencies: [unitsGenerator],

  query: `
    SELECT
      pm.prime_meridian_code AS id,
      pm.greenwich_longitude AS lng,
      pm.uom_code AS uom
    FROM
      ${ARGS.schema}.epsg_primemeridian AS pm
  `,

  onEach: (row) => toDeg(row.lng, row.uom),
});
