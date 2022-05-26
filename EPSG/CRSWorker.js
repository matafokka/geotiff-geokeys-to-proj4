/* This script generates GCS from epsg.io. Can be used standalone or in a worker. */

/*
Some EPSG GCS are using 3D cartesian coordinate systems (see https://en.wikipedia.org/wiki/Geographic_coordinate_system#3D_Cartesian_coordinates and https://en.wikipedia.org/wiki/Geographic_coordinate_conversion#From_ECEF_to_geodetic_coordinates).

There's no way to map images (2D planes) to such systems, that's why we won't support such GCS.

I don't know, Why GeoTIFF lists these GCS as supported.

GeoTIFF also contains ModelTiepointTag which can be used to specify XYZ coordinates of a set of points. However:
	1. It's unclear whether Z represents height or distance from the Earth's center.
	2. "this third dimension is provided in anticipation of future support for 3D digital elevation models and vertical coordinate systems".
So, for now, there's no standard use for this tag.
*/

const epsgIndex = require("epsg-index/all.json");
const got = require("got");
const datums = require("./data/GeogGeodeticDatumGeoKey.js");
const EllipsoidalCS = require("./data/EllipsoidalCS.js");
const forEach = require("./forEachEntryInEPSG.js");

forEach(`
	SELECT crs.coord_ref_sys_code AS id,
	       crs.coord_ref_sys_kind AS type,
	       crs.datum_code         AS datum,
	       crs.cmpd_horizcrs_code AS basecrs,
	       coord_sys_code         AS cs
	FROM epsg.epsg_coordinatereferencesystem AS crs
	WHERE crs.coord_ref_sys_kind NOT LIKE 'vertical'
	ORDER BY crs.coord_ref_sys_kind DESC
`, async (result, fetchedCRS) => {

	// Due to sorting, compound CRS comes last
	if (result.type === "compound")
		return fetchedCRS[result.basecrs.toString()];

	// Check if CRS in epsg-index library
	let idStr = result.id.toString();
	if (idStr in epsgIndex && epsgIndex[idStr].proj4)
		return epsgIndex[idStr].proj4;

	// Try to fetch proj4 string from epsg.io
	if (result.type === "projected") {
		let response;
		try {
			response = (await got(`https://epsg.io/${idStr}.proj4`)).body; // Might respond with 520 error
		} catch (e) {
			return;
		}
		if (response.startsWith("+p"))
			return response;
		// All PCS has been processed by epsg-index or epsg.io
		// Any other PCS can't be represented as Proj4 string
		return;
	}

	// Only GCS left

	let str = "+proj=longlat ";
	let csObj = EllipsoidalCS[result.cs.toString()];
	if (!csObj)
		return;
	str += "+axis=" + csObj.axis + " ";

	if (result.datum) {
		let datumValue = datums[result.datum.toString()];
		if (datumValue)
			str += datumValue;
	}

	if (csObj.x || csObj.y)
		return {
			p: str,
			x: csObj.x,
			y: csObj.y,
		}

	return str;

}, "CRS", `/**
* Maps EPSG CRS to their proj4 definitions. Should be a base for Proj4 string.
* Corresponding geokeys are GeographicTypeGeoKey and ProjectedCSTypeGeoKey.
* @type {Object}
*/`);