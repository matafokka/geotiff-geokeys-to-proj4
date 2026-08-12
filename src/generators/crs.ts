import { AdditionalCRS } from "@/mappings/AdditionalCRS";
import { GeogGeodeticDatumGeoKey } from "@/mappings/GeogGeodeticDatumGeoKey";
import { ProjectionGeoKey } from "@/mappings/ProjectionGeoKey";
import { VerticalCS } from "@/mappings/VerticalCS";
import { ARGS } from "@/cli/args";
import { mappingGenerator } from "@/generators/mappingGenerator";
import type { WithEpsgId } from "@/types/misc";
import { parseCsName } from "@/mappings/parseCsName";
import { getCsUomInfo } from "@/mappings/getCsUomInfo";
import { parseFloatLoose } from "@/utils/misc";
import type { CRSObj } from "@/types/CRSObj";
import { decodeProj4, encodeProj4, objToProj4, proj4ToObj } from "@/utils/proj4";

// Some EPSG GCS are using 3D cartesian coordinate systems.
// See:
// 1. https://en.wikipedia.org/wiki/Geographic_coordinate_system#3D_Cartesian_coordinates
// 2. https://en.wikipedia.org/wiki/Geographic_coordinate_conversion#From_ECEF_to_geodetic_coordinates).

// There's no way to map images (2D planes) to such systems, that's why we won't support such GCS.
// No idea why GeoTIFF lists these GCS as supported.

// GeoTIFF also contains ModelTiepointTag which can be used to specify XYZ coordinates of a set of points. However:
//
//   1. It's unclear whether Z represents height or distance from the Earth's center.
//   2. "this third dimension is provided in anticipation of future support for 3D digital elevation models
//   and vertical coordinate systems".
//
// So, for now, there's no standard use for this tag.

interface Row extends WithEpsgId {
  type: string;
  cs_name: string;
  compound_horizontal_crs: number | null;
  compound_vertical_crs: number | null;
  datum: number | null;
  base_crs: number | null;
  conversion: number | null;
  cs_id: number | null;
  base_datum: number | null;
  base_crs_cs_code: number | null;
  vertical_cs: number | null;
}

interface UOMNames {
  x: string;
  y: string;
  z?: string;
}

interface UOM {
  x: number;
  y: number;
  z?: number;
}

/**
 * CS to ignore orientation of.
 *
 * These CS have messed up description, but they're ok without transformation.
 */
const TO_IGNORE_ORIENTATION: Record<string, true | undefined> = {
  1035: true,
  1036: true,
  1037: true,
  1038: true,
  4499: true,
  4463: true,
  4464: true,
  4465: true,
  4466: true,
  4467: true,
  4468: true,
  4469: true,
  4470: true,
  6500: true,
};

const ORIENTATION_LETTERS: Record<string, true | undefined> = {};

for (const letter of "nsewud") {
  ORIENTATION_LETTERS[letter] = true;
}

export default mappingGenerator<Row, string | number | CRSObj>({
  name: "CRS",
  before: ['import type { CRSObj } from "@/types/CRSObj"'],
  type: "string | number | CRSObj",

  jsdoc: [
    "Maps EPSG CRS to their Proj4 definitions. Should be a base for Proj4 string.",
    "",
    "Corresponding geokeys are `GeographicTypeGeoKey` and `ProjectedCSTypeGeoKey`.",
  ],

  query: `
    SELECT crs.coord_ref_sys_code AS id,
      crs.coord_ref_sys_kind as type,
      cs.coord_sys_name as cs_name,
      crs.cmpd_horizcrs_code AS compound_horizontal_crs,
      crs.cmpd_vertcrs_code AS compound_vertical_crs,
      crs.datum_code AS datum,
      crs.base_crs_code AS base_crs,
      crs.projection_conv_code AS conversion,
      cs.coord_sys_code AS cs_id,
      base_crs_data.datum_code AS base_datum,
      base_crs_data.coord_sys_code AS base_crs_cs_code,
      vertical_crs_data.coord_sys_code AS vertical_cs
    FROM ${ARGS.schema}.epsg_coordinatereferencesystem as crs
      LEFT JOIN ${ARGS.schema}.epsg_coordinatereferencesystem base_crs_data ON crs.base_crs_code = base_crs_data.coord_ref_sys_code
      LEFT JOIN ${ARGS.schema}.epsg_coordinatesystem cs ON cs.coord_sys_code = crs.coord_sys_code
      LEFT JOIN ${ARGS.schema}.epsg_coordinatereferencesystem vertical_crs_data ON crs.cmpd_vertcrs_code = vertical_crs_data.coord_ref_sys_code
    WHERE crs.coord_ref_sys_kind NOT LIKE 'engineering'
    -- Make compound CRS and derived CRS come last, so we can reference previously fetched CRS
    ORDER BY crs.coord_ref_sys_kind DESC, crs.base_crs_code DESC
  `,

  onEach: (row, fetchedCRS) => {
    // Due to sorting, compound CRS come last
    if (row.type === "compound") {
      const horizontalCRS = fetchedCRS[row.compound_horizontal_crs!];
      const z = VerticalCS[row.vertical_cs!];

      if (!z) {
        return;
      }

      switch (typeof horizontalCRS) {
        case "string":
          return { p: horizontalCRS, x: 1, y: 1, z };
        case "object":
          return { ...horizontalCRS, z };
      }

      return;
    }

    // Return multiplier for vertical CRS
    if (row.type === "vertical") {
      return VerticalCS[row.cs_id!] || VerticalCS[row.base_crs_cs_code!];
    }

    let conversion = decodeProj4(ProjectionGeoKey[row.conversion!] || "");

    if (!conversion) {
      if (row.type === "projected") {
        return;
      }

      conversion = row.type === "geocentric" ? "geocent" : "longlat";
    }

    const datum = decodeProj4(GeogGeodeticDatumGeoKey[row.datum!] || GeogGeodeticDatumGeoKey[row.base_datum!] || "");

    if (!datum) {
      return;
    }

    const conversionKeys = proj4ToObj("+proj=" + conversion);
    const datumKeys = proj4ToObj(datum);

    for (const key in datumKeys) {
      conversionKeys[key] = datumKeys[key];
    }

    // Exceptions

    if (row.cs_id === 4468) {
      const value = parseFloatLoose(conversionKeys["+lat_0"]);
      conversionKeys["+lat_0"] = value + 90 + ""; // Not sure if it must be added or replaced
    }

    // Merge keys into a string

    let projStr = objToProj4(conversionKeys);

    if (!row.cs_name) {
      return projStr;
    }

    // Get orientation, i.e. +axis parameter

    const cs = parseCsName(row.cs_name);
    let orientation = "";
    let isOrientationValid = !!cs.orientations;

    if (cs.orientations) {
      for (const direction of cs.orientations) {
        const firstLetter = direction[0];

        if (!ORIENTATION_LETTERS[firstLetter]) {
          if (!TO_IGNORE_ORIENTATION[row.cs_id!]) {
            return;
          }

          isOrientationValid = false;
          break;
        }

        orientation += firstLetter;
      }
    }

    // Validate orientation further
    if (isOrientationValid) {
      const directionsCounts: Record<string, number | undefined> = {};

      for (const direction of orientation) {
        directionsCounts[direction] = (directionsCounts[direction] || 0) + 1;

        if (directionsCounts[direction] === 1) {
          continue;
        }

        isOrientationValid = false;

        if (TO_IGNORE_ORIENTATION[row.cs_id!]) {
          break;
        }

        return;
      }
    }

    const isVertical = row.type === "vertical";

    if (!cs.uom) {
      return;
    }

    const uomNames: UOMNames = {
      x: cs.uom[0],
      y: cs.uom[1],
      z: cs.uom[isVertical ? 0 : 2],
    };

    const isGeographic3d = row.type === "geographic 3D";
    const isGeocentric = row.type === "geocentric";

    if (!isGeographic3d && !isGeocentric) {
      delete uomNames.z;
    }

    if (!uomNames.y) {
      uomNames.y = uomNames.x;
    }

    if (!uomNames.z) {
      if (isGeographic3d || isVertical) {
        return;
      }

      if (isGeocentric) {
        uomNames.z = uomNames.x;
      }
    }

    const uom = {} as UOM;
    const axes = Object.keys(uomNames) as (keyof UOMNames)[];
    let isAngle = false;

    for (const axis of axes) {
      if (!uomNames[axis]) {
        continue;
      }

      const multiplier = getCsUomInfo(uomNames[axis]);

      if (!multiplier.m) {
        return;
      }

      isAngle = isAngle || multiplier.isAngle;
      uom[axis] = multiplier.m;
    }

    if (orientation && isOrientationValid) {
      projStr += " +axis=" + orientation;
    }

    if (!isAngle && uom.x == uom.y && uom.x) {
      if (uom.x !== 1) {
        projStr += " +to_meter=" + uom.x;
      }
    } else if (uom.x || uom.y) {
      return uom.x && uom.y ? { p: projStr, ...uom } : undefined;
    }

    return projStr;
  },

  onEnd: (crs) => {
    // Copy additional CRS

    for (const key in AdditionalCRS) {
      if (!crs[key] && AdditionalCRS[key]) {
        crs[key] = AdditionalCRS[key];
      }
    }

    for (const key in crs) {
      let value = crs[key];

      // If every coordinate multiplier is 1 then leave string only

      if (typeof value === "object" && value.x === 1 && value.y === 1 && (!value.z || value.z === 1)) {
        value = value.p;
      }

      // Encode Proj4 strings

      switch (typeof value) {
        case "string":
          value = encodeProj4(value);
          break;
        case "object":
          value.p = encodeProj4(value.p);
          break;
      }

      crs[key] = value;
    }
  },
});
