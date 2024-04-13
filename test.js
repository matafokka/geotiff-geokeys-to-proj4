/*
About comparing keys.

For now, it's unclear to me how keys should be overridden, so library's results are different from, let's say, QGIS's. If someone will provide list in which geokeys should take precedence, I'll change main script and might implement key-to-key comparison.

There's also a couple of problems which will render such tests misleading.

1. Some keys (for example, +a and +b for ellipsoids if they match ellipsoid's defaults) might be redundant, but this library will specify them anyway. QGIS will drop those.

2. This library provides multipliers that converts units to base ones. It doesn't add +units definition. So, for example, instead of specifying +units=km, user will multiply coordinates either by hand or by using convertCoordinates().

3. There might be floating point errors when dealing with really small units.
*/

const toProj = require("./main-dist.js"); // Can be replaced with main.js, testing main-dist.js to test if final build works fine

/**
 * Geokeys from images from https://download.osgeo.org/geotiff/samples/
 * Proj4 strings has been taken from QGIS
 * @type {Object[]}
 */
let testKeys = [
	{
		name: "cea.tif",
		GTCitationGeoKey: "unnamed",
		GTModelTypeGeoKey: 1,
		GTRasterTypeGeoKey: 1,
		GeogAngularUnitsGeoKey: 9102,
		GeogCitationGeoKey: "NAD27",
		GeographicTypeGeoKey: 4267,
		ProjCoordTransGeoKey: 28,
		ProjFalseEastingGeoKey: 0,
		ProjFalseNorthingGeoKey: 0,
		ProjLinearUnitsGeoKey: 9001,
		ProjNatOriginLongGeoKey: -117.333333333333,
		ProjStdParallel1GeoKey: 33.75,
		ProjectedCSTypeGeoKey: 32767,
		ProjectionGeoKey: 32767,
		proj4: "+proj=cea +lon_0=-117.333333333333 +lat_ts=33.75 +x_0=0 +y_0=0 +datum=NAD27 +units=m +no_defs",
	},

	{
		name: "bogota.tif",
		GTModelTypeGeoKey: 1,
		GTRasterTypeGeoKey: 1,
		ProjectedCSTypeGeoKey: 21892,
		proj4: "+proj=tmerc +lat_0=4.599047222222222 +lon_0=-74.08091666666667 +k=1 +x_0=1000000 +y_0=1000000 +ellps=intl +towgs84=307,304,-318,0,0,0,0 +units=m +no_defs",
	},

	{
		name: "GeogToWGS84GeoKey5.tif",
		GTModelTypeGeoKey: 2,
		GTRasterTypeGeoKey: 1,
		GeogAngularUnitsGeoKey: 9102,
		GeogEllipsoidGeoKey: 7004,
		GeogGeodeticDatumGeoKey: 32767,
		GeogTOWGS84GeoKey: [598.1, 73.7, 418.2, 0.202, 0.045, -2.455, 6.7],
		GeographicTypeGeoKey: 32767,
		proj4: "+proj=longlat +ellps=bessel +towgs84=598.1,73.7,418.2,0.202,0.045,-2.455,6.7 +no_defs",
	},

	{
		name: "ntf_nord.tif",
		GTModelTypeGeoKey: 1,
		GTRasterTypeGeoKey: 1,
		ProjectedCSTypeGeoKey: 27591,
		proj4: "+proj=lcc +lat_1=49.50000000000001 +lat_0=49.50000000000001 +lon_0=0 +k_0=0.999877341 +x_0=600000 +y_0=200000 +a=6378249.2 +b=6356515 +towgs84=-168,-60,320,0,0,0,0 +pm=paris +units=m +no_defs",
	},

	{
		name: "srtm_44_01_tiff.tif",
		GTModelTypeGeoKey: 2,
		GTRasterTypeGeoKey: 1,
		GeogAngularUnitsGeoKey: 9102,
		GeogCitationGeoKey: "GCS Name = Comm. des Poids et Mesures 1799|Datum = unknown|Ellipsoid = CPM|Primem = Greenwich|",
		GeogEllipsoidGeoKey: 32767,
		GeogGeodeticDatumGeoKey: 32767,
		GeogInvFlatteningGeoKey: 334.29,
		GeogPrimeMeridianLongGeoKey: 0,
		GeogSemiMajorAxisGeoKey: 6375738.7,
		GeographicTypeGeoKey: 32767,
		proj4: "+proj=longlat +a=6375738.7 +b=6356666.221912113 +no_defs",
	},

	{
		name: "usa.tif",
		GTModelTypeGeoKey: 1,
		GTRasterTypeGeoKey: 1,
		PCSCitationGeoKey: "UTM Zone 17 N with WGS84",
		ProjectedCSTypeGeoKey: 32617,
		proj4: "+proj=utm +zone=17 +datum=WGS84 +units=m +no_defs",
	},

	{
		name: "From #2",
		GTModelTypeGeoKey: 1,
		GTRasterTypeGeoKey: 1,
		GeogEllipsoidGeoKey: 7030,
		GeogGeodeticDatumGeoKey: 6326,
		PCSCitationGeoKey: "Transverse Mercator; WGS84; WGS84",
		ProjCoordTransGeoKey: 1,
		ProjFalseEastingGeoKey: 500000,
		ProjFalseNorthingGeoKey: -5300000,
		ProjLinearUnitsGeoKey: 9001,
		ProjNatOriginLatGeoKey: 0,
		ProjNatOriginLongGeoKey: 19,
		ProjScaleAtNatOriginGeoKey: 0.9993,
		ProjectedCSTypeGeoKey: 32767,
		ProjectionGeoKey: 32767,
		proj4: "+proj=tmerc +lat_0=0 +lon_0=19 +k=0.9993 +x_0=500000 +y_0=-5300000 +datum=WGS84 +units=m +no_defs",
	},

	{
		name: "From #3",
		GTCitationGeoKey: "UTM Zone 32, Northern Hemisphere",
		GTModelTypeGeoKey: 1,
		GTRasterTypeGeoKey: 1,
		GeogAngularUnitsGeoKey: 9102,
		GeogCitationGeoKey: "GCS Name = GRS 1980(IUGG, 1980)|Datum = unknown|Ellipsoid = GRS80|Primem = Greenwich|",
		GeogEllipsoidGeoKey: 32767,
		GeogGeodeticDatumGeoKey: 32767,
		GeogInvFlatteningGeoKey: 298.257222101,
		GeogPrimeMeridianLongGeoKey: 0,
		GeogSemiMajorAxisGeoKey: 6378137,
		GeogTOWGS84GeoKey: [ 0, 0, 0 ],
		GeographicTypeGeoKey: 32767,
		ProjLinearUnitsGeoKey: 9001,
		ProjectedCSTypeGeoKey: 32767,
		ProjectionGeoKey: 16032,
		proj4: "+proj=tmerc +lat_0=0 +lon_0=9 +k_0=0.9996 +x_0=500000 +y_0=0 +a=6378137 +b=6356752.314140356 +towgs84=0,0,0 +no_defs"
	},

	{
		name: "From #4",
		GTModelTypeGeoKey: 1,
		GTRasterTypeGeoKey: 1,
		GeographicTypeGeoKey: 4326,
		ProjectedCSTypeGeoKey: 32634,
		proj4: "+proj=longlat +datum=WGS84 +no_defs"
	},

	{
		name: "Some example DEM with VerticalCSTypeGeoKey changed",
		GTModelTypeGeoKey: 1,
		GTRasterTypeGeoKey: 2,
		GTCitationGeoKey: 'WGS 84 / UTM zone 32N + EGM2008 geoid height',
		GeogCitationGeoKey: 'WGS 84',
		GeogAngularUnitsGeoKey: 9102,
		ProjectedCSTypeGeoKey: 32632,
		ProjLinearUnitsGeoKey: 9001,
		VerticalCSTypeGeoKey: 8051,
		proj4: "+proj=utm +zone=32 +datum=WGS84 +units=m +no_defs",
	},
	{
		name: "From #7",
		GTModelTypeGeoKey: 1,
		GTRasterTypeGeoKey: 1,
		GTCitationGeoKey: "WGS 84 / Pseudo-Mercator",
		GeogCitationGeoKey: "WGS 84",
		GeogAngularUnitsGeoKey: 9102,
		ProjectedCSTypeGeoKey: 3857,
		ProjLinearUnitsGeoKey: 9001,
		proj4: "+proj=merc +a=6378137 +b=6378137 +lat_ts=0 +lon_0=0 +x_0=0 +y_0=0 +k=1 +units=m +nadgrids=@null +wktext +no_defs",
	}
];

// Test runner
for (let key of testKeys) {
	let proj = toProj.toProj4(key);
	let str = `--------------------------------------------
Testing:            ${key.name}
Original string:    ${key.proj4}
Generated string:   ${proj.proj4}
X multiplier:       ${proj.coordinatesConversionParameters.x}
Y multiplier:       ${proj.coordinatesConversionParameters.y}
Z multiplier:       ${proj.coordinatesConversionParameters.z}
Units:              ${proj.coordinatesUnits}
Is GCS:             ${proj.isGCS ? "Yes" : "No"}`
	let errStr = "";
	for (let error in proj.errors)
		errStr += "\n\t" + error + ":\t\t" + proj.errors[error];
	if (errStr !== "")
		str += "\nErrors:" + errStr;
	console.log(str);
}