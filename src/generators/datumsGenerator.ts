import { KnownDatums } from "@/mappings/predefined/KnownDatums";
import { ARGS } from "@/cli/args";
import { mappingGenerator } from "@/generators/mappingGenerator";
import type { WithEpsgId } from "@/types/misc";
import { meridiansGenerator } from "@/generators/meridiansGenerator";
import { ellipsoidsGenerator } from "@/generators/ellipsoidsGenerator";

interface Row extends WithEpsgId {
  pm: number | null;
  ref_pm: number | null;
  ellipsoid: number | null;
  ref_ellipsoid: number | null;
}

export const datumsGenerator = mappingGenerator<Row, string>(() => {
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

    dependencies: [meridiansGenerator, ellipsoidsGenerator],

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

      if (ellipsoid && ellipsoid in ellipsoidsGenerator.state) {
        str += ellipsoidsGenerator.state[ellipsoid]!;
      }

      if (meridian && meridian in meridiansGenerator.state) {
        str += " +pm=" + meridiansGenerator.state[meridian];
      }

      if (id in KnownDatums) {
        str += " +towgs84=" + KnownDatums[id];
      }

      return str;
    },
  };
});
