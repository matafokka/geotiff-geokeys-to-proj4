/**
 * Maps EPSG ellipsoids names to their Proj4 definitions.
 *
 * If this object contains EPSG code, use the value directly. Else, loop over all keys and check if ellipsoid name begins with it. If there're multiple matches, pick one with the greatest length.
 *
 * @type {Object}
 */
module.exports = {
	"7011": "clrk80ign",// 269 Clarke 1880 (IGN).
	"7001": "airy",     // Airy 1830
	// "": "andrae",   // Andrae 1876 (Den., Iclnd.)
	// "": "danish",   // Andrae 1876 (Denmark, Iceland)
	// "": "AL4.9,",   // Appl. Physics. 1965
	"7003": "aust_SA",  // Australian Natl & S. Amer. 1969
	"Bessel Namibia": "bess_nam", // Bessel 1841 (Namibia)
	"Bessel": "bessel",   // Bessel 1841
	"Clarke 1866": "clrk66",   // Clarke 1866
	"Clarke 1880": "clrk80",   // Clarke 1880 mod.
	// "": "CPM",      // Comm. des Poids et Mesures 1799
	// "": "delmbr",   // Delambre 1810 (Belgium)
	// "": "engelis",  // Engelis 1985
	// "": "evrstSS",  // Everest (Sabah & Sarawak)
	"7081": "evrst30",  // Everest 1830
	"Everest 1830": "evrst30",  // Everest 1830
	// "": "evrst48",  // Everest 1948
	// "": "evrst56",  // Everest 1956
	"7056": "evrst69",  // Everest 1969
	// "": "fschr60",  // Fischer (Mercury Datum) 1960
	// "": "fschr68",  // Fischer 1968
	"GRS 1980": "GRS80",    // GRS 1980(IUGG, 1980)
	"GRS 1967": "GRS67",    // GRS 67(IUGG 1967)
	"1025": "GSK2011",  // GSK-2011
	"7020": "helmert",  // Helmert 1906
	"7053": "hough",    // Hough
	// "": "IAU76",    // IAU 1976
	"7022": "intl",     // International 1909 (Hayford)
	// "": "kaula",    // Kaula 1961
	"7024": "krass",    // Krassovsky, 1942
	// "": "lerch",    // Lerch 1979
	// "": "MERIT",    // MERIT 1983
	// "": "mprts",    // Maupertius 1738
	"7002": "mod_airy", // Modified Airy
	// "": "fschr60m", // Modified Fischer 1960
	"7025": "NWL9D",    // Naval Weapons Lab., 1965
	// "": "new_intl", // New International 1967
	"7035": "sphere",   // Normal Sphere (r=6370997)
	"7054": "PZ90",     // PZ-90
	"7027": "plessis",  // Plessis 1817 (France)
	// "": "SEasia",   // Southeast Asia
	// "": "SGS85",    // Soviet Geodetic System 85
	// "": "WGS60",    // WGS 60
	// "": "WGS66",    // WGS 66
	"7043": "WGS72",    // WGS 72
	"7030": "WGS84",    // WGS 84
	// "": "walbeck",  // Walbeck
}