// Polyfills
require("core-js/stable/object/keys");
require("core-js/stable/string/trim");

const CRS = require("./EPSG/data/CRS.js");
const Units = require("./EPSG/data/Units.js");
const ProjCoordTransGeoKey = require("./EPSG/data/ProjCoordTransGeoKey.js");
const ProjectionGeoKey = require("./EPSG/data/ProjectionGeoKey.js");
const PCSKeys = require("./EPSG/data/PCSKeys.js");
const override = require("./EPSG/data/Overrides.js");

const geographicKeysToCopy = {
	GeogGeodeticDatumGeoKey: require("./EPSG/data/GeogGeodeticDatumGeoKey.js"),
	GeogPrimeMeridianGeoKey: require("./EPSG/data/GeogPrimeMeridianGeoKey.js"),
	GeogEllipsoidGeoKey: require("./EPSG/data/GeogEllipsoidGeoKey.js"),
}

/**
 * Represents user-defined value
 * @type {number}
 * @private
 */
const userDefined = 32767;

/**
 * Order in which tokens should be written to final string to make it look nice
 * @type {string[]}
 * @private
 */
const tokensOrder = ["+proj", "+lat_0", "+lon_0", "+lat_1", "+lat_ts", "+lon_1", "+lat_2", "+lon_2", "+k_0", "+x_0", "+y_0", "+ellps", "+a", "+b", "+pm", "+towgs84", "+approx"];

/**
 * Parses given argument as float and returns its fixed value
 * @param n {*} Number to fix
 * @returns {number|*} Fixed number or original value if it can't be parsed as float
 */
const toFixed = (n) => {
	if (isNaN(n))
		return n;
	return parseFloat(parseFloat(n).toFixed(12));
}

/**
 * Geokeys. If you're working with `geotiff` library, this is result of `image.getGeoKeys()`.
 * @typedef {Object} module:geokeysToProj4.GeoKeys
 * @property {number} GeographicTypeGeoKey See GeoTIFF docs for more information
 * @property {number} GeogGeodeticDatumGeoKey See GeoTIFF docs for more information
 * @property {number} GeogPrimeMeridianGeoKey See GeoTIFF docs for more information
 * @property {number} GeogLinearUnitsGeoKey See GeoTIFF docs for more information
 * @property {number} GeogLinearUnitSizeGeoKey See GeoTIFF docs for more information
 * @property {number} GeogAngularUnitsGeoKey See GeoTIFF docs for more information
 * @property {number} GeogAngularUnitSizeGeoKey See GeoTIFF docs for more information
 * @property {number} GeogEllipsoidGeoKey See GeoTIFF docs for more information
 * @property {number} GeogSemiMajorAxisGeoKey See GeoTIFF docs for more information
 * @property {number} GeogSemiMinorAxisGeoKey See GeoTIFF docs for more information
 * @property {number} GeogInvFlatteningGeoKey See GeoTIFF docs for more information
 * @property {number} GeogPrimeMeridianLongGeoKey See GeoTIFF docs for more information
 * @property {number} ProjectedCSTypeGeoKey See GeoTIFF docs for more information
 * @property {number} ProjectionGeoKey See GeoTIFF docs for more information
 * @property {number} ProjCoordTransGeoKey See GeoTIFF docs for more information
 * @property {number} ProjLinearUnitsGeoKey See GeoTIFF docs for more information
 * @property {number} ProjLinearUnitSizeGeoKey See GeoTIFF docs for more information
 * @property {number} ProjStdParallel1GeoKey See GeoTIFF docs for more information
 * @property {number} ProjStdParallel2GeoKey See GeoTIFF docs for more information
 * @property {number} ProjNatOriginLongGeoKey See GeoTIFF docs for more information
 * @property {number} ProjNatOriginLatGeoKey See GeoTIFF docs for more information
 * @property {number} ProjFalseEastingGeoKey See GeoTIFF docs for more information
 * @property {number} ProjFalseNorthingGeoKey See GeoTIFF docs for more information
 * @property {number} ProjFalseOriginLongGeoKey See GeoTIFF docs for more information
 * @property {number} ProjFalseOriginLatGeoKey See GeoTIFF docs for more information
 * @property {number} ProjFalseOriginEastingGeoKey See GeoTIFF docs for more information
 * @property {number} ProjFalseOriginNorthingGeoKey See GeoTIFF docs for more information
 * @property {number} ProjCenterLongGeoKey See GeoTIFF docs for more information
 * @property {number} ProjCenterLatGeoKey See GeoTIFF docs for more information
 * @property {number} ProjCenterEastingGeoKey See GeoTIFF docs for more information
 * @property {number} ProjCenterNorthingGeoKey See GeoTIFF docs for more information
 * @property {number} ProjScaleAtNatOriginGeoKey See GeoTIFF docs for more information
 * @property {number} ProjScaleAtCenterGeoKey See GeoTIFF docs for more information
 * @property {number} ProjAzimuthAngleGeoKey See GeoTIFF docs for more information
 * @property {number} ProjStraightVertPoleLongGeoKey See GeoTIFF docs for more information
 * @property {number[]} GeogTOWGS84GeoKey Datum to WGS transformation parameters, unofficial key
 */

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
 *
 * @typedef {Object} module:geokeysToProj4.ConversionErrors
 * @property {boolean} bothGCSAndPCSAreSet `true` When both `GeographicTypeGeoKey` and `ProjectedCSTypeGeoKey` geokeys are set. In this case, `GeographicTypeGeoKey` is used. The cause of this error is broken geokeys.
 * @property {number} CRSNotSupported Specified CRS can't be represented as Proj4 string or it's new and hasn't been added to this library. Value is EPSG code of specified CRS.
 * @property {number} GeogLinearUnitSizeGeoKeyNotDefined Geokey `GeogLinearUnitsGeoKey` is set to user-defined, but user hasn't specified `GeogLinearUnitSizeGeoKey`. In this case, every other key using this one assumed to be using meters. The cause of this error is broken geokeys.
 * @property {number} GeogAngularUnitSizeGeoKeyNotDefined Geokey `GeogAngularUnitsGeoKey` is set to user-defined, but user hasn't specified `GeogAngularUnitSizeGeoKey`. In this case, every other key using this one assumed to be using degrees. The cause of this error is broken geokeys.
 * @property {number} ProjLinearUnitSizeGeoKeyNotDefined Geokey `ProjLinearUnitsGeoKey` is set to user-defined, but user hasn't specified `ProjLinearUnitSizeGeoKey`. In this case, every other key using this one assumed to be using meters. The cause of this error is broken geokeys.
 * @property {number} conversionNotSupported Conversion specified in `ProjectionGeoKey` is not supported by this library. Value is EPSG conversion code.
 * @property {number} coordinateTransformationNotSupported Transformation specified in `ProjCoordTransGeoKey` is not supported by this library. Value is projection code. See http://geotiff.maptools.org/spec/geotiff6.html#6.3.3.3 for more information.
 */

/**
 * Parameters to pass to {@link module:geokeysToProj4.convertCoordinates} or to convert coordinates manually
 * @typedef {Object} CoordinateConversionParameters
 * @property {number} x Multiply X coordinate by this parameter to convert it to standard unit
 * @property {number} y Multiply Y coordinate by this parameter to convert it to standard unit
 */

/**
 * Returned projection parameters
 * @typedef {Object} module:geokeysToProj4.ProjectionParameters
 * @property {string} proj4 Proj4 string
 * @property {boolean} shouldConvertCoordinates If true, coordinates should be converted by using {@link module:geokeysToProj4.convertCoordinates} before passing to proj4js
 * @property {CoordinateConversionParameters} coordinatesConversionParameters Parameters to pass to {@link module:geokeysToProj4.convertCoordinates}
 * @property {"metre"|"metre per second"|"second"|"radian"|"radian per second"|"scale"|"scale per second"|"degree"} coordinatesUnits Coordinates units after conversion. EPSG defines speed, angular speed and scale as linear units, and GeoTIFF relies on EPSG. So there's a chance that coordinates will represent something's different from distance (in case of PCS). Note: GCS will always use degrees; if PCS uses angles, radians will be used.
 * @property {boolean} isGCS If set to true, GCS is used. Otherwise, PCS is used.
 * @property {module:geokeysToProj4.ConversionErrors} errors Errors that have occurred while processing geokeys. If no error has occurred, there will be an empty object.
 */

/**
 * Represents a point. X and Y coordinates are not necessarily cartesian coordinates (might be lon/lat, depends on CRS) and not in this order (if axes has been swapped by GeoTIFF).
 * @typedef {Object} module:geokeysToProj4.Point
 * @property {number} x X coordinate (coordinate of a first axis of CRS) of a point
 * @property {number} y Y coordinate (coordinate of a second axis of CRS) of a point
 */

/**
 * This library converts geokeys to Proj4 string and contains following functions:
 * 1. {@link module:geokeysToProj4.toProj4} Does actual conversion
 * 1. {@link module:geokeysToProj4.convertCoordinates} Converts coordinates to use with proj4
 *
 * In general, you want to:
 * 1. Read geokeys.
 * 1. Pass them to `geokeysToProj4.toProj4()` (let's call returned object `projObj`).
 * 1. Pass `projObj.proj4` (which is Proj4 string) to proj4js.
 * 1. Convert pixel coordinates to CRS coordinates (let's call them `crsX` and `crsY`).
 * 1. Convert CRS coordinates to usable units *(in most cases, meters, but GeoTIFF allows speed, angular speed, and scale)*: `geokeysToProj4(crsX, crsY, projObj.coordinatesConversionParameters)`.
 * 1. The returned object will contain x and y coordinates which are ready to be projected with proj4js. So project them.
 *
 * Of course, you can alter this workflow to use this library with any other (presumably, server-side) software.
 *
 * @module geokeysToProj4
 */
module.exports = {
	/**
	 * Converts GeoTIFFs geokeys to Proj4 string
	 * @param geoKeys {GeoKeys} Object where keys are geokeys (named exactly as in GeoTIFF specification) and values are, well, their values.
	 * @return {module:geokeysToProj4.ProjectionParameters} Projection parameters
	 */
	toProj4: function (geoKeys) {
		let proj = "", x = 1, y = 1, errors = {};

		// First, get CRS, both geographic and projected
		if (geoKeys.GeographicTypeGeoKey && geoKeys.ProjectedCSTypeGeoKey)
			errors.bothGCSAndPCSAreSet = true;

		let crsKey = geoKeys.GeographicTypeGeoKey || geoKeys.ProjectedCSTypeGeoKey;
		if (crsKey) {
			let crs = CRS[crsKey.toString()];
			if (crs) {
				if (typeof crs === "string")
					proj = crs;
				else {
					proj = crs.p;
					x = crs.x;
					y = crs.y;
				}
			} else if (crsKey !== userDefined)
				errors.CRSNotSupported = crsKey;
		}

		if (proj === "")
			proj = "+proj=longlat"; // If GeoTIFF uses PCS, string rebuilding will override +proj

		/////////////////////////
		//         GCS         //
		/////////////////////////

		for (let name in geographicKeysToCopy) {
			let value = geoKeys[name];
			if (value) {
				let keyValue = geographicKeysToCopy[name][value.toString()];
				if (keyValue !== undefined)
					proj += " " + keyValue;
			}
		}

		// All other geokeys will override ones provided by keys above

		// Read GCS units
		let units = {
			GeogLinearUnitsGeoKey: 1,
			GeogAngularUnitsGeoKey: 1,
			ProjLinearUnitsGeoKey: 1,
		}

		let unitDefs = {}; // Values are booleans, true means that GeoTIFF redefines units

		for (let name in units) {
			let m, key = geoKeys[name];

			if (!key)
				continue;

			if (key === userDefined) {
				let splitAt = name.length - 7, // I.e., "GeogLinearUnitsGeoKey" will be split to "GeogLinearUnit" and "sGeoKey"
					sizeKeyName = name.substr(0, splitAt) + "SizeGeoKey",
					size = geoKeys[sizeKeyName];
				if (size)
					m = size;
				else
					errors[sizeKeyName + "NotDefined"] = true;
			} else if (key)
				m = Units[key.toString()]?.m;

			if (!m) {
				m = 1;
				errors[name + "NotSupported"] = key; // This EPSG key doesn't exist, assuming meters or degrees
			} else {
				unitDefs[name] = true;
				if (name === "GeogAngularUnitsGeoKey")
					m *= 180 / Math.PI; // Radians are angular base units
			}
			units[name] = m;
		}

		// Get axes
		let axes = {
			GeogSemiMajorAxisGeoKey: null,
			GeogSemiMinorAxisGeoKey: null,
		}

		for (let axis in axes) {
			let key = geoKeys[axis];
			if (key)
				axes[axis] = key * units.GeogLinearUnitsGeoKey;
		}

		if (geoKeys.GeogInvFlatteningGeoKey && axes.GeogSemiMajorAxisGeoKey) // Can't calculate semi minor axis if semi major axis is missing
			axes.GeogSemiMinorAxisGeoKey = axes.GeogSemiMajorAxisGeoKey - axes.GeogSemiMajorAxisGeoKey / geoKeys.GeogInvFlatteningGeoKey;

		if (axes.GeogSemiMajorAxisGeoKey)
			proj += " +a=" + axes.GeogSemiMajorAxisGeoKey;

		let b;
		if (axes.GeogSemiMinorAxisGeoKey)
			b = axes.GeogSemiMinorAxisGeoKey;
		else if (proj.indexOf("+b") === -1)
			b = axes.GeogSemiMajorAxisGeoKey;

		if (b)
			proj += " +b=" + b;

		// Get prime meridian
		let pm = geoKeys.GeogPrimeMeridianLongGeoKey;
		if (pm)
			proj += " +pm=" + (pm * units.GeogAngularUnitsGeoKey);

		// To WGS key
		if (geoKeys.GeogTOWGS84GeoKey)
			proj += " +towgs84=" + geoKeys.GeogTOWGS84GeoKey.join();

		/////////////////////////
		//         PCS         //
		/////////////////////////

		// We've already got CRS, let's jump straight to the other keys

		// This key despite its name defines conversion -- a method (and its parameters) which converts coordinates. The basic example of it is a projection.
		if (geoKeys.ProjectionGeoKey && geoKeys.ProjectionGeoKey !== userDefined) {
			let conversion = ProjectionGeoKey[geoKeys.ProjectionGeoKey.toString()];
			if (conversion)
				proj += " +proj=" + conversion;
			else
				errors.conversionNotSupported = geoKeys.ProjectionGeoKey;
		}

		let objects = ["o1", "o2", "o3"];
		for (let name of objects) {
			let object = PCSKeys[name];
			for (let key in object) {
				if (!object.hasOwnProperty(key))
					continue;

				let keyValue = geoKeys[key];
				if (keyValue === undefined)
					continue;

				// Get key definition and units
				let keyDef = object[key], m;
				if (keyDef.u === 1)
					m = units.GeogAngularUnitsGeoKey;
				else if (keyDef.u === 2)
					m = units.ProjLinearUnitsGeoKey;
				else
					m = 1;

				keyValue *= m;
				proj += ` +${keyDef.p}=${keyValue}`;
			}
		}

		// This key should take precedence over all other keys
		if (geoKeys.ProjCoordTransGeoKey && geoKeys.ProjCoordTransGeoKey !== userDefined) {
			let projName = ProjCoordTransGeoKey[geoKeys.ProjCoordTransGeoKey.toString()];
			if (projName)
				proj += " +proj=" + projName;
			else
				errors.coordinateTransformationNotSupported = geoKeys.ProjCoordTransGeoKey;
		}

		// Gosh, everybody seems to suggest to add +no_defs to avoid errors caused by default values. Let's follow this suggestion.
		proj += " +no_defs";

		/////////////////////////
		//  String processing  //
		/////////////////////////

		// Tokenize string

		let keyValues = proj.split(" ");
		let tokens = {};
		for (let kv of keyValues) {
			let kvArr = kv.trim().split("=");
			if (kvArr.length === 1)
				tokens[kvArr[0]] = null;
			else
				tokens[kvArr[0].trim()] = kvArr[1].trim();
		}

		override(tokens); // Apply all necessary overrides

		// Build final string

		proj = "";
		let tokenArrays = [tokensOrder, Object.keys(tokens)];
		let processedTokens = {};

		for (let arr of tokenArrays) {
			for (let token of arr) {
				if (!(token in tokens) || processedTokens[token])
					continue;

				proj += token;
				let tokenValue = tokens[token];
				if (tokenValue !== null)
					proj += "=" + toFixed(tokenValue);

				proj += " ";
				processedTokens[token] = true;
			}
		}

		// Find out which units to use

		let isGCS = (tokens["+proj"] === "longlat"), coordUnits;
		if (isGCS) {
			coordUnits = "degree";
			if (unitDefs.GeogAngularUnitsGeoKey) {
				x = units.GeogAngularUnitsGeoKey;
				y = units.GeogAngularUnitsGeoKey;
			}
		} else {
			coordUnits = "metre";
			if (unitDefs.ProjLinearUnitsGeoKey) {
				let m;
				if (typeof units.ProjLinearUnitsGeoKey === "number")
					m = units.ProjLinearUnitsGeoKey;
				else {
					m = units.ProjLinearUnitsGeoKey.m;
					coordUnits = units.ProjLinearUnitsGeoKey.t;
				}
				x = m;
				y = m;
			}
		}

		x = toFixed(x);
		y = toFixed(y);

		return {
			proj4: proj,
			coordinatesConversionParameters: {
				x: x,
				y: y,
			},
			shouldConvertCoordinates: (x !== 1 || y !== 1),
			coordinatesUnits: coordUnits,
			isGCS: isGCS,
			errors: errors,
		}

	},

	/**
	 * Converts given coordinates to standard ones (i.e. meters or degrees).
	 *
	 * Basically, a short way to multiply x and y by `parameters.x` and `parameters.y` respectively.
	 *
	 * It does NOT accept image coordinates! Convert image coordinates to projection coordinates first (by multiplying image coordinates by `image.getResolution()` and adding coordinates of a top left corner) and then pass converted coordinates to this function.
	 *
	 * @param x {number} X coordinate
	 * @param y {number} Y coordinate
	 * @param parameters {Object} getProjectionParameters().coordinatesConversionParameters
	 * @return {module:geokeysToProj4.Point} Converted coordinates
	 */
	convertCoordinates: function (x, y, parameters) {
		return {
			x: x * parameters.x,
			y: y * parameters.y,
		}
	}
}
