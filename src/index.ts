import { GeogEllipsoidGeoKey } from "@/mappings/GeogEllipsoidGeoKey";
import { GeogGeodeticDatumGeoKey } from "@/mappings/GeogGeodeticDatumGeoKey";
import { GeogPrimeMeridianGeoKey } from "@/mappings/GeogPrimeMeridianGeoKey";
import { ProjCoordTransGeoKey } from "@/mappings/ProjCoordTransGeoKey";
import { ProjectionGeoKey } from "@/mappings/ProjectionGeoKey";
import { CRS } from "@/mappings/CRS";
import { Units } from "@/mappings/Units";
import { PCSKeys } from "@/mappings/PCSKeys";
import { transformProj4 } from "@/mappings/transformProj4";
import { radToDeg, toFixed } from "@/utils/math";
import type { ConversionErrors, GeokeysNotSupportedErrors } from "@/types/ConversionErrors";
import type { GeoKeys } from "@/types/GeoKeys";
import type { CRSObj } from "@/types/CRSObj";
import type { CoordinateUnits } from "@/types/CoordinateUnits";
import { decodeProj4, objToProj4, proj4ToObj } from "@/utils/proj4";

export type { ConversionErrors, GeokeysNotSupportedErrors, CoordinateUnits, GeoKeys };

/**
 * Parameters to pass to {@link convertCoordinates} or to convert coordinates manually
 */
export interface CoordinateConversionParameters {
  /** X multiplier */
  x: number;

  /** Y multiplier */
  y: number;

  /** Z multiplier */
  z: number;
}

export interface SourceCoordinate {
  /** X Coordinate */
  x: number;

  /** Y coordinate */
  y: number;

  /**
   * Z coordinate (pixel value).
   *
   * If you don't need heights omit this value. The resulting Z coordinate will be 0.
   */
  z?: number;
}

export interface ConvertedCoordinate {
  /** X coordinate (coordinate of a first axis of CRS) of a point */
  x: number;

  /** Y coordinate (coordinate of a second axis of CRS) of a point */
  y: number;

  /**
   * Z coordinate (coordinate of a third axis of CRS) of a point, i.e. transformed pixel value. Always points up.
   *
   * If source coordinate doesn't have Z axis then this will be 0.
   */
  z: number;
}

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
 * Represents a user-defined value
 */
const USER_DEFINED = 32767;

/** Order in which tokens should be written to final string to make it look nice */
const KEYS_ORDER = [
  "+proj",
  "+lat_0",
  "+lon_0",
  "+lat_1",
  "+lat_ts",
  "+lon_1",
  "+lat_2",
  "+lon_2",
  "+k_0",
  "+x_0",
  "+y_0",
  "+ellps",
  "+a",
  "+b",
  "+pm",
  "+towgs84",
  "+approx",
];

/**
 * Converts GeoTIFF's geokeys to Proj4 string
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
  const geographicCode = geoKeys.GeodeticCRSGeoKey || geoKeys.GeographicTypeGeoKey;
  const projectedCode = geoKeys.ProjectedCRSGeoKey || geoKeys.ProjectedCSTypeGeoKey;

  if (geographicCode && projectedCode) {
    errors.bothGCSAndPCSAreSet = true;
  }

  const crsKey = geographicCode || projectedCode;

  if (crsKey) {
    const crs = CRS[crsKey];

    // Numbers are multipliers from vertical CRS
    if (crs && typeof crs !== "number") {
      if (typeof crs === "string") {
        proj = decodeProj4(crs);
      } else {
        proj = decodeProj4(crs.p);
        x = crs.x;
        y = crs.y;
        z = crs.z || z;
      }
    } else if (crsKey !== USER_DEFINED) {
      errors.CRSNotSupported = crsKey;
    }
  }

  //---------------------//
  //   Read vertical CS  //
  //---------------------//

  const verticalCode = geoKeys.VerticalGeoKey || geoKeys.VerticalCSTypeGeoKey;

  if (verticalCode && verticalCode !== USER_DEFINED) {
    const verticalCs = CRS[verticalCode]; // Yes, that's CRS, not CS. Either vertical CRS or geographic 3D CRS may be set.

    if (typeof verticalCs === "number") {
      z = verticalCs;
    } else if ((verticalCs as CRSObj)?.z) {
      z = (verticalCs as Required<CRSObj>).z;
    } else {
      errors.verticalCsNotSupported = verticalCode;
    }
  } else if (geoKeys.VerticalUnitsGeoKey) {
    const units = Units[geoKeys.VerticalUnitsGeoKey];

    if (units) {
      z = units.m;
    } else {
      errors.verticalCsUnitsNotSupported = geoKeys.VerticalUnitsGeoKey;
    }

    if (geoKeys.VerticalDatumGeoKey) {
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

      if (!value) {
        continue;
      }

      let keyValue = key.o[value];

      if (typeof keyValue === "string") {
        keyValue = decodeProj4(keyValue);
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

    if (!unit) {
      continue;
    }

    if (unit === USER_DEFINED) {
      // Example: "GeogLinearUnitsGeoKey" -> "GeogLinearUnitSizeGeoKey"
      const sizeKeyName = (key.substring(0, key.length - 7) + "SizeGeoKey") as keyof GeoKeys & `${string}SizeGeoKey`;
      const size = geoKeys[sizeKeyName];

      if (size) {
        m = size;
      } else {
        errors[(sizeKeyName + "NotDefined") as keyof ConversionErrors & `${string}NotDefined`] = true;
      }

      unitsDescriptions[name] = sizeKeyName === "GeogAngularUnitSizeGeoKey" ? "degree" : "metre";
    } else if (Units[unit]) {
      const unitsObj = Units[unit];
      m = unitsObj.m;
      unitsDescriptions[name] = unitsObj.t;
    }

    if (m) {
      unitDefs[name] = true;

      if (key === "GeogAngularUnitsGeoKey") {
        m = radToDeg(m); // Radians are angular base units. Must convert to degrees.
        unitsDescriptions[key] = unitsDescriptions[key]?.replaceAll("radian", "degree") as CoordinateUnits;
      }
    } else {
      // This EPSG key doesn't exist. Assuming meters or degrees.
      m = 1;
      errors[(key + "NotSupported") as keyof GeokeysNotSupportedErrors] = unit;
    }

    units[name] = m;
  }

  //---------------------//
  //       Read axes     //
  //---------------------//

  const a =
    (geoKeys.EllipsoidSemiMajorAxisGeoKey || geoKeys.GeogSemiMajorAxisGeoKey || 0) * units.GeogLinearUnitsGeoKey;

  let b = (geoKeys.EllipsoidSemiMinorAxisGeoKey || geoKeys.GeogSemiMinorAxisGeoKey || 0) * units.GeogLinearUnitsGeoKey;

  const invFlattening = geoKeys.EllipsoidInvFlatteningGeoKey || geoKeys.GeogInvFlatteningGeoKey;

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
  const pm = geoKeys.PrimeMeridianLongitudeGeoKey || geoKeys.GeogPrimeMeridianLongGeoKey;

  if (pm) {
    proj += " +pm=" + pm * units.GeogAngularUnitsGeoKey;
  }

  // To WGS key
  if (geoKeys.GeogTOWGS84GeoKey) {
    proj += " +towgs84=" + geoKeys.GeogTOWGS84GeoKey.join();
  }

  //---------------------//
  //         PCS         //
  //---------------------//

  // This key (despite its name) defines a conversion -- a method (and its parameters) which converts coordinates.
  // The basic example of it is a projection.

  if (geoKeys.ProjectionGeoKey && geoKeys.ProjectionGeoKey !== USER_DEFINED) {
    const conversion = decodeProj4(ProjectionGeoKey[geoKeys.ProjectionGeoKey] || "");

    if (conversion) {
      proj += " +proj=" + conversion;
    } else {
      errors.conversionNotSupported = geoKeys.ProjectionGeoKey;
    }
  }

  for (const object of PCSKeys) {
    for (const key in object) {
      const keyDef = object[key];

      if (keyDef === undefined) {
        continue;
      }

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
      proj += ` +${keyDef.p}=${keyValue}`;
    }
  }

  // This key should take precedence over all other keys
  const transformKey = geoKeys.ProjMethodGeoKey || geoKeys.ProjCoordTransGeoKey;

  if (transformKey && transformKey !== USER_DEFINED) {
    const projName = ProjCoordTransGeoKey[transformKey];

    if (projName) {
      proj += " +proj=" + projName;
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
  transformProj4(projObj, geoKeys);
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

/**
 * Converts given coordinates to the coordinates accepted by Proj4.
 *
 * Accepts only CRS coordinates, not pixel coordinates!
 *
 * @param coord Source coordinate
 * @param parameters Conversion parameters
 * @return Converted coordinates
 */
export function convertCoordinates(
  coord: SourceCoordinate,
  parameters: CoordinateConversionParameters,
): ConvertedCoordinate {
  return {
    x: coord.x * parameters.x,
    y: coord.y * parameters.y,
    z: coord.z ? coord.z * parameters.z : 0,
  };
}
