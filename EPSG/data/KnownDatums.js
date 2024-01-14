/**
 * Maps known EPSG datums to their transformation parameters. Proj4 parameter is "+towgs84".
 *
 * This module should be used only by generators. For all datums, use GeogGeodeticDatumGeoKey.js file.
 *
 * Source for this data: https://gis-lab.info/qa/mapinfo_to_wkt_proj4.html
 * Data has been taken from MapInfo by the authors of this article
 *
 * I've put everything together and tried my best to map datums' names to EPSG codes. If something's wrong, feel free to create an issue.
 *
 * @type {Object}
 */
module.exports = {

//--------------//
// 3 parameters //
//--------------//

// Mapped as:
// X shift,Y shift,Z shift // Name

	"6201": "-162,-12,206", // Adindan
	"6205": "-43,-163,45", // Afgooye
	"6209": "-143,-90,-294", // Arc1950
	"6210": "-160,-8,-300", // Arc1960
	"6712": "-207,107,52", // AscensionIsland1958
	"6710": "-320,550,-494", // AstroDOS71/4
	"6202": "-133,-48,148", // AustralianGeodetic1966
	"6203": "-134,-48,149", // AustralianGeodetic1984
	"6714": "-127,-769,472", // Bellevue(IGN)
	"6216": "-73,213,296", // Bermuda1957
	"6218": "307,304,-318", // Bogota 1975
	"6802": "307,304,-318", // Bogota 1975 (Bogota)
	"6221": "-148,136,90", // CampoInchauspe
	"6222": "-136,-108,-292", // Cape
	"6717": "-2,150,181", // CapeCanaveral
	"6223": "-263,6,431", // Carthage
	"6672": "175,-38,113", // Chatham1971
	"6224": "-134,229,-29", // ChuaAstro
	"1074": "-206,172,-6", // CorregoAlegre 1961
	"6225": "-206,172,-6", // CorregoAlegre 1970-72
	"6813": "-377,681,-50", // Djakarta(Batavia)
	"6719": "211,147,111", // EasterIsland1967
	"6230": "-87,-98,-121", // European1950
	"6668": "-86,-98,-119", // European1979
	"6685": "-133,-321,50", // GandajikaBase
	"6036": "0,0,0", // GRS67
	"6019": "0,0,0", // GRS80
	"6675": "-100,-248,259", // Guam1963
	"6254": "16,196,93", // HitoXVIII1963
	"6658": "-73,46,-86", // Hjorsey1955
	"6738": "-156,-271,-189", // HongKong1963
	"6236": "-634,-549,-201", // Hu-Tzu-Shan
	"6300": "506,-122,611", // Ireland1965
	"6725": "191,-77,-204", // JohnstonIsland1961
	"6244": "-97,787,86", // Kandawala
	"6251": "-90,40,88", // Liberia1964
	"6253": "-133,-77,-51", // Luzon(Philippines)
	"6256": "41,-220,-134", // Mahe1971
	"6262": "639,405,60", // Massawa
	"6261": "31,146,47", // Merchich
	"6727": "912,-58,1227", // MidwayAstro1961
	"6263": "-92,-93,122", // Minna
	"6271": "-2,374,172", // Naparima 1972
	"6158": "-2,374,172", // Naparima 1955
	"6268": "-8,160,176", // NAD27(Michigan)
	"1211": "0,0,0", // NAD83
	"6152": "0,0,0", // NAD83
	"6140": "0,0,0", // NAD83
	"6759": "0,0,0", // NAD83
	"1212": "0,0,0", // NAD83
	"1133": "0,0,0", // NAD83
	"1118": "0,0,0", // NAD83
	"1117": "0,0,0", // NAD83
	"1116": "0,0,0", // NAD83
	"6135": "61,-285,-181", // OldHawaiian
	"1147": "-346,-1,224", // Oman
	"5101": "375,-111,431", // Ordnance Datum Newlyn
	"1164": "375,-111,431", // Ordnance Datum Newlyn (Offshore)
	"6728": "-307,-92,127", // PicodelasNieves
	"6729": "185,165,42", // PitcairnAstro1967
	"6139": "11,72,-101", // PuertoRico
	"6614": "-128,-283,22", // QatarNational
	"6194": "164,138,-189", // Qornoq
	"6626": "94,-948,-1262", // Reunion
	"6806": "-225,-65,9", // Rome1940
	"6730": "170,42,84", // Santo(DOS)
	"6292": "-355,16,74", // SapperHill1943
	"6293": "616,97,-251", // Schwarzeck
	"6618": "-57,1,-41", // SouthAmerican1969
	"6185": "-499,-249,314", // SoutheastBase
	"1102": "-499,-249,314", // SoutheastBase
	"6663": "-499,-249,314", // SoutheastBase
	"1104": "-104,167,-38", // SouthwestBase
	"6665": "-104,167,-38", // SouthwestBase
	"6298": "-689,691,-46", // Timbalai1948
	"6301": "-128,481,664", // Tokyo
	"6734": "-632,438,-609", // TristanAstro1968
	"6731": "51,391,-36", // VitiLevu1916
	"6732": "101,52,-39", // Wake-Eniwetok1960
	"6043": "0,8,10", // WGS72
	"6030": "0,0,0", // WGS84
	"6309": "-155,171,37", // Yacare
	"6311": "-265,120,-358", // Zanderij
	"6231": "-83,-96,-113", // European1987
	"6169": "-115,118,426", // AmericanSamoa
	"6601": "-270,13,62", // AntiguaIslandAstro1943
	"6713": "-79,-129,145", // AyabelleLighthouse
	"6219": "-384,664,-48", // BukitRimpah
	"6155": "-83,37,124", // Dabola
	"6736": "260,12,-147", // DeceptionIsland
	"6183": "-104,167,-38", // GraciosaBaseSW1948
	"6255": "-333,-222,114", // HeratNorth
	"6239": "217,823,299", // Indian1954
	"6131": "198,881,317", // Indian1960
	"6240": "210,814,289", // Indian1975
	"6238": "-24,-15,5",// Indonesian1974
	"6735": "647,1777,-1124", // KusaieAstro1951
	"6250": "-130,29,364", // Leigon
	"6604": "174,359,365", // MontserratIsl.Astro1958
	"6266": "-74,-130,42", // M'Poraloko
	"6307": "-186,-93,310", // NorthSahara1959
	"6620": "-106,-129,165", // Point58
	"6615": "-499,-249,314", // PortoSanto1936
	"6616": "-289,-124,60", // SelvagemGrande1938
	"6175": "-88,4,101",// SierraLeone1960
	"6810": "-189,-242,-91", // TananariveObservatory1925
	"6297": "-189,-242,-91", // TananariveObservatory1925
	"6304": "-73,-247,227", // Voirol1874
	"6811": "-73,-247,227", // Voirol1874
	"6214": "-31.4,144.3,81.2", // Beijing 1954

// These datums are either not in EPSG or their index is unknown. Left here in case someone will need them.

// -150 -251 -2", // AinelAbd1970
// -491 -22 435", // Anna1Astro1965
// 145 75 -272", // AstroBeacon "E"
// 114 -116 -333", // AstroB4SorolAtoll
// 124 -234 -25", // AstronomicStation1952
// 298 -304 -375", // CantonAstro1966
// 230 -199 -752", // DOS1968
// 84 -22 209", // GeodeticDatum1949
// 252 -209 -751", // GUX1Astro
// 214 836 303", // Indian(Thailand/Vietnam)
// 289 734 257", // Indian(Bangladesh)
// 208 -435 -229", // ISTS073Astro1969
// 145 -187 103", // KerguelenIsland
// -11 851 5", // Kertau1948
// 42 124 147", // L.C.5Astro
// -133 -79 -72", // Luzon(MindanaoIsland)
// -289 -124 60", // MarcoAstro
// -247 -148 369", // Nahrwan(MasirahIsland)
// -249 -156 381", // Nahrwan(Un.ArabEmirates)
// -231 -196 482", // Nahrwan(SaudiArabia)
// -8 160 176", // NAD27(ContinentalUS)
// -5 135 172", // NAD27(Alaska)
// -4 154 178", // NAD27(Bahamas)
// 1 140 165", // NAD27(SanSalvador)
// -10 158 187", // NAD27(Canada)
// 0 125 201", // NAD27(CanalZone)
// -7 152 178", // NAD27(Caribbean)
// 0 125 194", // NAD27(CentralAmerica)
// -9 152 178", // NAD27(Cuba)
// 11 114 195", // NAD27(Greenland)
// -12 130 190", // NAD27(Mexico)
// -425 -169 81", // Observatorio1966
// -130 110 -13", // OldEgyptian
// -288 175 -376", // ProvisionalSouthAmerican
// -203 141 53", // SaoBraz
// 0 0 0", // WGS60
// 0 0 0", // WGS66
// -168 -60 320", // NTF(Greenwichmeridian)
// 593 26 478", // Netherlands7004
// 81 120 129", // BelgiumHayford
// -1 15 1", // NWGL10
// 498 -36 568", // RT90(Sweden)
// -303 -62 105", // Lisboa(DLx)
// -223 110 37", // Melrica1973(D73)
// 0 0 0", // EUREF89
// 0 0 0", // GDA94
// 0 0 0", // NZGD2000
// 374 150 588", // Estonia1937
// -7 215 225", // FortThomas1955
// 682 -203 480", // Hermannskogel
// 283 682 231", // Indian(Pakistan)
// -794 119 -298", // ISTS061Astro1968
// -425 -169 81", // ObservatorioMeteor.1939
// -148 51 -291", // PointeNoire1948
// 589 76 480", // S-JTSK
// -123 -206 219", // Voirol1960
// 0 0 0", // Hartbeesthoek94
// 0 0 0", // ATS77
// 0 0 0", // JGD2000
// -199.87 74.79 246.62", // HGRS87

//--------------//
// 7 parameters //
//--------------//

// Mapped as:
// X shift,Y shift,Z shift,X rotation,Y rotation,Z rotation // Name

	"6284": "24,-123,-94,-0.02,0.25,0.13,1.1", // Pulkovo 1942
	"6272": "59.47,-5.04,187.44,-0.47,0.1,-1.024,-4.5993,0", // New Zealand Geodetic Datum 1949
	"6124": "419.3836,99.3335,591.3451,-0.850389,-1.817277,7.862238,-0.99496", // Sweden (RT 90)
	"6610": "24,-123,-94,-0.02,-0.25,0.13,1.1", // Xian 1980

// For following datums same information as above applies

// 582 105 414 -1.04 -0.35 3.08 8.3, // DHDN (Potsdam/Rauenberg)
// -168 -60 320 0 0 0 0, // NTF (Paris meridian)
// 660.077 13.551 369.344 0.804816 0.577692 0.952236 5.66, // CH 1903 (Switzerland)
// -56 75.77 15.31 -0.37 -0.2 -0.21 -1.01, // HD72 (Hungarian Datum of 1972)
// -134.73 -110.92 -292.66 0 0 0 1, // Cape (South Africa)
// -117.763 -51.51 139.061 -0.292 -0.443 -0.277 -0.191, // Australia National (AGD84)
// -129.193 -41.212 130.73 -0.246 -0.374 -0.329 -2.955" // Australia A.C.T. (AGD66)
// -120.271 -64.543 161.632 -0.2175 0.0672 0.1291 2.4985, // Australia Tasmania (AGD66)
// -119.353 -48.301 139.484 -0.415 -0.26 -0.437 -0.613, // Australia Victoria/NSW (AGD66)
// -1.08 -0.27 -0.9 0 0 -0.16 -0.12, // Russia PZ90
// 23.92 -141.27 -80.9 0 -0.35 -0.82 -0.12, // Russia SK42
// 24.82 -131.21 -82.66 0 0 -0.16 -0.12, // Russia SK95
// -146.414 507.337 680.507 0 0 0 0, // Tokyo97
// -96.062 -82.428 -121.754 -4.801 -0.345 1.376 1.496, // KKJ
// -40.59527 -18.54979 -69.33956 -2.508 -1.8319 2.6114 -4.2991, // Lithuanian Pulkovo 1942
// -99.059 53.322 -112.486 -0.419 0.83 -1.885 0.999999, // Belgian 1972 7 parameter

	// These ones were taken from geodesy library (https://github.com/chrisveness/geodesy/blob/33d1bf53c069cd7dd83c6bf8531f5f3e0955c16e/latlon-ellipsoidal-datum.js#L54)
	// epsg.io doesn't seem to have those for the moment being, but I'll leave them anyway
	"1311": "89.5,93.8,123.1,-1.2,0.0,0.0,0.156", // ED50
	"1149": "0,0,0,0,0,0,0", // ETRS89
	"1954": "-482.530,130.596,-564.557,-8.150,1.042,0.214,0.631", // Irl1975
	"1314": "-446.448,125.157,-542.060, 20.4894,-0.1502, -0.2470,-0.8421", // OSGB36

}
