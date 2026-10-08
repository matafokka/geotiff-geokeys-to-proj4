import { GeogEllipsoidGeoKey } from "@/lib/mappings/compressed/GeogEllipsoidGeoKey";
import { GeogGeodeticDatumGeoKey } from "@/lib/mappings/compressed/GeogGeodeticDatumGeoKey";
import { GeogPrimeMeridianGeoKey } from "@/lib/mappings/compressed/GeogPrimeMeridianGeoKey";
import { ProjCoordTransGeoKey } from "@/lib/mappings/compressed/ProjCoordTransGeoKey";
import { ProjectionGeoKey } from "@/lib/mappings/compressed/ProjectionGeoKey";
import { CRS } from "@/lib/mappings/compressed/CRS";
import { Units } from "@/lib/mappings/compressed/Units";
import { PCSKeys } from "@/lib/mappings/compressed/PCSKeys";
import { finalizeProj4 } from "@/lib/finalizeProj4";
import { radToDeg, toFixed } from "@/shared/utils/math";
import type { ConversionErrors, GeokeysNotSupportedErrors } from "@/lib/types/ConversionErrors";
import type { GeoKeys } from "@/shared/types/GeoKeys";
import type { CRSObj } from "@/mappings-generation/types/CRSObj";
import type { CoordinateUnits } from "@/shared/types/CoordinateUnits";
import { objToProj4, proj4ToObj } from "@/shared/utils/proj4";
import { decompressProj4 } from "@/mappings-generation/compression/decompressProj4";
import { KEYS_ORDER, USER_DEFINED } from "@/lib/const";
import { convertCoordinates } from "@/lib/convertCoordinates";
import type { CoordinateConversionParameters, SourceCoordinate } from "@/lib/types/coordinates";

/**
 * Geodetic keys which mappings should be copied straight into the Proj4 string.
 *
 * Property `n` lists keys' names. Newer keys come first.
 *
 * Property `o` points to an object from where to take the values.
 */
const geodeticKeysToCopy = [
  {
    n: ["GeodeticDatumGeoKey", "GeogGeodeticDatumGeoKey"],
    o: GeogGeodeticDatumGeoKey,
  },
  {
    n: ["PrimeMeridianGeoKey", "GeogPrimeMeridianGeoKey"],
    o: GeogPrimeMeridianGeoKey,
  },
  {
    n: ["EllipsoidGeoKey", "GeogEllipsoidGeoKey"],
    o: GeogEllipsoidGeoKey,
  },
] as const;

/**
 * Converts GeoTIFF's geokeys to Proj4 string and produces associated data
 *
 * @param geoKeys Geokeys
 * @return Proj4 string and associated data
 */
export function toProj4(geoKeys: GeoKeys) {
  //---------------------//
  //    Read base CRS    //
  //---------------------//

  let proj = "";
  let x = 1;
  let y = 1;
  let z = 1;
  const errors: ConversionErrors = {};

  // First, get CRS, both geographic and projected
  const geographicCode = geoKeys.GeodeticCRSGeoKey ?? geoKeys.GeographicTypeGeoKey;
  const projectedCode = geoKeys.ProjectedCRSGeoKey ?? geoKeys.ProjectedCSTypeGeoKey;

  if (geographicCode !== undefined && projectedCode !== undefined) {
    errors.bothGCSAndPCSAreSet = true;
  }

  const crsKey = geographicCode ?? projectedCode;

  if (crsKey !== undefined) {
    const crs = CRS[crsKey];

    // Numbers are multipliers from vertical CRS
    if (crs !== undefined && typeof crs !== "number") {
      if (typeof crs === "string") {
        proj = decompressProj4(crs);
      } else {
        proj = decompressProj4(crs.p);
        x = crs.x;
        y = crs.y;
        z = crs.z ?? z;
      }
    } else if (crsKey !== USER_DEFINED) {
      errors.CRSNotSupported = crsKey;
    }
  }

  //---------------------//
  //   Read vertical CS  //
  //---------------------//

  const verticalCode = geoKeys.VerticalGeoKey ?? geoKeys.VerticalCSTypeGeoKey;

  if (verticalCode !== undefined && verticalCode !== USER_DEFINED) {
    const verticalCs = CRS[verticalCode]; // Yes, that's CRS, not CS. Either vertical CRS or geographic 3D CRS may be set.

    if (typeof verticalCs === "number") {
      z = verticalCs;
    } else if ((verticalCs as CRSObj)?.z !== undefined) {
      z = (verticalCs as Required<CRSObj>).z;
    } else {
      errors.verticalCsNotSupported = verticalCode;
    }
  } else if (geoKeys.VerticalUnitsGeoKey !== undefined) {
    const units = Units[geoKeys.VerticalUnitsGeoKey];

    if (units) {
      z = units.m;
    } else {
      errors.verticalCsUnitsNotSupported = geoKeys.VerticalUnitsGeoKey;
    }

    if (geoKeys.VerticalDatumGeoKey !== undefined) {
      errors.verticalDatumsNotSupported = geoKeys.VerticalDatumGeoKey;
    }
  }

  // If GeoTIFF uses PCS string rebuilding will override +proj
  if (!proj) {
    proj = "+proj=longlat";
  }

  //---------------------//
  // Copy geodetic keys  //
  //---------------------//

  for (const key of geodeticKeysToCopy) {
    for (const name of key.n) {
      const value = geoKeys[name];

      if (value === undefined) {
        continue;
      }

      let keyValue = key.o[value];

      if (typeof keyValue === "string") {
        keyValue = decompressProj4(keyValue);
      }

      if (keyValue !== undefined) {
        proj += " " + keyValue;
        continue;
      }
    }
  }

  // All other geokeys will override ones provided by keys above

  //---------------------//
  //      Read units     //
  //---------------------//

  const units = {
    GeogLinearUnitsGeoKey: 1,
    GeogAngularUnitsGeoKey: 1,
    ProjLinearUnitsGeoKey: 1,
  } satisfies Partial<Record<keyof GeoKeys, number>>;

  const unitsDescriptions: Partial<Record<keyof typeof units, CoordinateUnits>> = {};

  /** True means that the geokey redefines CRS's units */
  const unitDefs: Partial<Record<keyof typeof units, true | undefined>> = {};

  for (const key in units) {
    const name = key as keyof typeof units;
    const unit = geoKeys[name];
    let m: number | undefined;

    if (unit === undefined) {
      continue;
    }

    if (unit === USER_DEFINED) {
      // Example: "GeogLinearUnitsGeoKey" -> "GeogLinearUnitSizeGeoKey"
      const sizeKeyName = (key.substring(0, key.length - 7) + "SizeGeoKey") as keyof GeoKeys & `${string}SizeGeoKey`;
      const size = geoKeys[sizeKeyName];

      if (size === undefined) {
        errors[(sizeKeyName + "NotDefined") as keyof ConversionErrors & `${string}NotDefined`] = true;
      } else {
        m = size;
      }

      unitsDescriptions[name] = sizeKeyName === "GeogAngularUnitSizeGeoKey" ? "degree" : "metre";
    } else if (Units[unit]) {
      const unitsObj = Units[unit];
      m = unitsObj.m;
      unitsDescriptions[name] = unitsObj.t;
    }

    if (m === undefined) {
      // This EPSG key doesn't exist. Assuming meters or degrees.
      m = 1;
      errors[(key + "NotSupported") as keyof GeokeysNotSupportedErrors] = unit;
    } else {
      unitDefs[name] = true;

      if (key === "GeogAngularUnitsGeoKey") {
        m = radToDeg(m); // Radians are angular base units. Must convert to degrees.
        unitsDescriptions[key] = unitsDescriptions[key]?.replaceAll("radian", "degree") as CoordinateUnits;
      }
    }

    units[name] = m;
  }

  //---------------------//
  //       Read axes     //
  //---------------------//

  const a =
    (geoKeys.EllipsoidSemiMajorAxisGeoKey ?? geoKeys.GeogSemiMajorAxisGeoKey ?? 0) * units.GeogLinearUnitsGeoKey;

  let b = (geoKeys.EllipsoidSemiMinorAxisGeoKey ?? geoKeys.GeogSemiMinorAxisGeoKey ?? 0) * units.GeogLinearUnitsGeoKey;

  const invFlattening = geoKeys.EllipsoidInvFlatteningGeoKey ?? geoKeys.GeogInvFlatteningGeoKey;

  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions -- values of 0 are invalid
  if (invFlattening && a) {
    // Can't calculate semi minor axis if semi major axis is missing
    b = a - a / invFlattening;
  }

  if (a) {
    proj += " +a=" + a;
  }

  if (!b && proj.includes("+b")) {
    b = a;
  }

  if (b) {
    proj += " +b=" + b;
  }

  // Get prime meridian
  const pm = geoKeys.PrimeMeridianLongitudeGeoKey ?? geoKeys.GeogPrimeMeridianLongGeoKey;

  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions -- defaults to 0 from Greenwich
  if (pm) {
    proj += " +pm=" + pm * units.GeogAngularUnitsGeoKey;
  }

  // To WGS key

  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
  if (geoKeys.GeogTOWGS84GeoKey?.length) {
    proj += " +towgs84=" + geoKeys.GeogTOWGS84GeoKey.join();
  }

  //---------------------//
  //         PCS         //
  //---------------------//

  // This key (despite its name) defines a conversion -- a method (and its parameters) which converts coordinates.
  // The basic example of it is a projection.

  if (geoKeys.ProjectionGeoKey !== undefined && geoKeys.ProjectionGeoKey !== USER_DEFINED) {
    const conversion = ProjectionGeoKey[geoKeys.ProjectionGeoKey];

    if (conversion) {
      proj += " " + decompressProj4(conversion);
    } else {
      errors.conversionNotSupported = geoKeys.ProjectionGeoKey;
    }
  }

  for (const object of PCSKeys) {
    for (const key in object) {
      const keyDef = object[key as keyof GeoKeys]!;

      let keyValue = geoKeys[key as keyof GeoKeys] as number;

      if (keyValue === undefined) {
        continue;
      }

      // Get key definition and units
      let m: number;

      if (keyDef.u === 1) {
        m = units.GeogAngularUnitsGeoKey;
      } else if (keyDef.u === 2) {
        m = units.ProjLinearUnitsGeoKey;
      } else {
        m = 1;
      }

      keyValue *= m;
      proj += " " + decompressProj4(`${keyDef.p}=${keyValue}`);
    }
  }

  // This key should take precedence over all other keys
  const transformKey = geoKeys.ProjMethodGeoKey ?? geoKeys.ProjCoordTransGeoKey;

  if (transformKey !== undefined && transformKey !== USER_DEFINED) {
    const projCompressed = ProjCoordTransGeoKey[transformKey];

    if (projCompressed) {
      proj += " " + decompressProj4(projCompressed);
    } else {
      errors.coordinateTransformationNotSupported = transformKey;
    }
  }

  // Everybody seem to suggest to add +no_defs to avoid errors caused by default values
  proj += " +no_defs";

  //---------------------//
  //  String processing  //
  //---------------------//

  const projObj = proj4ToObj(proj);
  finalizeProj4(projObj, geoKeys);
  proj = objToProj4(projObj, KEYS_ORDER);

  //------------//
  //  Metadata  //
  //------------//

  const isGCS = projObj["+proj"] === "longlat";
  let coordinatesUnits: CoordinateUnits;

  if (isGCS) {
    coordinatesUnits = unitsDescriptions.GeogAngularUnitsGeoKey || "degree";

    if (unitDefs.GeogAngularUnitsGeoKey) {
      x = y = units.GeogAngularUnitsGeoKey;
    }
  } else {
    coordinatesUnits = unitsDescriptions.ProjLinearUnitsGeoKey || "metre";

    if (unitDefs.ProjLinearUnitsGeoKey) {
      x = y = units.ProjLinearUnitsGeoKey;
    }
  }

  //-----------//
  //  Results  //
  //-----------//

  x = toFixed(x);
  y = toFixed(y);
  z = toFixed(z);

  const conversionParameters: CoordinateConversionParameters = { x, y, z };

  return {
    /** Proj4 string */
    proj4: proj,

    /** Coordinates conversion parameters */
    conversionParameters,

    /** {@link convertCoordinates} but for these exact geokeys */
    convertCoordinates: (coord: SourceCoordinate) => convertCoordinates(coord, conversionParameters),

    /**
     * Coordinates units after conversion. See {@link CoordinateUnits} for more info.
     */
    coordinatesUnits,

    /** If `true` then geographic (either 2D or 3D) CRS is used. */
    isGCS,

    /**
     * Errors that have occurred while processing geokeys.
     *
     * If no errors have occurred then this will be an empty object.
     */
    errors,
  };
}
