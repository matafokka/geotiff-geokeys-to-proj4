// This file was generated by "jsdoc -t node_modules/@otris/jsdoc-tsd ." command and edited manually to fix errors. Don't regenerate this file, unless there're API changes.

/**
 * This library converts geokeys to Proj4 string and contains following functions:
 *
 * 1. {@link module:geokeysToProj4.toProj4} Does actual conversion
 * 1. {@link module:geokeysToProj4.convertCoordinates} Converts coordinates to use with proj4
 *
 * In general, you want to:
 * 1. Read geokeys.
 * 1. Pass them to `geokeysToProj4.toProj4()` (let's call returned object `projObj`).
 * 1. Pass `projObj.proj4` (which is Proj4 string) to proj4js.
 * 1. Convert pixel coordinates to CRS coordinates (let's call them `crsX` and `crsY`).
 * 1. Convert CRS coordinates to usable units *(in most cases, meters, but GeoTIFF allows speed, angular speed, and scale)*: `geokeysToProj4(crsX, crsY, projObj.coordinatesConversionParameters)`.
 * 1. The returned object contains X, Y, Z coordinates. which are ready to be projected with proj4js. So project them. Of course, you can alter this workflow to use this library with any other (presumably, server-side) software.
 */
declare module "geokeysToProj4";

/**
 * Geokeys. If you're working with `geotiff` library, this is result of `image.getGeoKeys()`.
 */
export interface GeoKeys {
	/**
	 * See GeoTIFF docs for more information
	 */
	GeographicTypeGeoKey: number;
	/**
	 * See GeoTIFF docs for more information
	 */
	GeogGeodeticDatumGeoKey: number;
	/**
	 * See GeoTIFF docs for more information
	 */
	GeogPrimeMeridianGeoKey: number;
	/**
	 * See GeoTIFF docs for more information
	 */
	GeogLinearUnitsGeoKey: number;
	/**
	 * See GeoTIFF docs for more information
	 */
	GeogLinearUnitSizeGeoKey: number;
	/**
	 * See GeoTIFF docs for more information
	 */
	GeogAngularUnitsGeoKey: number;
	/**
	 * See GeoTIFF docs for more information
	 */
	GeogAngularUnitSizeGeoKey: number;
	/**
	 * See GeoTIFF docs for more information
	 */
	GeogEllipsoidGeoKey: number;
	/**
	 * See GeoTIFF docs for more information
	 */
	GeogSemiMajorAxisGeoKey: number;
	/**
	 * See GeoTIFF docs for more information
	 */
	GeogSemiMinorAxisGeoKey: number;
	/**
	 * See GeoTIFF docs for more information
	 */
	GeogInvFlatteningGeoKey: number;
	/**
	 * See GeoTIFF docs for more information
	 */
	GeogPrimeMeridianLongGeoKey: number;
	/**
	 * See GeoTIFF docs for more information
	 */
	ProjectedCSTypeGeoKey: number;
	/**
	 * See GeoTIFF docs for more information
	 */
	ProjectionGeoKey: number;
	/**
	 * See GeoTIFF docs for more information
	 */
	ProjCoordTransGeoKey: number;
	/**
	 * See GeoTIFF docs for more information
	 */
	ProjLinearUnitsGeoKey: number;
	/**
	 * See GeoTIFF docs for more information
	 */
	ProjLinearUnitSizeGeoKey: number;
	/**
	 * See GeoTIFF docs for more information
	 */
	ProjStdParallel1GeoKey: number;
	/**
	 * See GeoTIFF docs for more information
	 */
	ProjStdParallel2GeoKey: number;
	/**
	 * See GeoTIFF docs for more information
	 */
	ProjNatOriginLongGeoKey: number;
	/**
	 * See GeoTIFF docs for more information
	 */
	ProjNatOriginLatGeoKey: number;
	/**
	 * See GeoTIFF docs for more information
	 */
	ProjFalseEastingGeoKey: number;
	/**
	 * See GeoTIFF docs for more information
	 */
	ProjFalseNorthingGeoKey: number;
	/**
	 * See GeoTIFF docs for more information
	 */
	ProjFalseOriginLongGeoKey: number;
	/**
	 * See GeoTIFF docs for more information
	 */
	ProjFalseOriginLatGeoKey: number;
	/**
	 * See GeoTIFF docs for more information
	 */
	ProjFalseOriginEastingGeoKey: number;
	/**
	 * See GeoTIFF docs for more information
	 */
	ProjFalseOriginNorthingGeoKey: number;
	/**
	 * See GeoTIFF docs for more information
	 */
	ProjCenterLongGeoKey: number;
	/**
	 * See GeoTIFF docs for more information
	 */
	ProjCenterLatGeoKey: number;
	/**
	 * See GeoTIFF docs for more information
	 */
	ProjCenterEastingGeoKey: number;
	/**
	 * See GeoTIFF docs for more information
	 */
	ProjCenterNorthingGeoKey: number;
	/**
	 * See GeoTIFF docs for more information
	 */
	ProjScaleAtNatOriginGeoKey: number;
	/**
	 * See GeoTIFF docs for more information
	 */
	ProjScaleAtCenterGeoKey: number;
	/**
	 * See GeoTIFF docs for more information
	 */
	ProjAzimuthAngleGeoKey: number;
	/**
	 * See GeoTIFF docs for more information
	 */
	ProjStraightVertPoleLongGeoKey: number;
    /**
     * See GeoTIFF docs for more information
     */
    VerticalGeoKey: number;
    /**
     * See GeoTIFF docs for more information
     */
    VerticalUnitsGeoKey: number;
	/**
	 * Datum to WGS transformation parameters, unofficial key
	 */
	GeogTOWGS84GeoKey: number[];
}

/**
 * Errors that have occurred during conversion.
 *
 * Apart from listed properties, there's properties that named after geokeys with `NotSupported` suffix, i.e. `ProjFalseOriginLongGeoKeyNotSupported`. Values are EPSG codes assigned to those keys. These errors mean that the specified EPSG code is either not supported by this library, or it's new and hasn't been added yet. If it's the latter, please, create an issue at https://github.com/matafokka/geotiff-geokeys-to-proj4
 *
 * If an error has not occurred, it won't be present in this object.
 *
 * How to process these errors:
 *
 * 1. If it's your program's user's GeoTIFF, show an error message.
 * 1. If it's your GeoTIFF, fix it in a GIS.
 * 1. If you're sure that file is fine or want to discuss it, please, create an issue at https://github.com/matafokka/geotiff-geokeys-to-proj4
 */
export interface ConversionErrors {
	/**
	 * `true` when both `GeographicTypeGeoKey` and `ProjectedCSTypeGeoKey` geokeys are set. In this case, `GeographicTypeGeoKey` is used. The cause of this error is broken geokeys.
	 */
	bothGCSAndPCSAreSet: boolean;
	/**
	 * Specified CRS can't be represented as Proj4 string or it's new and hasn't been added to this library. Value is EPSG code of specified CRS.
	 */
	CRSNotSupported: number;
	/**
	 * Geokey `GeogLinearUnitsGeoKey` is set to user-defined, but user hasn't specified `GeogLinearUnitSizeGeoKey`. In this case, every other key using this one assumed to be using meters. The cause of this error is broken geokeys.
	 */
	GeogLinearUnitSizeGeoKeyNotDefined: number;
	/**
	 * Geokey `GeogAngularUnitsGeoKey` is set to user-defined, but user hasn't specified `GeogAngularUnitSizeGeoKey`. In this case, every other key using this one assumed to be using degrees. The cause of this error is broken geokeys.
	 */
	GeogAngularUnitSizeGeoKeyNotDefined: number;
	/**
	 * Geokey `ProjLinearUnitsGeoKey` is set to user-defined, but user hasn't specified `ProjLinearUnitSizeGeoKey`. In this case, every other key using this one assumed to be using meters. The cause of this error is broken geokeys.
	 */
	ProjLinearUnitSizeGeoKeyNotDefined: number;
	/**
	 * Conversion specified in `ProjectionGeoKey` is not supported by this library. Value is EPSG conversion code.
	 */
	conversionNotSupported: number;
	/**
	 * Transformation specified in `ProjCoordTransGeoKey` is not supported by this library. Value is projection code. See http://geotiff.maptools.org/spec/geotiff6.html#6.3.3.3 for more information.
	 */
	coordinateTransformationNotSupported: number;
    /**
     * Vertical CS specified in `VerticalCSTypeGeoKey` is not supported by this library. Value is EPSG CS code.
     */
    verticalCsNotSupported: number;
    /**
     * Vertical CS specified in `VerticalUnitsGeoKey` is not supported by this library. Value is EPSG uom code.
     */
    verticalCsUnitsNotSupported: number;
    /**
     * Vertical datums are not supported by this library. If vertical CRS is user-defined, and `VerticalDatumGeoKey` is set, this error will be reported. Value is EPSG datum code.
     */
    verticalDatumsNotSupported: number;
}

/**
 * Returned projection parameters
 */
export interface ProjectionParameters {
	/**
	 * Proj4 string
	 */
	proj4: string;
	/**
	 * If true, coordinates should be converted by using {@link module:geokeysToProj4.convertCoordinates} before passing to proj4js
	 */
	shouldConvertCoordinates: boolean;
	/**
	 * Parameters to pass to {@link module:geokeysToProj4.convertCoordinates}
	 */
	coordinatesConversionParameters: CoordinateConversionParameters;
	/**
	 * Multiply X coordinate by this parameter to convert it to standard unit
	 */
	"coordinatesConversionParameters.x": number;
	/**
	 * Multiply Y coordinate by this parameter to convert it to standard unit
	 */
	"coordinatesConversionParameters.y": number;
	/**
	 * Coordinates units after conversion. EPSG defines speed, angular speed and scale as linear units, and GeoTIFF relies on EPSG. So there's a chance that coordinates will represent something's different from distance (in case of PCS). Note: GCS will always use degrees; if PCS uses angles, radians will be used.
	 */
	coordinatesUnits: "metre" | "metre per second" | "second" | "radian" | "radian per second" | "scale" | "scale per second" | "degree";
	/**
	 * If `true`, geographic (either 2D or 3D) CRS is used.
	 */
	isGCS: boolean;
	/**
	 * Errors that have occurred while processing geokeys. If no error has occurred, there will be an empty object.
	 */
	errors: ConversionErrors;
}

/**
 * Represents a point. X and Y coordinates are not necessarily cartesian coordinates (might be lon/lat, depends on CRS) and not in this order (if axes has been swapped by GeoTIFF).
 */
export interface Point {
	/**
	 * X coordinate (coordinate of a first axis of CRS) of a point
	 */
	x: number;
	/**
	 * Y coordinate (coordinate of a second axis of CRS) of a point
	 */
	y: number;
    /**
     * Z coordinate (coordinate of a third axis of CRS) of a point, i.e. transformed pixel value. Always points up.
     */
    z: number;
}

/**
 * Parameters to pass to {@link module:geokeysToProj4.convertCoordinates} or to convert coordinates manually
 */
export interface CoordinateConversionParameters {

	/**
	 * Multiply X coordinate by this parameter to convert it to standard units (meters or degrees)
	 */
	x: number,

	/**
	 * Multiply Y coordinate by this parameter to convert it to standard units (meters or degrees)
	 */
	y: number,

	/**
	 * Multiply Z coordinate (pixel value) by this parameter to convert it to standard units (meters)
	 */
	z: number,
}

/**
 * Converts GeoTIFFs geokeys to Proj4 string
 *
 * @param geoKeys {GeoKeys} Object where keys are geokeys (named exactly as in GeoTIFF specification) and values are, well, their values.
 */
export function toProj4(geoKeys: GeoKeys): ProjectionParameters;

/**
 * Converts given coordinates to standard ones (i.e. meters or degrees).
 *
 * Basically, a short way to multiply `x, y, z` by `parameters.x`, `parameters.y` and `parameters.z` respectively.
 *
 * It does NOT accept image coordinates! Convert image coordinates to projection coordinates first (by multiplying image coordinates by `image.getResolution()` and adding coordinates of a top left corner) and then pass converted coordinates to this function.
 *
 * @param x {number} X coordinate
 * @param y {number} Y coordinate
 * @param z {number} Pixel value, i.e. Z coordinate
 * @param parameters {Object} getProjectionParameters().coordinatesConversionParameters
 * @return {module:geokeysToProj4.Point} Converted coordinates
 */
export function convertCoordinates(x: number, y: number, z: number, parameters: Object): Point;