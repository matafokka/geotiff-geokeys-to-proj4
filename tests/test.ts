import { toProj4, type GeoKeys, type ConversionErrors } from "@/index";

interface Fixture extends GeoKeys {
  /** Fixture name */
  name: string;

  /** Proj4 string produced by the older library versions */
  oldProj4: string;

  /** Proj4 string produced by external software */
  extProj4: string;

  [key: string]: any;
}

const fixtures: Fixture[] = [
  // Extracted using QGIS from images from https://download.osgeo.org/geotiff/samples/

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
    oldProj4:
      "+proj=cea +lon_0=-117.333333333333 +lat_ts=33.75 +x_0=0 +y_0=0 +ellps=clrk66 +a=6378206.4 +b=6356583.8 +pm=0 +axis=ne +no_defs",
    extProj4: "+proj=cea +lon_0=-117.333333333333 +lat_ts=33.75 +x_0=0 +y_0=0 +datum=NAD27 +units=m +no_defs",
  },

  {
    name: "bogota.tif",
    GTModelTypeGeoKey: 1,
    GTRasterTypeGeoKey: 1,
    ProjectedCSTypeGeoKey: 21892,
    oldProj4:
      "+proj=tmerc +lat_0=4.599047222222 +lon_0=-74.080916666667 +k_0=1 +x_0=1000000 +y_0=1000000 +ellps=intl +a=6378388 +b=6356911.9461279465 +pm=0 +towgs84=307,304,-318 +axis=en +no_defs",
    extProj4:
      "+proj=tmerc +lat_0=4.599047222222222 +lon_0=-74.08091666666667 +k=1 +x_0=1000000 +y_0=1000000 +ellps=intl +towgs84=307,304,-318,0,0,0,0 +units=m +no_defs",
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
    oldProj4:
      "+proj=longlat +ellps=bessel +a=6377397.155 +b=6356078.962818189 +towgs84=598.1,73.7,418.2,0.202,0.045,-2.455,6.7 +no_defs",
    extProj4: "+proj=longlat +ellps=bessel +towgs84=598.1,73.7,418.2,0.202,0.045,-2.455,6.7 +no_defs",
  },

  {
    name: "ntf_nord.tif",
    GTModelTypeGeoKey: 1,
    GTRasterTypeGeoKey: 1,
    ProjectedCSTypeGeoKey: 27591,
    oldProj4:
      "+proj=lcc +lat_0=49.5 +lon_0=0 +k_0=0.999877341 +x_0=600000 +y_0=200000 +ellps=clrk80ign +a=6378249.2 +b=6356515 +pm=2.33722917 +axis=en +no_defs",
    extProj4:
      "+proj=lcc +lat_1=49.50000000000001 +lat_0=49.50000000000001 +lon_0=0 +k_0=0.999877341 +x_0=600000 +y_0=200000 +a=6378249.2 +b=6356515 +towgs84=-168,-60,320,0,0,0,0 +pm=paris +units=m +no_defs",
  },

  {
    name: "srtm_44_01_tiff.tif",
    GTModelTypeGeoKey: 2,
    GTRasterTypeGeoKey: 1,
    GeogAngularUnitsGeoKey: 9102,
    GeogCitationGeoKey:
      "GCS Name = Comm. des Poids et Mesures 1799|Datum = unknown|Ellipsoid = CPM|Primem = Greenwich|",
    GeogEllipsoidGeoKey: 32767,
    GeogGeodeticDatumGeoKey: 32767,
    GeogInvFlatteningGeoKey: 334.29,
    GeogPrimeMeridianLongGeoKey: 0,
    GeogSemiMajorAxisGeoKey: 6375738.7,
    GeographicTypeGeoKey: 32767,
    oldProj4: "+proj=longlat +a=6375738.7 +b=6356666.221912112 +no_defs",
    extProj4: "+proj=longlat +a=6375738.7 +b=6356666.221912113 +no_defs",
  },

  {
    name: "usa.tif",
    GTModelTypeGeoKey: 1,
    GTRasterTypeGeoKey: 1,
    PCSCitationGeoKey: "UTM Zone 17 N with WGS84",
    ProjectedCSTypeGeoKey: 32617,
    oldProj4:
      "+proj=tmerc +lat_0=0 +lon_0=-81 +k_0=0.9996 +x_0=500000 +y_0=0 +ellps=WGS84 +a=6378137 +b=6356752.314245179 +pm=0 +axis=en +no_defs",
    extProj4: "+proj=utm +zone=17 +datum=WGS84 +units=m +no_defs",
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
    oldProj4:
      "+proj=tmerc +lat_0=0 +lon_0=19 +k_0=0.9993 +x_0=500000 +y_0=-5300000 +ellps=WGS84 +a=6378137 +b=6356752.314245179 +pm=0 +no_defs",
    extProj4: "+proj=tmerc +lat_0=0 +lon_0=19 +k=0.9993 +x_0=500000 +y_0=-5300000 +datum=WGS84 +units=m +no_defs",
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
    GeogTOWGS84GeoKey: [0, 0, 0],
    GeographicTypeGeoKey: 32767,
    ProjLinearUnitsGeoKey: 9001,
    ProjectedCSTypeGeoKey: 32767,
    ProjectionGeoKey: 16032,
    oldProj4:
      "+proj=tmerc +lat_0=0 +lon_0=9 +k_0=0.9996 +x_0=500000 +y_0=0 +a=6378137 +b=6356752.314140356 +towgs84=0,0,0 +no_defs",
    extProj4:
      "+proj=tmerc +lat_0=0 +lon_0=9 +k_0=0.9996 +x_0=500000 +y_0=0 +a=6378137 +b=6356752.314140356 +towgs84=0,0,0 +no_defs",
  },

  {
    name: "From #4",
    GTModelTypeGeoKey: 1,
    GTRasterTypeGeoKey: 1,
    GeographicTypeGeoKey: 4326,
    ProjectedCSTypeGeoKey: 32634,
    oldProj4: "+proj=longlat +ellps=WGS84 +a=6378137 +b=6356752.314245179 +pm=0 +axis=ne +no_defs",
    extProj4: "+proj=longlat +datum=WGS84 +no_defs",
  },

  {
    name: "Some example DEM with VerticalCSTypeGeoKey changed",
    GTModelTypeGeoKey: 1,
    GTRasterTypeGeoKey: 2,
    GTCitationGeoKey: "WGS 84 / UTM zone 32N + EGM2008 geoid height",
    GeogCitationGeoKey: "WGS 84",
    GeogAngularUnitsGeoKey: 9102,
    ProjectedCSTypeGeoKey: 32632,
    ProjLinearUnitsGeoKey: 9001,
    VerticalCSTypeGeoKey: 8051,
    oldProj4:
      "+proj=tmerc +lat_0=0 +lon_0=9 +k_0=0.9996 +x_0=500000 +y_0=0 +ellps=WGS84 +a=6378137 +b=6356752.314245179 +pm=0 +axis=en +no_defs",
    extProj4: "+proj=utm +zone=32 +datum=WGS84 +units=m +no_defs",
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
    oldProj4: "+proj=merc +lon_0=0 +lat_ts=0 +x_0=0 +y_0=0 +ellps=WGS84 +a=6378137 +b=6378137 +pm=0 +axis=en +no_defs",
    extProj4:
      "+proj=merc +a=6378137 +b=6378137 +lat_ts=0 +lon_0=0 +x_0=0 +y_0=0 +k=1 +units=m +nadgrids=@null +wktext +no_defs",
  },
];

// Test runner

const results: string[] = [];
const mismatchedFixtures: string[] = [];

for (const fixture of fixtures) {
  const proj = toProj4(fixture);

  const strs = [
    `Testing:           ${fixture.name}`,
    `Original string:   ${fixture.extProj4}`,
    `Old string:        ${fixture.oldProj4}`,
    `Generated string:  ${proj.proj4}`,
    `X multiplier:      ${proj.conversionParameters.x}`,
    `Y multiplier:      ${proj.conversionParameters.y}`,
    `Z multiplier:      ${proj.conversionParameters.z}`,
    `Units:             ${proj.coordinatesUnits}`,
    `Is GCS:            ${proj.isGCS ? "Yes" : "No"}`,
  ];

  let hasErrors = false;

  for (const error in proj.errors) {
    if (!hasErrors) {
      hasErrors = true;
      strs.push("", "Errors:");
    }

    strs.push("  " + error + ": " + proj.errors[error as keyof ConversionErrors]);
  }

  if (fixture.oldProj4 !== proj.proj4) {
    strs.push("  ", "MISMATCH: New string doesn't match the old string!");
    mismatchedFixtures.push(fixture.name);
  }

  results.push(strs.join("\n"));
}

const div = "--------------------------------------------";

console.log(results.join(`\n\n${div}\n\n`));
console.log(`\n${div}\n`);

if (mismatchedFixtures.length) {
  const namesList = mismatchedFixtures.map((f, i) => `  ${i + 1}. ${f}`).join("\n");
  console.error("Tests failed! Mismatched fixtures:\n" + namesList);
  process.exit(-1);
} else {
  console.log("Tests passed!");
}
