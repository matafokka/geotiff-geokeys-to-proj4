import { GeogEllipsoidGeoKey } from "@/mappings/GeogEllipsoidGeoKey";
import { GeogPrimeMeridianGeoKey } from "@/mappings/GeogPrimeMeridianGeoKey";
import { KnownDatums } from "@/mappings/KnownDatums";
import { ARGS } from "@/cli/args";
import { mappingGenerator } from "@/generators/mappingGenerator";
import type { WithEpsgId } from "@/types/misc";
import { decodeProj4, encodeProj4 } from "@/utils/proj4";

interface Row extends WithEpsgId {
  pm: number | null;
  ref_pm: number | null;
  ellipsoid: number | null;
  ref_ellipsoid: number | null;
}

export default mappingGenerator<Row, string>(() => {
  // Ensemble datums have multiple realizations. We need to account only the latest realizations.
  let addedIds: Record<string, true | undefined> = {};

  return {
    name: "GeogGeodeticDatumGeoKey",
    type: "string",

    jsdoc: ["Maps EPSG datums to their Proj4 definition. Append values directly to Proj4 string."],

    query: `
      SELECT
        d.datum_code AS id,
        d.ellipsoid_code AS ellipsoid,
        d.prime_meridian_code AS pm,
        member_data.ellipsoid_code AS ref_ellipsoid,
        member_data.prime_meridian_code AS ref_pm
      FROM ${ARGS.schema}.epsg_datum as d
        LEFT JOIN ${ARGS.schema}.epsg_datumensemblemember member ON d.datum_code = member.datum_ensemble_code
        LEFT JOIN ${ARGS.schema}.epsg_datum member_data on member_data.datum_code = member.datum_code
      WHERE
        d.datum_type NOT LIKE 'vertical' AND
        d.datum_type NOT LIKE 'engineering' AND
        (
          d.ellipsoid_code IS NOT NULL OR
          member_data.ellipsoid_code IS NOT NULL
        ) AND
        (
          d.prime_meridian_code IS NOT NULL OR
          member_data.prime_meridian_code IS NOT NULL
        )
      -- Get newest ensemble datums realizations first
      ORDER BY member.datum_sequence DESC
    `,

    onStart: () => (addedIds = {}),

    onEach: (row) => {
      const id = row.id;

      if (addedIds[id]) {
        return;
      }

      addedIds[id] = true;

      const meridian = row.pm || row.ref_pm;
      const ellipsoid = row.ellipsoid || row.ref_ellipsoid;
      let str = "";

      if (ellipsoid && ellipsoid in GeogEllipsoidGeoKey) {
        str += decodeProj4(GeogEllipsoidGeoKey[ellipsoid]!);
      }

      if (meridian && meridian in GeogPrimeMeridianGeoKey) {
        str += " +pm=" + GeogPrimeMeridianGeoKey[meridian];
      }

      if (id in KnownDatums) {
        str += " +towgs84=" + KnownDatums[id];
      }

      return encodeProj4(str);
    },
  };
});
