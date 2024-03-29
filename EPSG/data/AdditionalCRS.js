// Additional data from various data sources

module.exports = {
	////////////////
	// ESRI codes. I don't know the origin, but these has been in epsg.io for 11 years, and nobody complained. Source:
	// https://github.com/maptiler/epsg.io/blob/4b18240e0830e17f7d95f34c4a02feaa9c0662a4/extra_codes_proj4_4.8.0.2/esri.extra
	////////////////

	"20002": "+proj=tmerc +lat_0=0 +lon_0=9 +k=1.000000 +x_0=2500000 +y_0=0 +ellps=krass +units=m +no_defs",
	// Pulkovo 1995 GK Zone 3
	"20003": "+proj=tmerc +lat_0=0 +lon_0=15 +k=1.000000 +x_0=3500000 +y_0=0 +ellps=krass +units=m +no_defs",
	// Pulkovo 1995 GK Zone 2N
	"20062": "+proj=tmerc +lat_0=0 +lon_0=9 +k=1.000000 +x_0=500000 +y_0=0 +ellps=krass +units=m +no_defs",
	// Pulkovo 1995 GK Zone 3N
	"20063": "+proj=tmerc +lat_0=0 +lon_0=15 +k=1.000000 +x_0=500000 +y_0=0 +ellps=krass +units=m +no_defs",
	// La Canoa UTM Zone 21N
	"24721": "+proj=utm +zone=21 +ellps=intl +units=m +no_defs",
	// NAD 1927 StatePlane Hawaii 1 FIPS 5101
	"26761": "+proj=tmerc +lat_0=18.83333333333333 +lon_0=-155.5 +k=0.999967 +x_0=152400.3048006096 +y_0=0 +ellps=clrk66 +datum=NAD27 +to_meter=0.3048006096012192 +no_defs",
	// NAD 1927 StatePlane Hawaii 2 FIPS 5102
	"26762": "+proj=tmerc +lat_0=20.33333333333333 +lon_0=-156.6666666666667 +k=0.999967 +x_0=152400.3048006096 +y_0=0 +ellps=clrk66 +datum=NAD27 +to_meter=0.3048006096012192 +no_defs",
	// NAD 1927 StatePlane Hawaii 3 FIPS 5103
	"26763": "+proj=tmerc +lat_0=21.16666666666667 +lon_0=-158 +k=0.999990 +x_0=152400.3048006096 +y_0=0 +ellps=clrk66 +datum=NAD27 +to_meter=0.3048006096012192 +no_defs",
	// NAD 1927 StatePlane Hawaii 4 FIPS 5104
	"26764": "+proj=tmerc +lat_0=21.83333333333333 +lon_0=-159.5 +k=0.999990 +x_0=152400.3048006096 +y_0=0 +ellps=clrk66 +datum=NAD27 +to_meter=0.3048006096012192 +no_defs",
	// NAD 1927 StatePlane Hawaii 5 FIPS 5105
	"26765": "+proj=tmerc +lat_0=21.66666666666667 +lon_0=-160.1666666666667 +k=1.000000 +x_0=152400.3048006096 +y_0=0 +ellps=clrk66 +datum=NAD27 +to_meter=0.3048006096012192 +no_defs",
	// NAD 1927 StatePlane Michigan North FIPS 2111
	"26788": "+proj=lcc +lat_1=45.48333333333333 +lat_2=47.08333333333334 +lat_0=44.78333333333333 +lon_0=-87 +x_0=609601.2192024385 +y_0=0 +ellps=clrk66 +datum=NAD27 +to_meter=0.3048006096012192 +no_defs",
	// NAD 1927 StatePlane Michigan Central FIPS 2112
	"26789": "+proj=lcc +lat_1=44.18333333333333 +lat_2=45.7 +lat_0=43.31666666666667 +lon_0=-84.33333333333333 +x_0=609601.2192024385 +y_0=0 +ellps=clrk66 +datum=NAD27 +to_meter=0.3048006096012192 +no_defs",
	// NAD 1927 StatePlane Michigan South FIPS 2113
	"26790": "+proj=lcc +lat_1=42.1 +lat_2=43.66666666666666 +lat_0=41.5 +lon_0=-84.33333333333333 +x_0=609601.2192024385 +y_0=0 +ellps=clrk66 +datum=NAD27 +to_meter=0.3048006096012192 +no_defs",
	// Nord Algerie
	"30591": "+proj=lcc +lat_1=36 +lat_0=36 +lon_0=2.7 +k_0=0.999625544 +x_0=500135 +y_0=300090 +ellps=clrk80 +units=m +no_defs",
	// Sud Algerie
	"30592": "+proj=lcc +lat_1=33.3 +lat_0=33.3 +lon_0=2.7 +k_0=0.999625769 +x_0=500135 +y_0=300090 +ellps=clrk80 +units=m +no_defs",
	// Germany Zone 1
	"31491": "+proj=tmerc +lat_0=0 +lon_0=3 +k=1.000000 +x_0=1500000 +y_0=0 +ellps=bessel +units=m +no_defs",
	// Germany Zone 2
	"31492": "+proj=tmerc +lat_0=0 +lon_0=6 +k=1.000000 +x_0=2500000 +y_0=0 +ellps=bessel +units=m +no_defs",
	// Germany Zone 3
	"31493": "+proj=tmerc +lat_0=0 +lon_0=9 +k=1.000000 +x_0=3500000 +y_0=0 +ellps=bessel +units=m +no_defs",
	// Germany Zone 4
	"31494": "+proj=tmerc +lat_0=0 +lon_0=12 +k=1.000000 +x_0=4500000 +y_0=0 +ellps=bessel +units=m +no_defs",
	// Germany Zone 5
	"31495": "+proj=tmerc +lat_0=0 +lon_0=15 +k=1.000000 +x_0=5500000 +y_0=0 +ellps=bessel +units=m +no_defs",
	// NAD 1927 StatePlane Puerto Rico FIPS 5201
	"32059": "+proj=lcc +lat_1=18.03333333333334 +lat_2=18.43333333333333 +lat_0=17.83333333333333 +lon_0=-66.43333333333334 +x_0=152400.3048006096 +y_0=0 +ellps=clrk66 +datum=NAD27 +to_meter=0.3048006096012192 +no_defs",
	// NAD 1927 StatePlane Virgin Islands St Croix FIPS 5202
	"32060": "+proj=lcc +lat_1=18.03333333333334 +lat_2=18.43333333333333 +lat_0=17.83333333333333 +lon_0=-66.43333333333334 +x_0=152400.3048006096 +y_0=30480.06096012193 +ellps=clrk66 +datum=NAD27 +to_meter=0.3048006096012192 +no_defs",
	// Sphere Plate Carree
	"53001": "+a=6371000 +b=6371000 +units=m +no_defs",
	// Sphere Equidistant Cylindrical
	"53002": "+a=6371000 +b=6371000 +units=m +no_defs",
	// Sphere Miller Cylindrical
	"53003": "+proj=mill +lat_0=0 +lon_0=0 +x_0=0 +y_0=0 +R_A +a=6371000 +b=6371000 +units=m +no_defs",
	// Sphere Mercator
	"53004": "+proj=merc +lat_ts=0 +lon_0=0 +k=1.000000 +x_0=0 +y_0=0 +a=6371000 +b=6371000 +units=m +no_defs",
	// Sphere Sinusoidal
	"53008": "+proj=sinu +lon_0=0 +x_0=0 +y_0=0 +a=6371000 +b=6371000 +units=m +no_defs",
	// Sphere Mollweide
	"53009": "+proj=moll +lon_0=0 +x_0=0 +y_0=0 +a=6371000 +b=6371000 +units=m +no_defs",
	// Sphere Eckert VI
	"53010": "+proj=eck6 +lon_0=0 +x_0=0 +y_0=0 +a=6371000 +b=6371000 +units=m +no_defs",
	// Sphere Eckert V
	"53011": "+a=6371000 +b=6371000 +units=m +no_defs",
	// Sphere Eckert IV
	"53012": "+proj=eck4 +lon_0=0 +x_0=0 +y_0=0 +a=6371000 +b=6371000 +units=m +no_defs",
	// Sphere Eckert III
	"53013": "+a=6371000 +b=6371000 +units=m +no_defs",
	// Sphere Eckert II
	"53014": "+a=6371000 +b=6371000 +units=m +no_defs",
	// Sphere Eckert I
	"53015": "+a=6371000 +b=6371000 +units=m +no_defs",
	// Sphere Gall Stereographic
	"53016": "+proj=gall +lon_0=0 +x_0=0 +y_0=0 +a=6371000 +b=6371000 +units=m +no_defs",
	// Sphere Behrmann
	"53017": "+a=6371000 +b=6371000 +units=m +no_defs",
	// Sphere Winkel I
	"53018": "+a=6371000 +b=6371000 +units=m +no_defs",
	// Sphere Winkel II
	"53019": "+a=6371000 +b=6371000 +units=m +no_defs",
	// Sphere Polyconic
	"53021": "+proj=poly +lat_0=0 +lon_0=0 +x_0=0 +y_0=0 +a=6371000 +b=6371000 +units=m +no_defs",
	// Sphere Quartic Authalic
	"53022": "+a=6371000 +b=6371000 +units=m +no_defs",
	// Sphere Loximuthal
	"53023": "+a=6371000 +b=6371000 +units=m +no_defs",
	// Sphere Bonne
	"53024": "+a=6371000 +b=6371000 +units=m +no_defs",
	// Sphere Hotine
	"53025": "+a=6371000 +b=6371000 +units=m +no_defs",
	// Sphere Stereographic
	"53026": "+proj=stere +lat_0=0 +lon_0=0 +x_0=0 +y_0=0 +a=6371000 +b=6371000 +units=m +no_defs",
	// Sphere Equidistant Conic
	"53027": "+proj=eqdc +lat_0=0 +lon_0=0 +lat_1=60 +lat_2=60 +x_0=0 +y_0=0 +a=6371000 +b=6371000 +units=m +no_defs",
	// Sphere Cassini
	"53028": "+proj=cass +lat_0=0 +lon_0=0 +x_0=0 +y_0=0 +a=6371000 +b=6371000 +units=m +no_defs",
	// Sphere Van der Grinten I
	"53029": "+proj=vandg +lon_0=0 +x_0=0 +y_0=0 +R_A +a=6371000 +b=6371000 +units=m +no_defs",
	// Sphere Robinson
	"53030": "+proj=robin +lon_0=0 +x_0=0 +y_0=0 +a=6371000 +b=6371000 +units=m +no_defs",
	// Sphere Two Point Equidistant
	"53031": "+a=6371000 +b=6371000 +units=m +no_defs",
	// Sphere Azimuthal Equidistant
	"53032": "+proj=aeqd +lat_0=0 +lon_0=0 +x_0=0 +y_0=0 +a=6371000 +b=6371000 +units=m +no_defs",
	// World Plate Carree
	"54001": "+ellps=WGS84 +datum=WGS84 +units=m +no_defs",
	// World Equidistant Cylindrical
	"54002": "+ellps=WGS84 +datum=WGS84 +units=m +no_defs",
	// World Miller Cylindrical
	"54003": "+proj=mill +lat_0=0 +lon_0=0 +x_0=0 +y_0=0 +R_A +ellps=WGS84 +datum=WGS84 +units=m +no_defs",
	// World Mercator
	"54004": "+proj=merc +lat_ts=0 +lon_0=0 +k=1.000000 +x_0=0 +y_0=0 +ellps=WGS84 +datum=WGS84 +units=m +no_defs",
	// World Sinusoidal
	"54008": "+proj=sinu +lon_0=0 +x_0=0 +y_0=0 +ellps=WGS84 +datum=WGS84 +units=m +no_defs",
	// World Mollweide
	"54009": "+proj=moll +lon_0=0 +x_0=0 +y_0=0 +ellps=WGS84 +datum=WGS84 +units=m +no_defs",
	// World Eckert VI
	"54010": "+proj=eck6 +lon_0=0 +x_0=0 +y_0=0 +ellps=WGS84 +datum=WGS84 +units=m +no_defs",
	// World Eckert V
	"54011": "+ellps=WGS84 +datum=WGS84 +units=m +no_defs",
	// World Eckert IV
	"54012": "+proj=eck4 +lon_0=0 +x_0=0 +y_0=0 +ellps=WGS84 +datum=WGS84 +units=m +no_defs",
	// World Eckert III
	"54013": "+ellps=WGS84 +datum=WGS84 +units=m +no_defs",
	// World Eckert II
	"54014": "+ellps=WGS84 +datum=WGS84 +units=m +no_defs",
	// World Eckert I
	"54015": "+ellps=WGS84 +datum=WGS84 +units=m +no_defs",
	// World Gall Stereographic
	"54016": "+proj=gall +lon_0=0 +x_0=0 +y_0=0 +ellps=WGS84 +datum=WGS84 +units=m +no_defs",
	// World Behrmann
	"54017": "+ellps=WGS84 +datum=WGS84 +units=m +no_defs",
	// World Winkel I
	"54018": "+ellps=WGS84 +datum=WGS84 +units=m +no_defs",
	// World Winkel II
	"54019": "+ellps=WGS84 +datum=WGS84 +units=m +no_defs",
	// World Polyconic
	"54021": "+proj=poly +lat_0=0 +lon_0=0 +x_0=0 +y_0=0 +ellps=WGS84 +datum=WGS84 +units=m +no_defs",
	// World Quartic Authalic
	"54022": "+ellps=WGS84 +datum=WGS84 +units=m +no_defs",
	// World Loximuthal
	"54023": "+ellps=WGS84 +datum=WGS84 +units=m +no_defs",
	// World Bonne
	"54024": "+ellps=WGS84 +datum=WGS84 +units=m +no_defs",
	// World Hotine
	"54025": "+ellps=WGS84 +datum=WGS84 +units=m +no_defs",
	// World Stereographic
	"54026": "+proj=stere +lat_0=0 +lon_0=0 +x_0=0 +y_0=0 +ellps=WGS84 +datum=WGS84 +units=m +no_defs",
	// World Equidistant Conic
	"54027": "+proj=eqdc +lat_0=0 +lon_0=0 +lat_1=60 +lat_2=60 +x_0=0 +y_0=0 +ellps=WGS84 +datum=WGS84 +units=m +no_defs",
	// World Cassini
	"54028": "+proj=cass +lat_0=0 +lon_0=0 +x_0=0 +y_0=0 +ellps=WGS84 +datum=WGS84 +units=m +no_defs",
	// World Van der Grinten I
	"54029": "+proj=vandg +lon_0=0 +x_0=0 +y_0=0 +R_A +ellps=WGS84 +datum=WGS84 +units=m +no_defs",
	// World Robinson
	"54030": "+proj=robin +lon_0=0 +x_0=0 +y_0=0 +ellps=WGS84 +datum=WGS84 +units=m +no_defs",
	// World Two Point Equidistant
	"54031": "+ellps=WGS84 +datum=WGS84 +units=m +no_defs",
	// World Azimuthal Equidistant
	"54032": "+proj=aeqd +lat_0=0 +lon_0=0 +x_0=0 +y_0=0 +ellps=WGS84 +datum=WGS84 +units=m +no_defs",
	// NAD 1927 StatePlane Guam FIPS 5400
	"65061": "+proj=poly +lat_0=13.47246635277778 +lon_0=-144.7487507055556 +x_0=50000.00000000001 +y_0=50000.00000000001 +ellps=clrk66 +datum=NAD27 +to_meter=0.3048006096012192 +no_defs",
	// NAD 1983 StatePlane Guam FIPS 5400
	"65161": "+proj=poly +lat_0=13.47246635277778 +lon_0=-144.7487507055556 +x_0=50000 +y_0=50000 +ellps=GRS80 +datum=NAD83 +units=m +no_defs",
	// Canada Albers Equal Area Conic
	"102001": "+proj=aea +lat_1=50 +lat_2=70 +lat_0=40 +lon_0=-96 +x_0=0 +y_0=0 +ellps=GRS80 +datum=NAD83 +units=m +no_defs",
	// Canada Lambert Conformal Conic
	"102002": "+proj=lcc +lat_1=50 +lat_2=70 +lat_0=40 +lon_0=-96 +x_0=0 +y_0=0 +ellps=GRS80 +datum=NAD83 +units=m +no_defs",
	// USA Contiguous Albers Equal Area Conic
	"102003": "+proj=aea +lat_1=29.5 +lat_2=45.5 +lat_0=37.5 +lon_0=-96 +x_0=0 +y_0=0 +ellps=GRS80 +datum=NAD83 +units=m +no_defs",
	// USA Contiguous Lambert Conformal Conic
	"102004": "+proj=lcc +lat_1=33 +lat_2=45 +lat_0=39 +lon_0=-96 +x_0=0 +y_0=0 +ellps=GRS80 +datum=NAD83 +units=m +no_defs",
	// USA Contiguous Equidistant Conic
	"102005": "+proj=eqdc +lat_0=0 +lon_0=0 +lat_1=33 +lat_2=45 +x_0=0 +y_0=0 +ellps=GRS80 +datum=NAD83 +units=m +no_defs",
	// Alaska Albers Equal Area Conic
	"102006": "+proj=aea +lat_1=55 +lat_2=65 +lat_0=50 +lon_0=-154 +x_0=0 +y_0=0 +ellps=GRS80 +datum=NAD83 +units=m +no_defs",
	// Hawaii Albers Equal Area Conic
	"102007": "+proj=aea +lat_1=8 +lat_2=18 +lat_0=13 +lon_0=-157 +x_0=0 +y_0=0 +ellps=GRS80 +datum=NAD83 +units=m +no_defs",
	// North America Albers Equal Area Conic
	"102008": "+proj=aea +lat_1=20 +lat_2=60 +lat_0=40 +lon_0=-96 +x_0=0 +y_0=0 +ellps=GRS80 +datum=NAD83 +units=m +no_defs",
	// North America Lambert Conformal Conic
	"102009": "+proj=lcc +lat_1=20 +lat_2=60 +lat_0=40 +lon_0=-96 +x_0=0 +y_0=0 +ellps=GRS80 +datum=NAD83 +units=m +no_defs",
	// North America Equidistant Conic
	"102010": "+proj=eqdc +lat_0=0 +lon_0=0 +lat_1=20 +lat_2=60 +x_0=0 +y_0=0 +ellps=GRS80 +datum=NAD83 +units=m +no_defs",
	// Africa Sinusoidal
	"102011": "+proj=sinu +lon_0=0 +x_0=0 +y_0=0 +ellps=WGS84 +datum=WGS84 +units=m +no_defs",
	// Asia Lambert Conformal Conic
	"102012": "+proj=lcc +lat_1=30 +lat_2=62 +lat_0=0 +lon_0=105 +x_0=0 +y_0=0 +ellps=WGS84 +datum=WGS84 +units=m +no_defs",
	// Europe Albers Equal Area Conic
	"102013": "+proj=aea +lat_1=43 +lat_2=62 +lat_0=30 +lon_0=10 +x_0=0 +y_0=0 +ellps=intl +units=m +no_defs",
	// Europe Lambert Conformal Conic
	"102014": "+proj=lcc +lat_1=43 +lat_2=62 +lat_0=30 +lon_0=10 +x_0=0 +y_0=0 +ellps=intl +units=m +no_defs",
	// South America Lambert Conformal Conic
	"102015": "+proj=lcc +lat_1=-5 +lat_2=-42 +lat_0=-32 +lon_0=-60 +x_0=0 +y_0=0 +ellps=aust_SA +units=m +no_defs",
	// North Pole Azimuthal Equidistant
	"102016": "+proj=aeqd +lat_0=90 +lon_0=0 +x_0=0 +y_0=0 +ellps=WGS84 +datum=WGS84 +units=m +no_defs",
	// North Pole Lambert Azimuthal Equal Area
	"102017": "+proj=laea +lat_0=90 +lon_0=0 +x_0=0 +y_0=0 +ellps=WGS84 +datum=WGS84 +units=m +no_defs",
	// North Pole Stereographic
	"102018": "+proj=stere +lat_0=90 +lon_0=0 +x_0=0 +y_0=0 +ellps=WGS84 +datum=WGS84 +units=m +no_defs",
	// South Pole Azimuthal Equidistant
	"102019": "+proj=aeqd +lat_0=-90 +lon_0=0 +x_0=0 +y_0=0 +ellps=WGS84 +datum=WGS84 +units=m +no_defs",
	// South Pole Lambert Azimuthal Equal Area
	"102020": "+proj=laea +lat_0=-90 +lon_0=0 +x_0=0 +y_0=0 +ellps=WGS84 +datum=WGS84 +units=m +no_defs",
	// South Pole Stereographic
	"102021": "+proj=stere +lat_0=-90 +lon_0=0 +x_0=0 +y_0=0 +ellps=WGS84 +datum=WGS84 +units=m +no_defs",
	// Africa Albers Equal Area Conic
	"102022": "+proj=aea +lat_1=20 +lat_2=-23 +lat_0=0 +lon_0=25 +x_0=0 +y_0=0 +ellps=WGS84 +datum=WGS84 +units=m +no_defs",
	// Africa Equidistant Conic
	"102023": "+proj=eqdc +lat_0=0 +lon_0=0 +lat_1=20 +lat_2=-23 +x_0=0 +y_0=0 +ellps=WGS84 +datum=WGS84 +units=m +no_defs",
	// Africa Lambert Conformal Conic
	"102024": "+proj=lcc +lat_1=20 +lat_2=-23 +lat_0=0 +lon_0=25 +x_0=0 +y_0=0 +ellps=WGS84 +datum=WGS84 +units=m +no_defs",
	// Asia North Albers Equal Area Conic
	"102025": "+proj=aea +lat_1=15 +lat_2=65 +lat_0=30 +lon_0=95 +x_0=0 +y_0=0 +ellps=WGS84 +datum=WGS84 +units=m +no_defs",
	// Asia North Equidistant Conic
	"102026": "+proj=eqdc +lat_0=0 +lon_0=0 +lat_1=15 +lat_2=65 +x_0=0 +y_0=0 +ellps=WGS84 +datum=WGS84 +units=m +no_defs",
	// Asia North Lambert Conformal Conic
	"102027": "+proj=lcc +lat_1=15 +lat_2=65 +lat_0=30 +lon_0=95 +x_0=0 +y_0=0 +ellps=WGS84 +datum=WGS84 +units=m +no_defs",
	// Asia South Albers Equal Area Conic
	"102028": "+proj=aea +lat_1=7 +lat_2=-32 +lat_0=-15 +lon_0=125 +x_0=0 +y_0=0 +ellps=WGS84 +datum=WGS84 +units=m +no_defs",
	// Asia South Equidistant Conic
	"102029": "+proj=eqdc +lat_0=0 +lon_0=0 +lat_1=7 +lat_2=-32 +x_0=0 +y_0=0 +ellps=WGS84 +datum=WGS84 +units=m +no_defs",
	// Asia South Lambert Conformal Conic
	"102030": "+proj=lcc +lat_1=7 +lat_2=-32 +lat_0=-15 +lon_0=125 +x_0=0 +y_0=0 +ellps=WGS84 +datum=WGS84 +units=m +no_defs",
	// Europe Equidistant Conic
	"102031": "+proj=eqdc +lat_0=0 +lon_0=0 +lat_1=43 +lat_2=62 +x_0=0 +y_0=0 +ellps=intl +units=m +no_defs",
	// South America Equidistant Conic
	"102032": "+proj=eqdc +lat_0=0 +lon_0=0 +lat_1=-5 +lat_2=-42 +x_0=0 +y_0=0 +ellps=aust_SA +units=m +no_defs",
	// South America Albers Equal Area Conic
	"102033": "+proj=aea +lat_1=-5 +lat_2=-42 +lat_0=-32 +lon_0=-60 +x_0=0 +y_0=0 +ellps=aust_SA +units=m +no_defs",
	// S-JTSK Krovak
	"102065": "+proj=krovak +lat_0=49.5 +lon_0=24.83333333333333 +alpha=30.28813975277778 +k=0.9999 +x_0=0 +y_0=0 +ellps=bessel +units=m +no_defs",
	// S-JTSK Ferro Krovak East North
	"102066": "+proj=krovak +lat_0=49.5 +lon_0=24.83333333333333 +alpha=30.28813975277778 +k=0.9999 +x_0=0 +y_0=0 +ellps=bessel +pm=-17.66666666666667 +units=m +no_defs",
	// S-JTSK Krovak East North
	"102067": "+proj=krovak +lat_0=49.5 +lon_0=24.83333333333333 +alpha=30.28813975277778 +k=0.9999 +x_0=0 +y_0=0 +ellps=bessel +units=m +no_defs",
	// Monte Mario Italy 1
	"102091": "+proj=tmerc +lat_0=0 +lon_0=9 +k=0.999600 +x_0=1500000 +y_0=0 +ellps=intl +units=m +no_defs",
	// Monte Mario Italy 2
	"102092": "+proj=tmerc +lat_0=0 +lon_0=15 +k=0.999600 +x_0=2520000 +y_0=0 +ellps=intl +units=m +no_defs",
	// NGO 1948 Norway Zone 1
	"102101": "+proj=tmerc +lat_0=58 +lon_0=6.05625 +k=1.000000 +x_0=0 +y_0=0 +a=6377492.018 +b=6356173.508712696 +units=m +no_defs",
	// NGO 1948 Norway Zone 2
	"102102": "+proj=tmerc +lat_0=58 +lon_0=8.389583333333333 +k=1.000000 +x_0=0 +y_0=0 +a=6377492.018 +b=6356173.508712696 +units=m +no_defs",
	// NGO 1948 Norway Zone 3
	"102103": "+proj=tmerc +lat_0=58 +lon_0=10.72291666666667 +k=1.000000 +x_0=0 +y_0=0 +a=6377492.018 +b=6356173.508712696 +units=m +no_defs",
	// NGO 1948 Norway Zone 4
	"102104": "+proj=tmerc +lat_0=58 +lon_0=13.22291666666667 +k=1.000000 +x_0=0 +y_0=0 +a=6377492.018 +b=6356173.508712696 +units=m +no_defs",
	// NGO 1948 Norway Zone 5
	"102105": "+proj=tmerc +lat_0=58 +lon_0=16.88958333333333 +k=1.000000 +x_0=0 +y_0=0 +a=6377492.018 +b=6356173.508712696 +units=m +no_defs",
	// NGO 1948 Norway Zone 6
	"102106": "+proj=tmerc +lat_0=58 +lon_0=20.88958333333333 +k=1.000000 +x_0=0 +y_0=0 +a=6377492.018 +b=6356173.508712696 +units=m +no_defs",
	// NGO 1948 Norway Zone 7
	"102107": "+proj=tmerc +lat_0=58 +lon_0=24.88958333333333 +k=1.000000 +x_0=0 +y_0=0 +a=6377492.018 +b=6356173.508712696 +units=m +no_defs",
	// NGO 1948 Norway Zone 8
	"102108": "+proj=tmerc +lat_0=58 +lon_0=29.05625 +k=1.000000 +x_0=0 +y_0=0 +a=6377492.018 +b=6356173.508712696 +units=m +no_defs",
	// RGF 1993 Lambert 93
	"102110": "+proj=lcc +lat_1=44 +lat_2=49 +lat_0=46.5 +lon_0=3 +x_0=700000 +y_0=6600000 +ellps=GRS80 +units=m +no_defs",
	// Old Hawaiian UTM Zone 4N
	"102114": "+proj=utm +zone=4 +ellps=clrk66 +units=m +no_defs",
	// Old Hawaiian UTM Zone 5N
	"102115": "+proj=utm +zone=5 +ellps=clrk66 +units=m +no_defs",
	// NAD 1927 Michigan GeoRef Feet US
	"102120": "+proj=omerc +lat_0=45.30916666666666 +lonc=-86 +alpha=337.255555555556 +k=0.9996 +x_0=2546731.495961392 +y_0=-4354009.816002033 +ellps=clrk66 +datum=NAD27 +to_meter=0.3048006096012192 +no_defs",
	// NAD 1983 Michigan GeoRef Feet US
	"102121": "+proj=omerc +lat_0=45.30916666666666 +lonc=-86 +alpha=337.255555555556 +k=0.9996 +x_0=2546731.495961392 +y_0=-4354009.816002033 +ellps=GRS80 +datum=NAD83 +to_meter=0.3048006096012192 +no_defs",
	// NAD 1927 Michigan GeoRef Meters
	"102122": "+proj=omerc +lat_0=45.30916666666666 +lonc=-86 +alpha=337.255555555556 +k=0.9996 +x_0=2546731.496 +y_0=-4354009.816 +ellps=clrk66 +datum=NAD27 +units=m +no_defs",
	// NAD 1983 Michigan GeoRef Meters
	"102123": "+proj=omerc +lat_0=45.30916666666666 +lonc=-86 +alpha=337.255555555556 +k=0.9996 +x_0=2546731.496 +y_0=-4354009.816 +ellps=GRS80 +datum=NAD83 +units=m +no_defs",
	// NGO 1948 UTM Zone 32N
	"102132": "+proj=utm +zone=32 +a=6377492.018 +b=6356173.508712696 +units=m +no_defs",
	// NGO 1948 UTM Zone 33N
	"102133": "+proj=utm +zone=33 +a=6377492.018 +b=6356173.508712696 +units=m +no_defs",
	// NGO 1948 UTM Zone 34N
	"102134": "+proj=utm +zone=34 +a=6377492.018 +b=6356173.508712696 +units=m +no_defs",
	// NGO 1948 UTM Zone 35N
	"102135": "+proj=utm +zone=35 +a=6377492.018 +b=6356173.508712696 +units=m +no_defs",
	// Hong Kong 1980 Grid
	"102140": "+proj=tmerc +lat_0=22.31213333333334 +lon_0=114.1785555555556 +k=1.000000 +x_0=836694.05 +y_0=819069.8 +ellps=intl +units=m +no_defs",
	// Hong Kong 1980 UTM Zone 49N
	"102141": "+proj=utm +zone=49 +ellps=intl +units=m +no_defs",
	// Hong Kong 1980 UTM Zone 50N
	"102142": "+proj=utm +zone=50 +ellps=intl +units=m +no_defs",
	// Tokyo UTM Zone 51N
	"102151": "+proj=utm +zone=51 +ellps=bessel +units=m +no_defs",
	// Tokyo UTM Zone 52N
	"102152": "+proj=utm +zone=52 +ellps=bessel +units=m +no_defs",
	// Tokyo UTM Zone 53N
	"102153": "+proj=utm +zone=53 +ellps=bessel +units=m +no_defs",
	// Tokyo UTM Zone 54N
	"102154": "+proj=utm +zone=54 +ellps=bessel +units=m +no_defs",
	// Tokyo UTM Zone 55N
	"102155": "+proj=utm +zone=55 +ellps=bessel +units=m +no_defs",
	// Tokyo UTM Zone 56N
	"102156": "+proj=utm +zone=56 +ellps=bessel +units=m +no_defs",
	// Datum 73 Hayford Gauss IGeoE
	"102160": "+proj=tmerc +lat_0=39.66666666666666 +lon_0=-8.131906111111112 +k=1.000000 +x_0=200180.598 +y_0=299913.01 +ellps=intl +units=m +no_defs",
	// Datum 73 Hayford Gauss IPCC
	"102161": "+proj=tmerc +lat_0=39.66666666666666 +lon_0=-8.131906111111112 +k=1.000000 +x_0=180.598 +y_0=-86.98999999999999 +ellps=intl +units=m +no_defs",
	// Graciosa Base SW 1948 UTM Zone 26N
	"102162": "+proj=utm +zone=26 +ellps=intl +units=m +no_defs",
	// Lisboa Bessel Bonne
	"102163": "+ellps=bessel +units=m +no_defs",
	// Lisboa Hayford Gauss IGeoE
	"102164": "+proj=tmerc +lat_0=39.66666666666666 +lon_0=-8.131906111111112 +k=1.000000 +x_0=200000 +y_0=300000 +ellps=intl +units=m +no_defs",
	// Lisboa Hayford Gauss IPCC
	"102165": "+proj=tmerc +lat_0=39.66666666666666 +lon_0=-8.131906111111112 +k=1.000000 +x_0=0 +y_0=0 +ellps=intl +units=m +no_defs",
	// Observ Meteorologico 1939 UTM Zone 25N
	"102166": "+proj=utm +zone=25 +ellps=intl +units=m +no_defs",
	// Porto Santo 1936 UTM Zone 28N
	"102167": "+proj=utm +zone=28 +ellps=intl +units=m +no_defs",
	// Sao Braz UTM Zone 26N
	"102168": "+proj=utm +zone=26 +ellps=intl +units=m +no_defs",
	// Selvagem Grande 1938 UTM Zone 28N
	"102169": "+proj=utm +zone=28 +ellps=intl +units=m +no_defs",
	// Nord Maroc Degree
	"102191": "+proj=lcc +lat_1=33.3 +lat_0=33.3 +lon_0=-5.4 +k_0=0.999625769 +x_0=500000 +y_0=300000 +a=6378249.2 +b=6356514.999904194 +units=m +no_defs",
	// Sud Maroc Degree
	"102192": "+proj=lcc +lat_1=29.7 +lat_0=29.7 +lon_0=-5.4 +k_0=0.9996155960000001 +x_0=500000 +y_0=300000 +a=6378249.2 +b=6356514.999904194 +units=m +no_defs",
	// Sahara Degree
	"102193": "+proj=lcc +lat_1=26.1 +lat_0=26.1 +lon_0=-5.4 +k_0=0.9996 +x_0=1200000 +y_0=400000 +a=6378249.2 +b=6356514.999904194 +units=m +no_defs",
	// NAD 1983 HARN StatePlane Alabama East FIPS 0101
	"102229": "+proj=tmerc +lat_0=30.5 +lon_0=-85.83333333333333 +k=0.999960 +x_0=200000 +y_0=0 +ellps=GRS80 +units=m +no_defs",
	// NAD 1983 HARN StatePlane Alabama West FIPS 0102
	"102230": "+proj=tmerc +lat_0=30 +lon_0=-87.5 +k=0.999933 +x_0=600000 +y_0=0 +ellps=GRS80 +units=m +no_defs",
	// NAD 1983 HARN StatePlane California I FIPS 0401
	"102241": "+proj=lcc +lat_1=40 +lat_2=41.66666666666666 +lat_0=39.33333333333334 +lon_0=-122 +x_0=2000000 +y_0=500000 +ellps=GRS80 +units=m +no_defs",
	// NAD 1983 HARN StatePlane California II FIPS 0402
	"102242": "+proj=lcc +lat_1=38.33333333333334 +lat_2=39.83333333333334 +lat_0=37.66666666666666 +lon_0=-122 +x_0=2000000 +y_0=500000 +ellps=GRS80 +units=m +no_defs",
	// NAD 1983 HARN StatePlane California III FIPS 0403
	"102243": "+proj=lcc +lat_1=37.06666666666667 +lat_2=38.43333333333333 +lat_0=36.5 +lon_0=-120.5 +x_0=2000000 +y_0=500000 +ellps=GRS80 +units=m +no_defs",
	// NAD 1983 HARN StatePlane California IV FIPS 0404
	"102244": "+proj=lcc +lat_1=36 +lat_2=37.25 +lat_0=35.33333333333334 +lon_0=-119 +x_0=2000000 +y_0=500000 +ellps=GRS80 +units=m +no_defs",
	// NAD 1983 HARN StatePlane California V FIPS 0405
	"102245": "+proj=lcc +lat_1=34.03333333333333 +lat_2=35.46666666666667 +lat_0=33.5 +lon_0=-118 +x_0=2000000 +y_0=500000 +ellps=GRS80 +units=m +no_defs",
	// NAD 1983 HARN StatePlane California VI FIPS 0406
	"102246": "+proj=lcc +lat_1=32.78333333333333 +lat_2=33.88333333333333 +lat_0=32.16666666666666 +lon_0=-116.25 +x_0=2000000 +y_0=500000 +ellps=GRS80 +units=m +no_defs",
	// NAD 1983 HARN StatePlane Arizona East FIPS 0201
	"102248": "+proj=tmerc +lat_0=31 +lon_0=-110.1666666666667 +k=0.999900 +x_0=213360 +y_0=0 +ellps=GRS80 +units=m +no_defs",
	// NAD 1983 HARN StatePlane Arizona Central FIPS 0202
	"102249": "+proj=tmerc +lat_0=31 +lon_0=-111.9166666666667 +k=0.999900 +x_0=213360 +y_0=0 +ellps=GRS80 +units=m +no_defs",
	// NAD 1983 HARN StatePlane Arizona West FIPS 0203
	"102250": "+proj=tmerc +lat_0=31 +lon_0=-113.75 +k=0.999933 +x_0=213360 +y_0=0 +ellps=GRS80 +units=m +no_defs",
	// NAD 1983 HARN StatePlane Arkansas North FIPS 0301
	"102251": "+proj=lcc +lat_1=34.93333333333333 +lat_2=36.23333333333333 +lat_0=34.33333333333334 +lon_0=-92 +x_0=400000 +y_0=0 +ellps=GRS80 +units=m +no_defs",
	// NAD 1983 HARN StatePlane Arkansas South FIPS 0302
	"102252": "+proj=lcc +lat_1=33.3 +lat_2=34.76666666666667 +lat_0=32.66666666666666 +lon_0=-92 +x_0=400000 +y_0=400000 +ellps=GRS80 +units=m +no_defs",
	// NAD 1983 HARN StatePlane Colorado North FIPS 0501
	"102253": "+proj=lcc +lat_1=39.71666666666667 +lat_2=40.78333333333333 +lat_0=39.33333333333334 +lon_0=-105.5 +x_0=914401.8289 +y_0=304800.6096 +ellps=GRS80 +units=m +no_defs",
	// NAD 1983 HARN StatePlane Colorado Central FIPS 0502
	"102254": "+proj=lcc +lat_1=38.45 +lat_2=39.75 +lat_0=37.83333333333334 +lon_0=-105.5 +x_0=914401.8289 +y_0=304800.6096 +ellps=GRS80 +units=m +no_defs",
	// NAD 1983 HARN StatePlane Colorado South FIPS 0503
	"102255": "+proj=lcc +lat_1=37.23333333333333 +lat_2=38.43333333333333 +lat_0=36.66666666666666 +lon_0=-105.5 +x_0=914401.8289 +y_0=304800.6096 +ellps=GRS80 +units=m +no_defs",
	// NAD 1983 HARN StatePlane Connecticut FIPS 0600
	"102256": "+proj=lcc +lat_1=41.2 +lat_2=41.86666666666667 +lat_0=40.83333333333334 +lon_0=-72.75 +x_0=304800.6096 +y_0=152400.3048 +ellps=GRS80 +units=m +no_defs",
	// NAD 1983 HARN StatePlane Delaware FIPS 0700
	"102257": "+proj=tmerc +lat_0=38 +lon_0=-75.41666666666667 +k=0.999995 +x_0=200000 +y_0=0 +ellps=GRS80 +units=m +no_defs",
	// NAD 1983 HARN StatePlane Florida East FIPS 0901
	"102258": "+proj=tmerc +lat_0=24.33333333333333 +lon_0=-81 +k=0.999941 +x_0=200000 +y_0=0 +ellps=GRS80 +units=m +no_defs",
	// NAD 1983 HARN StatePlane Florida West FIPS 0902
	"102259": "+proj=tmerc +lat_0=24.33333333333333 +lon_0=-82 +k=0.999941 +x_0=200000 +y_0=0 +ellps=GRS80 +units=m +no_defs",
	// NAD 1983 HARN StatePlane Florida North FIPS 0903
	"102260": "+proj=lcc +lat_1=29.58333333333333 +lat_2=30.75 +lat_0=29 +lon_0=-84.5 +x_0=600000 +y_0=0 +ellps=GRS80 +units=m +no_defs",
	// NAD 1983 HARN StatePlane Hawaii 1 FIPS 5101
	"102261": "+proj=tmerc +lat_0=18.83333333333333 +lon_0=-155.5 +k=0.999967 +x_0=500000 +y_0=0 +ellps=GRS80 +units=m +no_defs",
	// NAD 1983 HARN StatePlane Hawaii 2 FIPS 5102
	"102262": "+proj=tmerc +lat_0=20.33333333333333 +lon_0=-156.6666666666667 +k=0.999967 +x_0=500000 +y_0=0 +ellps=GRS80 +units=m +no_defs",
	// NAD 1983 HARN StatePlane Hawaii 3 FIPS 5103
	"102263": "+proj=tmerc +lat_0=21.16666666666667 +lon_0=-158 +k=0.999990 +x_0=500000 +y_0=0 +ellps=GRS80 +units=m +no_defs",
	// NAD 1983 HARN StatePlane Hawaii 4 FIPS 5104
	"102264": "+proj=tmerc +lat_0=21.83333333333333 +lon_0=-159.5 +k=0.999990 +x_0=500000 +y_0=0 +ellps=GRS80 +units=m +no_defs",
	// NAD 1983 HARN StatePlane Hawaii 5 FIPS 5105
	"102265": "+proj=tmerc +lat_0=21.66666666666667 +lon_0=-160.1666666666667 +k=1.000000 +x_0=500000 +y_0=0 +ellps=GRS80 +units=m +no_defs",
	// NAD 1983 HARN StatePlane Georgia East FIPS 1001
	"102266": "+proj=tmerc +lat_0=30 +lon_0=-82.16666666666667 +k=0.999900 +x_0=200000 +y_0=0 +ellps=GRS80 +units=m +no_defs",
	// NAD 1983 HARN StatePlane Georgia West FIPS 1002
	"102267": "+proj=tmerc +lat_0=30 +lon_0=-84.16666666666667 +k=0.999900 +x_0=700000 +y_0=0 +ellps=GRS80 +units=m +no_defs",
	// NAD 1983 HARN StatePlane Idaho East FIPS 1101
	"102268": "+proj=tmerc +lat_0=41.66666666666666 +lon_0=-112.1666666666667 +k=0.999947 +x_0=200000 +y_0=0 +ellps=GRS80 +units=m +no_defs",
	// NAD 1983 HARN StatePlane Idaho Central FIPS 1102
	"102269": "+proj=tmerc +lat_0=41.66666666666666 +lon_0=-114 +k=0.999947 +x_0=500000 +y_0=0 +ellps=GRS80 +units=m +no_defs",
	// NAD 1983 HARN StatePlane Idaho West FIPS 1103
	"102270": "+proj=tmerc +lat_0=41.66666666666666 +lon_0=-115.75 +k=0.999933 +x_0=800000 +y_0=0 +ellps=GRS80 +units=m +no_defs",
	// NAD 1983 HARN StatePlane Illinois East FIPS 1201
	"102271": "+proj=tmerc +lat_0=36.66666666666666 +lon_0=-88.33333333333333 +k=0.999975 +x_0=300000 +y_0=0 +ellps=GRS80 +units=m +no_defs",
	// NAD 1983 HARN StatePlane Illinois West FIPS 1202
	"102272": "+proj=tmerc +lat_0=36.66666666666666 +lon_0=-90.16666666666667 +k=0.999941 +x_0=700000 +y_0=0 +ellps=GRS80 +units=m +no_defs",
	// NAD 1983 HARN StatePlane Indiana East FIPS 1301
	"102273": "+proj=tmerc +lat_0=37.5 +lon_0=-85.66666666666667 +k=0.999967 +x_0=100000 +y_0=250000 +ellps=GRS80 +units=m +no_defs",
	// NAD 1983 HARN StatePlane Indiana West FIPS 1302
	"102274": "+proj=tmerc +lat_0=37.5 +lon_0=-87.08333333333333 +k=0.999967 +x_0=900000 +y_0=250000 +ellps=GRS80 +units=m +no_defs",
	// NAD 1983 HARN StatePlane Kansas North FIPS 1501
	"102277": "+proj=lcc +lat_1=38.71666666666667 +lat_2=39.78333333333333 +lat_0=38.33333333333334 +lon_0=-98 +x_0=400000 +y_0=0 +ellps=GRS80 +units=m +no_defs",
	// NAD 1983 HARN StatePlane Kansas South FIPS 1502
	"102278": "+proj=lcc +lat_1=37.26666666666667 +lat_2=38.56666666666667 +lat_0=36.66666666666666 +lon_0=-98.5 +x_0=400000 +y_0=400000 +ellps=GRS80 +units=m +no_defs",
	// NAD 1983 HARN StatePlane Kentucky North FIPS 1601
	"102279": "+proj=lcc +lat_1=37.96666666666667 +lat_2=38.96666666666667 +lat_0=37.5 +lon_0=-84.25 +x_0=500000 +y_0=0 +ellps=GRS80 +units=m +no_defs",
	// NAD 1983 HARN StatePlane Kentucky South FIPS 1602
	"102280": "+proj=lcc +lat_1=36.73333333333333 +lat_2=37.93333333333333 +lat_0=36.33333333333334 +lon_0=-85.75 +x_0=500000 +y_0=500000 +ellps=GRS80 +units=m +no_defs",
	// NAD 1983 HARN StatePlane Louisiana North FIPS 1701
	"102281": "+proj=lcc +lat_1=31.16666666666667 +lat_2=32.66666666666666 +lat_0=30.5 +lon_0=-92.5 +x_0=1000000 +y_0=0 +ellps=GRS80 +units=m +no_defs",
	// NAD 1983 HARN StatePlane Louisiana South FIPS 1702
	"102282": "+proj=lcc +lat_1=29.3 +lat_2=30.7 +lat_0=28.5 +lon_0=-91.33333333333333 +x_0=1000000 +y_0=0 +ellps=GRS80 +units=m +no_defs",
	// NAD 1983 HARN StatePlane Maine East FIPS 1801
	"102283": "+proj=tmerc +lat_0=43.66666666666666 +lon_0=-68.5 +k=0.999900 +x_0=300000 +y_0=0 +ellps=GRS80 +units=m +no_defs",
	// NAD 1983 HARN StatePlane Maine West FIPS 1802
	"102284": "+proj=tmerc +lat_0=42.83333333333334 +lon_0=-70.16666666666667 +k=0.999967 +x_0=900000 +y_0=0 +ellps=GRS80 +units=m +no_defs",
	// NAD 1983 HARN StatePlane Maryland FIPS 1900
	"102285": "+proj=lcc +lat_1=38.3 +lat_2=39.45 +lat_0=37.66666666666666 +lon_0=-77 +x_0=400000 +y_0=0 +ellps=GRS80 +units=m +no_defs",
	// NAD 1983 HARN StatePlane Massachusetts Mainland FIPS 2001
	"102286": "+proj=lcc +lat_1=41.71666666666667 +lat_2=42.68333333333333 +lat_0=41 +lon_0=-71.5 +x_0=200000 +y_0=750000 +ellps=GRS80 +units=m +no_defs",
	// NAD 1983 HARN StatePlane Massachusetts Island FIPS 2002
	"102287": "+proj=lcc +lat_1=41.28333333333333 +lat_2=41.48333333333333 +lat_0=41 +lon_0=-70.5 +x_0=500000 +y_0=0 +ellps=GRS80 +units=m +no_defs",
	// NAD 1983 HARN StatePlane Michigan North FIPS 2111
	"102288": "+proj=lcc +lat_1=45.48333333333333 +lat_2=47.08333333333334 +lat_0=44.78333333333333 +lon_0=-87 +x_0=8000000 +y_0=0 +ellps=GRS80 +units=m +no_defs",
	// NAD 1983 HARN StatePlane Michigan Central FIPS 2112
	"102289": "+proj=lcc +lat_1=44.18333333333333 +lat_2=45.7 +lat_0=43.31666666666667 +lon_0=-84.36666666666666 +x_0=6000000 +y_0=0 +ellps=GRS80 +units=m +no_defs",
	// NAD 1983 HARN StatePlane Michigan South FIPS 2113
	"102290": "+proj=lcc +lat_1=42.1 +lat_2=43.66666666666666 +lat_0=41.5 +lon_0=-84.36666666666666 +x_0=4000000 +y_0=0 +ellps=GRS80 +units=m +no_defs",
	// NAD 1983 HARN StatePlane Minnesota North FIPS 2201
	"102291": "+proj=lcc +lat_1=47.03333333333333 +lat_2=48.63333333333333 +lat_0=46.5 +lon_0=-93.09999999999999 +x_0=800000 +y_0=100000 +ellps=GRS80 +units=m +no_defs",
	// NAD 1983 HARN StatePlane Minnesota Central FIPS 2202
	"102292": "+proj=lcc +lat_1=45.61666666666667 +lat_2=47.05 +lat_0=45 +lon_0=-94.25 +x_0=800000 +y_0=100000 +ellps=GRS80 +units=m +no_defs",
	// NAD 1983 HARN StatePlane Minnesota South FIPS 2203
	"102293": "+proj=lcc +lat_1=43.78333333333333 +lat_2=45.21666666666667 +lat_0=43 +lon_0=-94 +x_0=800000 +y_0=100000 +ellps=GRS80 +units=m +no_defs",
	// NAD 1983 HARN StatePlane Mississippi East FIPS 2301
	"102294": "+proj=tmerc +lat_0=29.5 +lon_0=-88.83333333333333 +k=0.999950 +x_0=300000 +y_0=0 +ellps=GRS80 +units=m +no_defs",
	// NAD 1983 HARN StatePlane Mississippi West FIPS 2302
	"102295": "+proj=tmerc +lat_0=29.5 +lon_0=-90.33333333333333 +k=0.999950 +x_0=700000 +y_0=0 +ellps=GRS80 +units=m +no_defs",
	// NAD 1983 HARN StatePlane Missouri East FIPS 2401
	"102296": "+proj=tmerc +lat_0=35.83333333333334 +lon_0=-90.5 +k=0.999933 +x_0=250000 +y_0=0 +ellps=GRS80 +units=m +no_defs",
	// NAD 1983 HARN StatePlane Missouri Central FIPS 2402
	"102297": "+proj=tmerc +lat_0=35.83333333333334 +lon_0=-92.5 +k=0.999933 +x_0=500000 +y_0=0 +ellps=GRS80 +units=m +no_defs",
	// NAD 1983 HARN StatePlane Missouri West FIPS 2403
	"102298": "+proj=tmerc +lat_0=36.16666666666666 +lon_0=-94.5 +k=0.999941 +x_0=850000 +y_0=0 +ellps=GRS80 +units=m +no_defs",
	// NAD 1983 HARN StatePlane Montana FIPS 2500
	"102300": "+proj=lcc +lat_1=45 +lat_2=49 +lat_0=44.25 +lon_0=-109.5 +x_0=600000 +y_0=0 +ellps=GRS80 +units=m +no_defs",
	// NAD 1983 HARN StatePlane Nebraska FIPS 2600
	"102304": "+proj=lcc +lat_1=40 +lat_2=43 +lat_0=39.83333333333334 +lon_0=-100 +x_0=500000 +y_0=0 +ellps=GRS80 +units=m +no_defs",
	// NAD 1983 HARN StatePlane Nevada East FIPS 2701
	"102307": "+proj=tmerc +lat_0=34.75 +lon_0=-115.5833333333333 +k=0.999900 +x_0=200000 +y_0=8000000 +ellps=GRS80 +units=m +no_defs",
	// NAD 1983 HARN StatePlane Nevada Central FIPS 2702
	"102308": "+proj=tmerc +lat_0=34.75 +lon_0=-116.6666666666667 +k=0.999900 +x_0=500000 +y_0=6000000 +ellps=GRS80 +units=m +no_defs",
	// NAD 1983 HARN StatePlane Nevada West FIPS 2703
	"102309": "+proj=tmerc +lat_0=34.75 +lon_0=-118.5833333333333 +k=0.999900 +x_0=800000 +y_0=4000000 +ellps=GRS80 +units=m +no_defs",
	// NAD 1983 HARN StatePlane New Hampshire FIPS 2800
	"102310": "+proj=tmerc +lat_0=42.5 +lon_0=-71.66666666666667 +k=0.999967 +x_0=300000 +y_0=0 +ellps=GRS80 +units=m +no_defs",
	// NAD 1983 HARN StatePlane New Jersey FIPS 2900
	"102311": "+proj=tmerc +lat_0=38.83333333333334 +lon_0=-74.5 +k=0.999900 +x_0=150000 +y_0=0 +ellps=GRS80 +units=m +no_defs",
	// NAD 1983 HARN StatePlane New Mexico East FIPS 3001
	"102312": "+proj=tmerc +lat_0=31 +lon_0=-104.3333333333333 +k=0.999909 +x_0=165000 +y_0=0 +ellps=GRS80 +units=m +no_defs",
	// NAD 1983 HARN StatePlane New Mexico Central FIPS 3002
	"102313": "+proj=tmerc +lat_0=31 +lon_0=-106.25 +k=0.999900 +x_0=500000 +y_0=0 +ellps=GRS80 +units=m +no_defs",
	// NAD 1983 HARN StatePlane New Mexico West FIPS 3003
	"102314": "+proj=tmerc +lat_0=31 +lon_0=-107.8333333333333 +k=0.999917 +x_0=830000 +y_0=0 +ellps=GRS80 +units=m +no_defs",
	// NAD 1983 HARN StatePlane New York East FIPS 3101
	"102315": "+proj=tmerc +lat_0=38.83333333333334 +lon_0=-74.5 +k=0.999900 +x_0=150000 +y_0=0 +ellps=GRS80 +units=m +no_defs",
	// NAD 1983 HARN StatePlane New York Central FIPS 3102
	"102316": "+proj=tmerc +lat_0=40 +lon_0=-76.58333333333333 +k=0.999938 +x_0=250000 +y_0=0 +ellps=GRS80 +units=m +no_defs",
	// NAD 1983 HARN StatePlane New York West FIPS 3103
	"102317": "+proj=tmerc +lat_0=40 +lon_0=-78.58333333333333 +k=0.999938 +x_0=350000 +y_0=0 +ellps=GRS80 +units=m +no_defs",
	// NAD 1983 HARN StatePlane New York Long Island FIPS 3104
	"102318": "+proj=lcc +lat_1=40.66666666666666 +lat_2=41.03333333333333 +lat_0=40.16666666666666 +lon_0=-74 +x_0=300000 +y_0=0 +ellps=GRS80 +units=m +no_defs",
	// NAD 1983 HARN StatePlane North Dakota North FIPS 3301
	"102320": "+proj=lcc +lat_1=47.43333333333333 +lat_2=48.73333333333333 +lat_0=47 +lon_0=-100.5 +x_0=600000 +y_0=0 +ellps=GRS80 +units=m +no_defs",
	// NAD 1983 HARN StatePlane North Dakota South FIPS 3302
	"102321": "+proj=lcc +lat_1=46.18333333333333 +lat_2=47.48333333333333 +lat_0=45.66666666666666 +lon_0=-100.5 +x_0=600000 +y_0=0 +ellps=GRS80 +units=m +no_defs",
	// NAD 1983 HARN StatePlane Ohio North FIPS 3401
	"102322": "+proj=lcc +lat_1=40.43333333333333 +lat_2=41.7 +lat_0=39.66666666666666 +lon_0=-82.5 +x_0=600000 +y_0=0 +ellps=GRS80 +units=m +no_defs",
	// NAD 1983 HARN StatePlane Ohio South FIPS 3402
	"102323": "+proj=lcc +lat_1=38.73333333333333 +lat_2=40.03333333333333 +lat_0=38 +lon_0=-82.5 +x_0=600000 +y_0=0 +ellps=GRS80 +units=m +no_defs",
	// NAD 1983 HARN StatePlane Oklahoma North FIPS 3501
	"102324": "+proj=lcc +lat_1=35.56666666666667 +lat_2=36.76666666666667 +lat_0=35 +lon_0=-98 +x_0=600000 +y_0=0 +ellps=GRS80 +units=m +no_defs",
	// NAD 1983 HARN StatePlane Oklahoma South FIPS 3502
	"102325": "+proj=lcc +lat_1=33.93333333333333 +lat_2=35.23333333333333 +lat_0=33.33333333333334 +lon_0=-98 +x_0=600000 +y_0=0 +ellps=GRS80 +units=m +no_defs",
	// NAD 1983 HARN StatePlane Oregon North FIPS 3601
	"102326": "+proj=lcc +lat_1=44.33333333333334 +lat_2=46 +lat_0=43.66666666666666 +lon_0=-120.5 +x_0=2500000 +y_0=0 +ellps=GRS80 +units=m +no_defs",
	// NAD 1983 HARN StatePlane Oregon South FIPS 3602
	"102327": "+proj=lcc +lat_1=42.33333333333334 +lat_2=44 +lat_0=41.66666666666666 +lon_0=-120.5 +x_0=1500000 +y_0=0 +ellps=GRS80 +units=m +no_defs",
	// NAD 1983 HARN StatePlane Rhode Island FIPS 3800
	"102330": "+proj=tmerc +lat_0=41.08333333333334 +lon_0=-71.5 +k=0.999994 +x_0=100000 +y_0=0 +ellps=GRS80 +units=m +no_defs",
	// NAD 1983 HARN StatePlane South Dakota North FIPS 4001
	"102334": "+proj=lcc +lat_1=44.41666666666666 +lat_2=45.68333333333333 +lat_0=43.83333333333334 +lon_0=-100 +x_0=600000 +y_0=0 +ellps=GRS80 +units=m +no_defs",
	// NAD 1983 HARN StatePlane South Dakota South FIPS 4002
	"102335": "+proj=lcc +lat_1=42.83333333333334 +lat_2=44.4 +lat_0=42.33333333333334 +lon_0=-100.3333333333333 +x_0=600000 +y_0=0 +ellps=GRS80 +units=m +no_defs",
	// NAD 1983 HARN StatePlane Tennessee FIPS 4100
	"102336": "+proj=lcc +lat_1=35.25 +lat_2=36.41666666666666 +lat_0=34.33333333333334 +lon_0=-86 +x_0=600000 +y_0=0 +ellps=GRS80 +units=m +no_defs",
	// NAD 1983 HARN StatePlane Texas North FIPS 4201
	"102337": "+proj=lcc +lat_1=34.65 +lat_2=36.18333333333333 +lat_0=34 +lon_0=-101.5 +x_0=200000 +y_0=1000000 +ellps=GRS80 +units=m +no_defs",
	// NAD 1983 HARN StatePlane Texas North Central FIPS 4202
	"102338": "+proj=lcc +lat_1=32.13333333333333 +lat_2=33.96666666666667 +lat_0=31.66666666666667 +lon_0=-98.5 +x_0=600000 +y_0=2000000 +ellps=GRS80 +units=m +no_defs",
	// NAD 1983 HARN StatePlane Texas Central FIPS 4203
	"102339": "+proj=lcc +lat_1=30.11666666666667 +lat_2=31.88333333333333 +lat_0=29.66666666666667 +lon_0=-100.3333333333333 +x_0=700000 +y_0=3000000 +ellps=GRS80 +units=m +no_defs",
	// NAD 1983 HARN StatePlane Texas South Central FIPS 4204
	"102340": "+proj=lcc +lat_1=28.38333333333333 +lat_2=30.28333333333334 +lat_0=27.83333333333333 +lon_0=-99 +x_0=600000 +y_0=4000000 +ellps=GRS80 +units=m +no_defs",
	// NAD 1983 HARN StatePlane Texas South FIPS 4205
	"102341": "+proj=lcc +lat_1=26.16666666666667 +lat_2=27.83333333333333 +lat_0=25.66666666666667 +lon_0=-98.5 +x_0=300000 +y_0=5000000 +ellps=GRS80 +units=m +no_defs",
	// NAD 1983 HARN StatePlane Utah North FIPS 4301
	"102342": "+proj=lcc +lat_1=40.71666666666667 +lat_2=41.78333333333333 +lat_0=40.33333333333334 +lon_0=-111.5 +x_0=500000 +y_0=1000000 +ellps=GRS80 +units=m +no_defs",
	// NAD 1983 HARN StatePlane Utah Central FIPS 4302
	"102343": "+proj=lcc +lat_1=39.01666666666667 +lat_2=40.65 +lat_0=38.33333333333334 +lon_0=-111.5 +x_0=500000 +y_0=2000000 +ellps=GRS80 +units=m +no_defs",
	// NAD 1983 HARN StatePlane Utah South FIPS 4303
	"102344": "+proj=lcc +lat_1=37.21666666666667 +lat_2=38.35 +lat_0=36.66666666666666 +lon_0=-111.5 +x_0=500000 +y_0=3000000 +ellps=GRS80 +units=m +no_defs",
	// NAD 1983 HARN StatePlane Vermont FIPS 4400
	"102345": "+proj=tmerc +lat_0=42.5 +lon_0=-72.5 +k=0.999964 +x_0=500000 +y_0=0 +ellps=GRS80 +units=m +no_defs",
	// NAD 1983 HARN StatePlane Virginia North FIPS 4501
	"102346": "+proj=lcc +lat_1=38.03333333333333 +lat_2=39.2 +lat_0=37.66666666666666 +lon_0=-78.5 +x_0=3500000 +y_0=2000000 +ellps=GRS80 +units=m +no_defs",
	// NAD 1983 HARN StatePlane Virginia South FIPS 4502
	"102347": "+proj=lcc +lat_1=36.76666666666667 +lat_2=37.96666666666667 +lat_0=36.33333333333334 +lon_0=-78.5 +x_0=3500000 +y_0=1000000 +ellps=GRS80 +units=m +no_defs",
	// NAD 1983 HARN StatePlane Washington North FIPS 4601
	"102348": "+proj=lcc +lat_1=47.5 +lat_2=48.73333333333333 +lat_0=47 +lon_0=-120.8333333333333 +x_0=500000 +y_0=0 +ellps=GRS80 +units=m +no_defs",
	// NAD 1983 HARN StatePlane Washington South FIPS 4602
	"102349": "+proj=lcc +lat_1=45.83333333333334 +lat_2=47.33333333333334 +lat_0=45.33333333333334 +lon_0=-120.5 +x_0=500000 +y_0=0 +ellps=GRS80 +units=m +no_defs",
	// NAD 1983 HARN StatePlane West Virginia North FIPS 4701
	"102350": "+proj=lcc +lat_1=39 +lat_2=40.25 +lat_0=38.5 +lon_0=-79.5 +x_0=600000 +y_0=0 +ellps=GRS80 +units=m +no_defs",
	// NAD 1983 HARN StatePlane West Virginia South FIPS 4702
	"102351": "+proj=lcc +lat_1=37.48333333333333 +lat_2=38.88333333333333 +lat_0=37 +lon_0=-81 +x_0=600000 +y_0=0 +ellps=GRS80 +units=m +no_defs",
	// NAD 1983 HARN StatePlane Wisconsin North FIPS 4801
	"102352": "+proj=lcc +lat_1=45.56666666666667 +lat_2=46.76666666666667 +lat_0=45.16666666666666 +lon_0=-90 +x_0=600000 +y_0=0 +ellps=GRS80 +units=m +no_defs",
	// NAD 1983 HARN StatePlane Wisconsin Central FIPS 4802
	"102353": "+proj=lcc +lat_1=44.25 +lat_2=45.5 +lat_0=43.83333333333334 +lon_0=-90 +x_0=600000 +y_0=0 +ellps=GRS80 +units=m +no_defs",
	// NAD 1983 HARN StatePlane Wisconsin South FIPS 4803
	"102354": "+proj=lcc +lat_1=42.73333333333333 +lat_2=44.06666666666667 +lat_0=42 +lon_0=-90 +x_0=600000 +y_0=0 +ellps=GRS80 +units=m +no_defs",
	// NAD 1983 HARN StatePlane Wyoming East FIPS 4901
	"102355": "+proj=tmerc +lat_0=40.5 +lon_0=-105.1666666666667 +k=0.999938 +x_0=200000 +y_0=0 +ellps=GRS80 +units=m +no_defs",
	// NAD 1983 HARN StatePlane Wyoming East Central FIPS 4902
	"102356": "+proj=tmerc +lat_0=40.5 +lon_0=-107.3333333333333 +k=0.999938 +x_0=400000 +y_0=100000 +ellps=GRS80 +units=m +no_defs",
	// NAD 1983 HARN StatePlane Wyoming West Central FIPS 4903
	"102357": "+proj=tmerc +lat_0=40.5 +lon_0=-108.75 +k=0.999938 +x_0=600000 +y_0=0 +ellps=GRS80 +units=m +no_defs",
	// NAD 1983 HARN StatePlane Wyoming West FIPS 4904
	"102358": "+proj=tmerc +lat_0=40.5 +lon_0=-110.0833333333333 +k=0.999938 +x_0=800000 +y_0=100000 +ellps=GRS80 +units=m +no_defs",
	// NAD 1983 HARN StatePlane Puerto Rico Virgin Islands FIPS 5200
	"102361": "+proj=lcc +lat_1=18.03333333333334 +lat_2=18.43333333333333 +lat_0=17.83333333333333 +lon_0=-66.43333333333334 +x_0=200000 +y_0=200000 +ellps=GRS80 +units=m +no_defs",
	// Nord Algerie Ancienne Degree
	"102491": "+proj=lcc +lat_1=36 +lat_0=36 +lon_0=2.7 +k_0=0.999625544 +x_0=500000 +y_0=300000 +a=6378249.2 +b=6356514.999904194 +units=m +no_defs",
	// Sud Algerie Ancienne Degree
	"102492": "+proj=lcc +lat_1=33.3 +lat_0=33.3 +lon_0=2.7 +k_0=0.999625769 +x_0=500000 +y_0=300000 +a=6378249.2 +b=6356514.999904194 +units=m +no_defs",
	// NTF France I degrees
	"102581": "+proj=lcc +lat_1=49.5 +lat_0=49.5 +lon_0=2.337229166666667 +k_0=0.999877341 +x_0=600000 +y_0=1200000 +a=6378249.2 +b=6356514.999904194 +units=m +no_defs",
	// NTF France II degrees
	"102582": "+proj=lcc +lat_1=46.8 +lat_0=46.8 +lon_0=2.337229166666667 +k_0=0.99987742 +x_0=600000 +y_0=2200000 +a=6378249.2 +b=6356514.999904194 +units=m +no_defs",
	// NTF France III degrees
	"102583": "+proj=lcc +lat_1=44.1 +lat_0=44.1 +lon_0=2.337229166666667 +k_0=0.999877499 +x_0=600000 +y_0=3200000 +a=6378249.2 +b=6356514.999904194 +units=m +no_defs",
	// NTF France IV degrees
	"102584": "+proj=lcc +lat_1=42.165 +lat_0=42.165 +lon_0=2.337229166666667 +k_0=0.99994471 +x_0=234.358 +y_0=4185861.369 +a=6378249.2 +b=6356514.999904194 +units=m +no_defs",
	// Nord Algerie Degree
	"102591": "+proj=lcc +lat_1=36 +lat_0=36 +lon_0=2.7 +k_0=0.999625544 +x_0=500135 +y_0=300090 +ellps=clrk80 +units=m +no_defs",
	// Sud Algerie Degree
	"102592": "+proj=lcc +lat_1=33.3 +lat_0=33.3 +lon_0=2.7 +k_0=0.999625769 +x_0=500135 +y_0=300090 +ellps=clrk80 +units=m +no_defs",
	// NAD 1983 StatePlane Alabama East FIPS 0101 Feet
	"102629": "+proj=tmerc +lat_0=30.5 +lon_0=-85.83333333333333 +k=0.999960 +x_0=200000 +y_0=0 +ellps=GRS80 +datum=NAD83 +to_meter=0.3048006096012192 +no_defs",
	// NAD 1983 StatePlane Alabama West FIPS 0102 Feet
	"102630": "+proj=tmerc +lat_0=30 +lon_0=-87.5 +k=0.999933 +x_0=600000.0000000001 +y_0=0 +ellps=GRS80 +datum=NAD83 +to_meter=0.3048006096012192 +no_defs",
	// NAD 1983 StatePlane Alaska 1 FIPS 5001 Feet
	"102631": "+proj=omerc +lat_0=57 +lonc=-133.6666666666667 +alpha=-36.86989764583333 +k=0.9999 +x_0=4999999.999999999 +y_0=-4999999.999999999 +ellps=GRS80 +datum=NAD83 +to_meter=0.3048006096012192 +no_defs",
	// NAD 1983 StatePlane Alaska 2 FIPS 5002 Feet
	"102632": "+proj=tmerc +lat_0=54 +lon_0=-142 +k=0.999900 +x_0=500000.0000000002 +y_0=0 +ellps=GRS80 +datum=NAD83 +to_meter=0.3048006096012192 +no_defs",
	// NAD 1983 StatePlane Alaska 3 FIPS 5003 Feet
	"102633": "+proj=tmerc +lat_0=54 +lon_0=-146 +k=0.999900 +x_0=500000.0000000002 +y_0=0 +ellps=GRS80 +datum=NAD83 +to_meter=0.3048006096012192 +no_defs",
	// NAD 1983 StatePlane Alaska 4 FIPS 5004 Feet
	"102634": "+proj=tmerc +lat_0=54 +lon_0=-150 +k=0.999900 +x_0=500000.0000000002 +y_0=0 +ellps=GRS80 +datum=NAD83 +to_meter=0.3048006096012192 +no_defs",
	// NAD 1983 StatePlane Alaska 5 FIPS 5005 Feet
	"102635": "+proj=tmerc +lat_0=54 +lon_0=-154 +k=0.999900 +x_0=500000.0000000002 +y_0=0 +ellps=GRS80 +datum=NAD83 +to_meter=0.3048006096012192 +no_defs",
	// NAD 1983 StatePlane Alaska 6 FIPS 5006 Feet
	"102636": "+proj=tmerc +lat_0=54 +lon_0=-158 +k=0.999900 +x_0=500000.0000000002 +y_0=0 +ellps=GRS80 +datum=NAD83 +to_meter=0.3048006096012192 +no_defs",
	// NAD 1983 StatePlane Alaska 7 FIPS 5007 Feet
	"102637": "+proj=tmerc +lat_0=54 +lon_0=-162 +k=0.999900 +x_0=500000.0000000002 +y_0=0 +ellps=GRS80 +datum=NAD83 +to_meter=0.3048006096012192 +no_defs",
	// NAD 1983 StatePlane Alaska 8 FIPS 5008 Feet
	"102638": "+proj=tmerc +lat_0=54 +lon_0=-166 +k=0.999900 +x_0=500000.0000000002 +y_0=0 +ellps=GRS80 +datum=NAD83 +to_meter=0.3048006096012192 +no_defs",
	// NAD 1983 StatePlane Alaska 9 FIPS 5009 Feet
	"102639": "+proj=tmerc +lat_0=54 +lon_0=-170 +k=0.999900 +x_0=500000.0000000002 +y_0=0 +ellps=GRS80 +datum=NAD83 +to_meter=0.3048006096012192 +no_defs",
	// NAD 1983 StatePlane Alaska 10 FIPS 5010 Feet
	"102640": "+proj=lcc +lat_1=51.83333333333334 +lat_2=53.83333333333334 +lat_0=51 +lon_0=-176 +x_0=1000000 +y_0=0 +ellps=GRS80 +datum=NAD83 +to_meter=0.3048006096012192 +no_defs",
	// NAD 1983 StatePlane California I FIPS 0401 Feet
	"102641": "+proj=lcc +lat_1=40 +lat_2=41.66666666666666 +lat_0=39.33333333333334 +lon_0=-122 +x_0=2000000 +y_0=500000.0000000002 +ellps=GRS80 +datum=NAD83 +to_meter=0.3048006096012192 +no_defs",
	// NAD 1983 StatePlane California II FIPS 0402 Feet
	"102642": "+proj=lcc +lat_1=38.33333333333334 +lat_2=39.83333333333334 +lat_0=37.66666666666666 +lon_0=-122 +x_0=2000000 +y_0=500000.0000000002 +ellps=GRS80 +datum=NAD83 +to_meter=0.3048006096012192 +no_defs",
	// NAD 1983 StatePlane California III FIPS 0403 Feet
	"102643": "+proj=lcc +lat_1=37.06666666666667 +lat_2=38.43333333333333 +lat_0=36.5 +lon_0=-120.5 +x_0=2000000 +y_0=500000.0000000002 +ellps=GRS80 +datum=NAD83 +to_meter=0.3048006096012192 +no_defs",
	// NAD 1983 StatePlane California IV FIPS 0404 Feet
	"102644": "+proj=lcc +lat_1=36 +lat_2=37.25 +lat_0=35.33333333333334 +lon_0=-119 +x_0=2000000 +y_0=500000.0000000002 +ellps=GRS80 +datum=NAD83 +to_meter=0.3048006096012192 +no_defs",
	// NAD 1983 StatePlane California V FIPS 0405 Feet
	"102645": "+proj=lcc +lat_1=34.03333333333333 +lat_2=35.46666666666667 +lat_0=33.5 +lon_0=-118 +x_0=2000000 +y_0=500000.0000000002 +ellps=GRS80 +datum=NAD83 +to_meter=0.3048006096012192 +no_defs",
	// NAD 1983 StatePlane California VI FIPS 0406 Feet
	"102646": "+proj=lcc +lat_1=32.78333333333333 +lat_2=33.88333333333333 +lat_0=32.16666666666666 +lon_0=-116.25 +x_0=2000000 +y_0=500000.0000000002 +ellps=GRS80 +datum=NAD83 +to_meter=0.3048006096012192 +no_defs",
	// NAD 1983 StatePlane Arizona East FIPS 0201 Feet
	"102648": "+proj=tmerc +lat_0=31 +lon_0=-110.1666666666667 +k=0.999900 +x_0=213360 +y_0=0 +ellps=GRS80 +datum=NAD83 +to_meter=0.3048006096012192 +no_defs",
	// NAD 1983 StatePlane Arizona Central FIPS 0202 Feet
	"102649": "+proj=tmerc +lat_0=31 +lon_0=-111.9166666666667 +k=0.999900 +x_0=213360 +y_0=0 +ellps=GRS80 +datum=NAD83 +to_meter=0.3048006096012192 +no_defs",
	// NAD 1983 StatePlane Arizona West FIPS 0203 Feet
	"102650": "+proj=tmerc +lat_0=31 +lon_0=-113.75 +k=0.999933 +x_0=213360 +y_0=0 +ellps=GRS80 +datum=NAD83 +to_meter=0.3048006096012192 +no_defs",
	// NAD 1983 StatePlane Arkansas North FIPS 0301 Feet
	"102651": "+proj=lcc +lat_1=34.93333333333333 +lat_2=36.23333333333333 +lat_0=34.33333333333334 +lon_0=-92 +x_0=399999.9999999999 +y_0=0 +ellps=GRS80 +datum=NAD83 +to_meter=0.3048006096012192 +no_defs",
	// NAD 1983 StatePlane Arkansas South FIPS 0302 Feet
	"102652": "+proj=lcc +lat_1=33.3 +lat_2=34.76666666666667 +lat_0=32.66666666666666 +lon_0=-92 +x_0=399999.9999999999 +y_0=399999.9999999999 +ellps=GRS80 +datum=NAD83 +to_meter=0.3048006096012192 +no_defs",
	// NAD 1983 StatePlane Colorado North FIPS 0501 Feet
	"102653": "+proj=lcc +lat_1=39.71666666666667 +lat_2=40.78333333333333 +lat_0=39.33333333333334 +lon_0=-105.5 +x_0=914401.8289 +y_0=304800.6096 +ellps=GRS80 +datum=NAD83 +to_meter=0.3048006096012192 +no_defs",
	// NAD 1983 StatePlane Colorado Central FIPS 0502 Feet
	"102654": "+proj=lcc +lat_1=38.45 +lat_2=39.75 +lat_0=37.83333333333334 +lon_0=-105.5 +x_0=914401.8289 +y_0=304800.6096 +ellps=GRS80 +datum=NAD83 +to_meter=0.3048006096012192 +no_defs",
	// NAD 1983 StatePlane Colorado South FIPS 0503 Feet
	"102655": "+proj=lcc +lat_1=37.23333333333333 +lat_2=38.43333333333333 +lat_0=36.66666666666666 +lon_0=-105.5 +x_0=914401.8289 +y_0=304800.6096 +ellps=GRS80 +datum=NAD83 +to_meter=0.3048006096012192 +no_defs",
	// NAD 1983 StatePlane Connecticut FIPS 0600 Feet
	"102656": "+proj=lcc +lat_1=41.2 +lat_2=41.86666666666667 +lat_0=40.83333333333334 +lon_0=-72.75 +x_0=304800.6096 +y_0=152400.3048 +ellps=GRS80 +datum=NAD83 +to_meter=0.3048006096012192 +no_defs",
	// NAD 1983 StatePlane Delaware FIPS 0700 Feet
	"102657": "+proj=tmerc +lat_0=38 +lon_0=-75.41666666666667 +k=0.999995 +x_0=200000 +y_0=0 +ellps=GRS80 +datum=NAD83 +to_meter=0.3048006096012192 +no_defs",
	// NAD 1983 StatePlane Florida East FIPS 0901 Feet
	"102658": "+proj=tmerc +lat_0=24.33333333333333 +lon_0=-81 +k=0.999941 +x_0=200000 +y_0=0 +ellps=GRS80 +datum=NAD83 +to_meter=0.3048006096012192 +no_defs",
	// NAD 1983 StatePlane Florida West FIPS 0902 Feet
	"102659": "+proj=tmerc +lat_0=24.33333333333333 +lon_0=-82 +k=0.999941 +x_0=200000 +y_0=0 +ellps=GRS80 +datum=NAD83 +to_meter=0.3048006096012192 +no_defs",
	// NAD 1983 StatePlane Florida North FIPS 0903 Feet
	"102660": "+proj=lcc +lat_1=29.58333333333333 +lat_2=30.75 +lat_0=29 +lon_0=-84.5 +x_0=600000.0000000001 +y_0=0 +ellps=GRS80 +datum=NAD83 +to_meter=0.3048006096012192 +no_defs",
	// NAD 1983 StatePlane Hawaii 1 FIPS 5101 Feet
	"102661": "+proj=tmerc +lat_0=18.83333333333333 +lon_0=-155.5 +k=0.999967 +x_0=500000.0000000002 +y_0=0 +ellps=GRS80 +datum=NAD83 +to_meter=0.3048006096012192 +no_defs",
	// NAD 1983 StatePlane Hawaii 2 FIPS 5102 Feet
	"102662": "+proj=tmerc +lat_0=20.33333333333333 +lon_0=-156.6666666666667 +k=0.999967 +x_0=500000.0000000002 +y_0=0 +ellps=GRS80 +datum=NAD83 +to_meter=0.3048006096012192 +no_defs",
	// NAD 1983 StatePlane Hawaii 3 FIPS 5103 Feet
	"102663": "+proj=tmerc +lat_0=21.16666666666667 +lon_0=-158 +k=0.999990 +x_0=500000.0000000002 +y_0=0 +ellps=GRS80 +datum=NAD83 +to_meter=0.3048006096012192 +no_defs",
	// NAD 1983 StatePlane Hawaii 4 FIPS 5104 Feet
	"102664": "+proj=tmerc +lat_0=21.83333333333333 +lon_0=-159.5 +k=0.999990 +x_0=500000.0000000002 +y_0=0 +ellps=GRS80 +datum=NAD83 +to_meter=0.3048006096012192 +no_defs",
	// NAD 1983 StatePlane Hawaii 5 FIPS 5105 Feet
	"102665": "+proj=tmerc +lat_0=21.66666666666667 +lon_0=-160.1666666666667 +k=1.000000 +x_0=500000.0000000002 +y_0=0 +ellps=GRS80 +datum=NAD83 +to_meter=0.3048006096012192 +no_defs",
	// NAD 1983 StatePlane Georgia East FIPS 1001 Feet
	"102666": "+proj=tmerc +lat_0=30 +lon_0=-82.16666666666667 +k=0.999900 +x_0=200000 +y_0=0 +ellps=GRS80 +datum=NAD83 +to_meter=0.3048006096012192 +no_defs",
	// NAD 1983 StatePlane Georgia West FIPS 1002 Feet
	"102667": "+proj=tmerc +lat_0=30 +lon_0=-84.16666666666667 +k=0.999900 +x_0=700000 +y_0=0 +ellps=GRS80 +datum=NAD83 +to_meter=0.3048006096012192 +no_defs",
	// NAD 1983 StatePlane Idaho East FIPS 1101 Feet
	"102668": "+proj=tmerc +lat_0=41.66666666666666 +lon_0=-112.1666666666667 +k=0.999947 +x_0=200000 +y_0=0 +ellps=GRS80 +datum=NAD83 +to_meter=0.3048006096012192 +no_defs",
	// NAD 1983 StatePlane Idaho Central FIPS 1102 Feet
	"102669": "+proj=tmerc +lat_0=41.66666666666666 +lon_0=-114 +k=0.999947 +x_0=500000.0000000002 +y_0=0 +ellps=GRS80 +datum=NAD83 +to_meter=0.3048006096012192 +no_defs",
	// NAD 1983 StatePlane Idaho West FIPS 1103 Feet
	"102670": "+proj=tmerc +lat_0=41.66666666666666 +lon_0=-115.75 +k=0.999933 +x_0=799999.9999999999 +y_0=0 +ellps=GRS80 +datum=NAD83 +to_meter=0.3048006096012192 +no_defs",
	// NAD 1983 StatePlane Illinois East FIPS 1201 Feet
	"102671": "+proj=tmerc +lat_0=36.66666666666666 +lon_0=-88.33333333333333 +k=0.999975 +x_0=300000 +y_0=0 +ellps=GRS80 +datum=NAD83 +to_meter=0.3048006096012192 +no_defs",
	// NAD 1983 StatePlane Illinois West FIPS 1202 Feet
	"102672": "+proj=tmerc +lat_0=36.66666666666666 +lon_0=-90.16666666666667 +k=0.999941 +x_0=700000 +y_0=0 +ellps=GRS80 +datum=NAD83 +to_meter=0.3048006096012192 +no_defs",
	// NAD 1983 StatePlane Indiana East FIPS 1301 Feet
	"102673": "+proj=tmerc +lat_0=37.5 +lon_0=-85.66666666666667 +k=0.999967 +x_0=100000 +y_0=250000 +ellps=GRS80 +datum=NAD83 +to_meter=0.3048006096012192 +no_defs",
	// NAD 1983 StatePlane Indiana West FIPS 1302 Feet
	"102674": "+proj=tmerc +lat_0=37.5 +lon_0=-87.08333333333333 +k=0.999967 +x_0=900000.0000000001 +y_0=250000 +ellps=GRS80 +datum=NAD83 +to_meter=0.3048006096012192 +no_defs",
	// NAD 1983 StatePlane Iowa North FIPS 1401 Feet
	"102675": "+proj=lcc +lat_1=42.06666666666667 +lat_2=43.26666666666667 +lat_0=41.5 +lon_0=-93.5 +x_0=1500000 +y_0=1000000 +ellps=GRS80 +datum=NAD83 +to_meter=0.3048006096012192 +no_defs",
	// NAD 1983 StatePlane Iowa South FIPS 1402 Feet
	"102676": "+proj=lcc +lat_1=40.61666666666667 +lat_2=41.78333333333333 +lat_0=40 +lon_0=-93.5 +x_0=500000.0000000002 +y_0=0 +ellps=GRS80 +datum=NAD83 +to_meter=0.3048006096012192 +no_defs",
	// NAD 1983 StatePlane Kansas North FIPS 1501 Feet
	"102677": "+proj=lcc +lat_1=38.71666666666667 +lat_2=39.78333333333333 +lat_0=38.33333333333334 +lon_0=-98 +x_0=399999.9999999999 +y_0=0 +ellps=GRS80 +datum=NAD83 +to_meter=0.3048006096012192 +no_defs",
	// NAD 1983 StatePlane Kansas South FIPS 1502 Feet
	"102678": "+proj=lcc +lat_1=37.26666666666667 +lat_2=38.56666666666667 +lat_0=36.66666666666666 +lon_0=-98.5 +x_0=399999.9999999999 +y_0=399999.9999999999 +ellps=GRS80 +datum=NAD83 +to_meter=0.3048006096012192 +no_defs",
	// NAD 1983 StatePlane Kentucky North FIPS 1601 Feet
	"102679": "+proj=lcc +lat_1=37.96666666666667 +lat_2=38.96666666666667 +lat_0=37.5 +lon_0=-84.25 +x_0=500000.0000000002 +y_0=0 +ellps=GRS80 +datum=NAD83 +to_meter=0.3048006096012192 +no_defs",
	// NAD 1983 StatePlane Kentucky South FIPS 1602 Feet
	"102680": "+proj=lcc +lat_1=36.73333333333333 +lat_2=37.93333333333333 +lat_0=36.33333333333334 +lon_0=-85.75 +x_0=500000.0000000002 +y_0=500000.0000000002 +ellps=GRS80 +datum=NAD83 +to_meter=0.3048006096012192 +no_defs",
	// NAD 1983 StatePlane Louisiana North FIPS 1701 Feet
	"102681": "+proj=lcc +lat_1=31.16666666666667 +lat_2=32.66666666666666 +lat_0=30.5 +lon_0=-92.5 +x_0=1000000 +y_0=0 +ellps=GRS80 +datum=NAD83 +to_meter=0.3048006096012192 +no_defs",
	// NAD 1983 StatePlane Louisiana South FIPS 1702 Feet
	"102682": "+proj=lcc +lat_1=29.3 +lat_2=30.7 +lat_0=28.5 +lon_0=-91.33333333333333 +x_0=1000000 +y_0=0 +ellps=GRS80 +datum=NAD83 +to_meter=0.3048006096012192 +no_defs",
	// NAD 1983 StatePlane Maine East FIPS 1801 Feet
	"102683": "+proj=tmerc +lat_0=43.66666666666666 +lon_0=-68.5 +k=0.999900 +x_0=300000 +y_0=0 +ellps=GRS80 +datum=NAD83 +to_meter=0.3048006096012192 +no_defs",
	// NAD 1983 StatePlane Maine West FIPS 1802 Feet
	"102684": "+proj=tmerc +lat_0=42.83333333333334 +lon_0=-70.16666666666667 +k=0.999967 +x_0=900000.0000000001 +y_0=0 +ellps=GRS80 +datum=NAD83 +to_meter=0.3048006096012192 +no_defs",
	// NAD 1983 StatePlane Maryland FIPS 1900 Feet
	"102685": "+proj=lcc +lat_1=38.3 +lat_2=39.45 +lat_0=37.66666666666666 +lon_0=-77 +x_0=399999.9999999999 +y_0=0 +ellps=GRS80 +datum=NAD83 +to_meter=0.3048006096012192 +no_defs",
	// NAD 1983 StatePlane Massachusetts Mainland FIPS 2001 Feet
	"102686": "+proj=lcc +lat_1=41.71666666666667 +lat_2=42.68333333333333 +lat_0=41 +lon_0=-71.5 +x_0=200000 +y_0=750000.0000000001 +ellps=GRS80 +datum=NAD83 +to_meter=0.3048006096012192 +no_defs",
	// NAD 1983 StatePlane Massachusetts Island FIPS 2002 Feet
	"102687": "+proj=lcc +lat_1=41.28333333333333 +lat_2=41.48333333333333 +lat_0=41 +lon_0=-70.5 +x_0=500000.0000000002 +y_0=0 +ellps=GRS80 +datum=NAD83 +to_meter=0.3048006096012192 +no_defs",
	// NAD 1983 StatePlane Michigan North FIPS 2111 Feet
	"102688": "+proj=lcc +lat_1=45.48333333333333 +lat_2=47.08333333333334 +lat_0=44.78333333333333 +lon_0=-87 +x_0=7999999.999999999 +y_0=0 +ellps=GRS80 +datum=NAD83 +to_meter=0.3048006096012192 +no_defs",
	// NAD 1983 StatePlane Michigan Central FIPS 2112 Feet
	"102689": "+proj=lcc +lat_1=44.18333333333333 +lat_2=45.7 +lat_0=43.31666666666667 +lon_0=-84.36666666666666 +x_0=6000000.000000001 +y_0=0 +ellps=GRS80 +datum=NAD83 +to_meter=0.3048006096012192 +no_defs",
	// NAD 1983 StatePlane Michigan South FIPS 2113 Feet
	"102690": "+proj=lcc +lat_1=42.1 +lat_2=43.66666666666666 +lat_0=41.5 +lon_0=-84.36666666666666 +x_0=4000000 +y_0=0 +ellps=GRS80 +datum=NAD83 +to_meter=0.3048006096012192 +no_defs",
	// NAD 1983 StatePlane Minnesota North FIPS 2201 Feet
	"102691": "+proj=lcc +lat_1=47.03333333333333 +lat_2=48.63333333333333 +lat_0=46.5 +lon_0=-93.09999999999999 +x_0=799999.9999999999 +y_0=100000 +ellps=GRS80 +datum=NAD83 +to_meter=0.3048006096012192 +no_defs",
	// NAD 1983 StatePlane Minnesota Central FIPS 2202 Feet
	"102692": "+proj=lcc +lat_1=45.61666666666667 +lat_2=47.05 +lat_0=45 +lon_0=-94.25 +x_0=799999.9999999999 +y_0=100000 +ellps=GRS80 +datum=NAD83 +to_meter=0.3048006096012192 +no_defs",
	// NAD 1983 StatePlane Minnesota South FIPS 2203 Feet
	"102693": "+proj=lcc +lat_1=43.78333333333333 +lat_2=45.21666666666667 +lat_0=43 +lon_0=-94 +x_0=799999.9999999999 +y_0=100000 +ellps=GRS80 +datum=NAD83 +to_meter=0.3048006096012192 +no_defs",
	// NAD 1983 StatePlane Mississippi East FIPS 2301 Feet
	"102694": "+proj=tmerc +lat_0=29.5 +lon_0=-88.83333333333333 +k=0.999950 +x_0=300000 +y_0=0 +ellps=GRS80 +datum=NAD83 +to_meter=0.3048006096012192 +no_defs",
	// NAD 1983 StatePlane Mississippi West FIPS 2302 Feet
	"102695": "+proj=tmerc +lat_0=29.5 +lon_0=-90.33333333333333 +k=0.999950 +x_0=700000 +y_0=0 +ellps=GRS80 +datum=NAD83 +to_meter=0.3048006096012192 +no_defs",
	// NAD 1983 StatePlane Missouri East FIPS 2401 Feet
	"102696": "+proj=tmerc +lat_0=35.83333333333334 +lon_0=-90.5 +k=0.999933 +x_0=250000 +y_0=0 +ellps=GRS80 +datum=NAD83 +to_meter=0.3048006096012192 +no_defs",
	// NAD 1983 StatePlane Missouri Central FIPS 2402 Feet
	"102697": "+proj=tmerc +lat_0=35.83333333333334 +lon_0=-92.5 +k=0.999933 +x_0=500000.0000000002 +y_0=0 +ellps=GRS80 +datum=NAD83 +to_meter=0.3048006096012192 +no_defs",
	// NAD 1983 StatePlane Missouri West FIPS 2403 Feet
	"102698": "+proj=tmerc +lat_0=36.16666666666666 +lon_0=-94.5 +k=0.999941 +x_0=850000 +y_0=0 +ellps=GRS80 +datum=NAD83 +to_meter=0.3048006096012192 +no_defs",
	// NAD 1983 StatePlane Montana FIPS 2500 Feet
	"102700": "+proj=lcc +lat_1=45 +lat_2=49 +lat_0=44.25 +lon_0=-109.5 +x_0=600000.0000000001 +y_0=0 +ellps=GRS80 +datum=NAD83 +to_meter=0.3048006096012192 +no_defs",
	// NAD 1983 StatePlane Nebraska FIPS 2600 Feet
	"102704": "+proj=lcc +lat_1=40 +lat_2=43 +lat_0=39.83333333333334 +lon_0=-100 +x_0=500000.0000000002 +y_0=0 +ellps=GRS80 +datum=NAD83 +to_meter=0.3048006096012192 +no_defs",
	// NAD 1983 StatePlane Nevada East FIPS 2701 Feet
	"102707": "+proj=tmerc +lat_0=34.75 +lon_0=-115.5833333333333 +k=0.999900 +x_0=200000 +y_0=7999999.999999999 +ellps=GRS80 +datum=NAD83 +to_meter=0.3048006096012192 +no_defs",
	// NAD 1983 StatePlane Nevada Central FIPS 2702 Feet
	"102708": "+proj=tmerc +lat_0=34.75 +lon_0=-116.6666666666667 +k=0.999900 +x_0=500000.0000000002 +y_0=6000000.000000001 +ellps=GRS80 +datum=NAD83 +to_meter=0.3048006096012192 +no_defs",
	// NAD 1983 StatePlane Nevada West FIPS 2703 Feet
	"102709": "+proj=tmerc +lat_0=34.75 +lon_0=-118.5833333333333 +k=0.999900 +x_0=799999.9999999999 +y_0=4000000 +ellps=GRS80 +datum=NAD83 +to_meter=0.3048006096012192 +no_defs",
	// NAD 1983 StatePlane New Hampshire FIPS 2800 Feet
	"102710": "+proj=tmerc +lat_0=42.5 +lon_0=-71.66666666666667 +k=0.999967 +x_0=300000 +y_0=0 +ellps=GRS80 +datum=NAD83 +to_meter=0.3048006096012192 +no_defs",
	// NAD 1983 StatePlane New Jersey FIPS 2900 Feet
	"102711": "+proj=tmerc +lat_0=38.83333333333334 +lon_0=-74.5 +k=0.999900 +x_0=150000 +y_0=0 +ellps=GRS80 +datum=NAD83 +to_meter=0.3048006096012192 +no_defs",
	// NAD 1983 StatePlane New Mexico East FIPS 3001 Feet
	"102712": "+proj=tmerc +lat_0=31 +lon_0=-104.3333333333333 +k=0.999909 +x_0=165000 +y_0=0 +ellps=GRS80 +datum=NAD83 +to_meter=0.3048006096012192 +no_defs",
	// NAD 1983 StatePlane New Mexico Central FIPS 3002 Feet
	"102713": "+proj=tmerc +lat_0=31 +lon_0=-106.25 +k=0.999900 +x_0=500000.0000000002 +y_0=0 +ellps=GRS80 +datum=NAD83 +to_meter=0.3048006096012192 +no_defs",
	// NAD 1983 StatePlane New Mexico West FIPS 3003 Feet
	"102714": "+proj=tmerc +lat_0=31 +lon_0=-107.8333333333333 +k=0.999917 +x_0=829999.9999999999 +y_0=0 +ellps=GRS80 +datum=NAD83 +to_meter=0.3048006096012192 +no_defs",
	// NAD 1983 StatePlane New York East FIPS 3101 Feet
	"102715": "+proj=tmerc +lat_0=38.83333333333334 +lon_0=-74.5 +k=0.999900 +x_0=150000 +y_0=0 +ellps=GRS80 +datum=NAD83 +to_meter=0.3048006096012192 +no_defs",
	// NAD 1983 StatePlane New York Central FIPS 3102 Feet
	"102716": "+proj=tmerc +lat_0=40 +lon_0=-76.58333333333333 +k=0.999938 +x_0=250000 +y_0=0 +ellps=GRS80 +datum=NAD83 +to_meter=0.3048006096012192 +no_defs",
	// NAD 1983 StatePlane New York West FIPS 3103 Feet
	"102717": "+proj=tmerc +lat_0=40 +lon_0=-78.58333333333333 +k=0.999938 +x_0=350000.0000000001 +y_0=0 +ellps=GRS80 +datum=NAD83 +to_meter=0.3048006096012192 +no_defs",
	// NAD 1983 StatePlane New York Long Island FIPS 3104 Feet
	"102718": "+proj=lcc +lat_1=40.66666666666666 +lat_2=41.03333333333333 +lat_0=40.16666666666666 +lon_0=-74 +x_0=300000 +y_0=0 +ellps=GRS80 +datum=NAD83 +to_meter=0.3048006096012192 +no_defs",
	// NAD 1983 StatePlane North Carolina FIPS 3200 Feet
	"102719": "+proj=lcc +lat_1=34.33333333333334 +lat_2=36.16666666666666 +lat_0=33.75 +lon_0=-79 +x_0=609601.2199999999 +y_0=0 +ellps=GRS80 +datum=NAD83 +to_meter=0.3048006096012192 +no_defs",
	// NAD 1983 StatePlane North Dakota North FIPS 3301 Feet
	"102720": "+proj=lcc +lat_1=47.43333333333333 +lat_2=48.73333333333333 +lat_0=47 +lon_0=-100.5 +x_0=600000.0000000001 +y_0=0 +ellps=GRS80 +datum=NAD83 +to_meter=0.3048006096012192 +no_defs",
	// NAD 1983 StatePlane North Dakota South FIPS 3302 Feet
	"102721": "+proj=lcc +lat_1=46.18333333333333 +lat_2=47.48333333333333 +lat_0=45.66666666666666 +lon_0=-100.5 +x_0=600000.0000000001 +y_0=0 +ellps=GRS80 +datum=NAD83 +to_meter=0.3048006096012192 +no_defs",
	// NAD 1983 StatePlane Ohio North FIPS 3401 Feet
	"102722": "+proj=lcc +lat_1=40.43333333333333 +lat_2=41.7 +lat_0=39.66666666666666 +lon_0=-82.5 +x_0=600000.0000000001 +y_0=0 +ellps=GRS80 +datum=NAD83 +to_meter=0.3048006096012192 +no_defs",
	// NAD 1983 StatePlane Ohio South FIPS 3402 Feet
	"102723": "+proj=lcc +lat_1=38.73333333333333 +lat_2=40.03333333333333 +lat_0=38 +lon_0=-82.5 +x_0=600000.0000000001 +y_0=0 +ellps=GRS80 +datum=NAD83 +to_meter=0.3048006096012192 +no_defs",
	// NAD 1983 StatePlane Oklahoma North FIPS 3501 Feet
	"102724": "+proj=lcc +lat_1=35.56666666666667 +lat_2=36.76666666666667 +lat_0=35 +lon_0=-98 +x_0=600000.0000000001 +y_0=0 +ellps=GRS80 +datum=NAD83 +to_meter=0.3048006096012192 +no_defs",
	// NAD 1983 StatePlane Oklahoma South FIPS 3502 Feet
	"102725": "+proj=lcc +lat_1=33.93333333333333 +lat_2=35.23333333333333 +lat_0=33.33333333333334 +lon_0=-98 +x_0=600000.0000000001 +y_0=0 +ellps=GRS80 +datum=NAD83 +to_meter=0.3048006096012192 +no_defs",
	// NAD 1983 StatePlane Oregon North FIPS 3601 Feet
	"102726": "+proj=lcc +lat_1=44.33333333333334 +lat_2=46 +lat_0=43.66666666666666 +lon_0=-120.5 +x_0=2500000 +y_0=0 +ellps=GRS80 +datum=NAD83 +to_meter=0.3048006096012192 +no_defs",
	// NAD 1983 StatePlane Oregon South FIPS 3602 Feet
	"102727": "+proj=lcc +lat_1=42.33333333333334 +lat_2=44 +lat_0=41.66666666666666 +lon_0=-120.5 +x_0=1500000 +y_0=0 +ellps=GRS80 +datum=NAD83 +to_meter=0.3048006096012192 +no_defs",
	// NAD 1983 StatePlane Pennsylvania North FIPS 3701 Feet
	"102728": "+proj=lcc +lat_1=40.88333333333333 +lat_2=41.95 +lat_0=40.16666666666666 +lon_0=-77.75 +x_0=600000.0000000001 +y_0=0 +ellps=GRS80 +datum=NAD83 +to_meter=0.3048006096012192 +no_defs",
	// NAD 1983 StatePlane Pennsylvania South FIPS 3702 Feet
	"102729": "+proj=lcc +lat_1=39.93333333333333 +lat_2=40.96666666666667 +lat_0=39.33333333333334 +lon_0=-77.75 +x_0=600000.0000000001 +y_0=0 +ellps=GRS80 +datum=NAD83 +to_meter=0.3048006096012192 +no_defs",
	// NAD 1983 StatePlane Rhode Island FIPS 3800 Feet
	"102730": "+proj=tmerc +lat_0=41.08333333333334 +lon_0=-71.5 +k=0.999994 +x_0=100000 +y_0=0 +ellps=GRS80 +datum=NAD83 +to_meter=0.3048006096012192 +no_defs",
	// NAD 1983 StatePlane South Carolina FIPS 3900 Feet
	"102733": "+proj=lcc +lat_1=32.5 +lat_2=34.83333333333334 +lat_0=31.83333333333333 +lon_0=-81 +x_0=609600.0000000001 +y_0=0 +ellps=GRS80 +datum=NAD83 +to_meter=0.3048006096012192 +no_defs",
	// NAD 1983 StatePlane South Dakota North FIPS 4001 Feet
	"102734": "+proj=lcc +lat_1=44.41666666666666 +lat_2=45.68333333333333 +lat_0=43.83333333333334 +lon_0=-100 +x_0=600000.0000000001 +y_0=0 +ellps=GRS80 +datum=NAD83 +to_meter=0.3048006096012192 +no_defs",
	// NAD 1983 StatePlane South Dakota South FIPS 4002 Feet
	"102735": "+proj=lcc +lat_1=42.83333333333334 +lat_2=44.4 +lat_0=42.33333333333334 +lon_0=-100.3333333333333 +x_0=600000.0000000001 +y_0=0 +ellps=GRS80 +datum=NAD83 +to_meter=0.3048006096012192 +no_defs",
	// NAD 1983 StatePlane Tennessee FIPS 4100 Feet
	"102736": "+proj=lcc +lat_1=35.25 +lat_2=36.41666666666666 +lat_0=34.33333333333334 +lon_0=-86 +x_0=600000.0000000001 +y_0=0 +ellps=GRS80 +datum=NAD83 +to_meter=0.3048006096012192 +no_defs",
	// NAD 1983 StatePlane Texas North FIPS 4201 Feet
	"102737": "+proj=lcc +lat_1=34.65 +lat_2=36.18333333333333 +lat_0=34 +lon_0=-101.5 +x_0=200000 +y_0=1000000 +ellps=GRS80 +datum=NAD83 +to_meter=0.3048006096012192 +no_defs",
	// NAD 1983 StatePlane Texas North Central FIPS 4202 Feet
	"102738": "+proj=lcc +lat_1=32.13333333333333 +lat_2=33.96666666666667 +lat_0=31.66666666666667 +lon_0=-98.5 +x_0=600000.0000000001 +y_0=2000000 +ellps=GRS80 +datum=NAD83 +to_meter=0.3048006096012192 +no_defs",
	// NAD 1983 StatePlane Texas Central FIPS 4203 Feet
	"102739": "+proj=lcc +lat_1=30.11666666666667 +lat_2=31.88333333333333 +lat_0=29.66666666666667 +lon_0=-100.3333333333333 +x_0=700000 +y_0=3000000 +ellps=GRS80 +datum=NAD83 +to_meter=0.3048006096012192 +no_defs",
	// NAD 1983 StatePlane Texas South Central FIPS 4204 Feet
	"102740": "+proj=lcc +lat_1=28.38333333333333 +lat_2=30.28333333333334 +lat_0=27.83333333333333 +lon_0=-99 +x_0=600000.0000000001 +y_0=4000000 +ellps=GRS80 +datum=NAD83 +to_meter=0.3048006096012192 +no_defs",
	// NAD 1983 StatePlane Texas South FIPS 4205 Feet
	"102741": "+proj=lcc +lat_1=26.16666666666667 +lat_2=27.83333333333333 +lat_0=25.66666666666667 +lon_0=-98.5 +x_0=300000 +y_0=4999999.999999999 +ellps=GRS80 +datum=NAD83 +to_meter=0.3048006096012192 +no_defs",
	// NAD 1983 StatePlane Utah North FIPS 4301 Feet
	"102742": "+proj=lcc +lat_1=40.71666666666667 +lat_2=41.78333333333333 +lat_0=40.33333333333334 +lon_0=-111.5 +x_0=500000.0000000002 +y_0=1000000 +ellps=GRS80 +datum=NAD83 +to_meter=0.3048006096012192 +no_defs",
	// NAD 1983 StatePlane Utah Central FIPS 4302 Feet
	"102743": "+proj=lcc +lat_1=39.01666666666667 +lat_2=40.65 +lat_0=38.33333333333334 +lon_0=-111.5 +x_0=500000.0000000002 +y_0=2000000 +ellps=GRS80 +datum=NAD83 +to_meter=0.3048006096012192 +no_defs",
	// NAD 1983 StatePlane Utah South FIPS 4303 Feet
	"102744": "+proj=lcc +lat_1=37.21666666666667 +lat_2=38.35 +lat_0=36.66666666666666 +lon_0=-111.5 +x_0=500000.0000000002 +y_0=3000000 +ellps=GRS80 +datum=NAD83 +to_meter=0.3048006096012192 +no_defs",
	// NAD 1983 StatePlane Vermont FIPS 4400 Feet
	"102745": "+proj=tmerc +lat_0=42.5 +lon_0=-72.5 +k=0.999964 +x_0=500000.0000000002 +y_0=0 +ellps=GRS80 +datum=NAD83 +to_meter=0.3048006096012192 +no_defs",
	// NAD 1983 StatePlane Virginia North FIPS 4501 Feet
	"102746": "+proj=lcc +lat_1=38.03333333333333 +lat_2=39.2 +lat_0=37.66666666666666 +lon_0=-78.5 +x_0=3499999.999999999 +y_0=2000000 +ellps=GRS80 +datum=NAD83 +to_meter=0.3048006096012192 +no_defs",
	// NAD 1983 StatePlane Virginia South FIPS 4502 Feet
	"102747": "+proj=lcc +lat_1=36.76666666666667 +lat_2=37.96666666666667 +lat_0=36.33333333333334 +lon_0=-78.5 +x_0=3499999.999999999 +y_0=1000000 +ellps=GRS80 +datum=NAD83 +to_meter=0.3048006096012192 +no_defs",
	// NAD 1983 StatePlane Washington North FIPS 4601 Feet
	"102748": "+proj=lcc +lat_1=47.5 +lat_2=48.73333333333333 +lat_0=47 +lon_0=-120.8333333333333 +x_0=500000.0000000002 +y_0=0 +ellps=GRS80 +datum=NAD83 +to_meter=0.3048006096012192 +no_defs",
	// NAD 1983 StatePlane Washington South FIPS 4602 Feet
	"102749": "+proj=lcc +lat_1=45.83333333333334 +lat_2=47.33333333333334 +lat_0=45.33333333333334 +lon_0=-120.5 +x_0=500000.0000000002 +y_0=0 +ellps=GRS80 +datum=NAD83 +to_meter=0.3048006096012192 +no_defs",
	// NAD 1983 StatePlane West Virginia North FIPS 4701 Feet
	"102750": "+proj=lcc +lat_1=39 +lat_2=40.25 +lat_0=38.5 +lon_0=-79.5 +x_0=600000.0000000001 +y_0=0 +ellps=GRS80 +datum=NAD83 +to_meter=0.3048006096012192 +no_defs",
	// NAD 1983 StatePlane West Virginia South FIPS 4702 Feet
	"102751": "+proj=lcc +lat_1=37.48333333333333 +lat_2=38.88333333333333 +lat_0=37 +lon_0=-81 +x_0=600000.0000000001 +y_0=0 +ellps=GRS80 +datum=NAD83 +to_meter=0.3048006096012192 +no_defs",
	// NAD 1983 StatePlane Wisconsin North FIPS 4801 Feet
	"102752": "+proj=lcc +lat_1=45.56666666666667 +lat_2=46.76666666666667 +lat_0=45.16666666666666 +lon_0=-90 +x_0=600000.0000000001 +y_0=0 +ellps=GRS80 +datum=NAD83 +to_meter=0.3048006096012192 +no_defs",
	// NAD 1983 StatePlane Wisconsin Central FIPS 4802 Feet
	"102753": "+proj=lcc +lat_1=44.25 +lat_2=45.5 +lat_0=43.83333333333334 +lon_0=-90 +x_0=600000.0000000001 +y_0=0 +ellps=GRS80 +datum=NAD83 +to_meter=0.3048006096012192 +no_defs",
	// NAD 1983 StatePlane Wisconsin South FIPS 4803 Feet
	"102754": "+proj=lcc +lat_1=42.73333333333333 +lat_2=44.06666666666667 +lat_0=42 +lon_0=-90 +x_0=600000.0000000001 +y_0=0 +ellps=GRS80 +datum=NAD83 +to_meter=0.3048006096012192 +no_defs",
	// NAD 1983 StatePlane Wyoming East FIPS 4901 Feet
	"102755": "+proj=tmerc +lat_0=40.5 +lon_0=-105.1666666666667 +k=0.999938 +x_0=200000 +y_0=0 +ellps=GRS80 +datum=NAD83 +to_meter=0.3048006096012192 +no_defs",
	// NAD 1983 StatePlane Wyoming East Central FIPS 4902 Feet
	"102756": "+proj=tmerc +lat_0=40.5 +lon_0=-107.3333333333333 +k=0.999938 +x_0=399999.9999999999 +y_0=100000 +ellps=GRS80 +datum=NAD83 +to_meter=0.3048006096012192 +no_defs",
	// NAD 1983 StatePlane Wyoming West Central FIPS 4903 Feet
	"102757": "+proj=tmerc +lat_0=40.5 +lon_0=-108.75 +k=0.999938 +x_0=600000.0000000001 +y_0=0 +ellps=GRS80 +datum=NAD83 +to_meter=0.3048006096012192 +no_defs",
	// NAD 1983 StatePlane Wyoming West FIPS 4904 Feet
	"102758": "+proj=tmerc +lat_0=40.5 +lon_0=-110.0833333333333 +k=0.999938 +x_0=799999.9999999999 +y_0=100000 +ellps=GRS80 +datum=NAD83 +to_meter=0.3048006096012192 +no_defs",
	// NAD 1983 StatePlane Puerto Rico Virgin Islands FIPS 5200 Feet
	"102761": "+proj=lcc +lat_1=18.03333333333334 +lat_2=18.43333333333333 +lat_0=17.83333333333333 +lon_0=-66.43333333333334 +x_0=200000 +y_0=200000 +ellps=GRS80 +datum=NAD83 +to_meter=0.3048006096012192 +no_defs",
	// NAD 1983 StatePlane Guam FIPS 5400 Feet
	"102766": "+proj=poly +lat_0=13.47246635277778 +lon_0=-144.7487507055556 +x_0=49999.99999999999 +y_0=49999.99999999999 +ellps=GRS80 +datum=NAD83 +to_meter=0.3048006096012192 +no_defs",
	// Belge Lambert 1972
	"103300": "+proj=lcc +lat_1=49.8333339 +lat_2=51.16666733333333 +lat_0=90 +lon_0=4.367486666666666 +x_0=150000.01256 +y_0=5400088.4378 +ellps=intl +units=m +no_defs",
	// GCS International 1967
	"4023": "+proj=longlat +ellps=aust_SA +no_defs",
	// GCS Bern 1898
	"4217": "+proj=longlat +ellps=bessel +no_defs",
	// GCS Voirol Unifie 1960
	"4305": "+proj=longlat +ellps=clrk80 +no_defs",
	// GCS Montserrat 1958
	"4404": "+proj=longlat +ellps=clrk80 +no_defs",
	// GCS Voirol Unifie 1960 Paris
	"4812": "+proj=longlat +ellps=clrk80 +pm=2.337229166666667 +no_defs",
	// GCS WGS 1966
	"37001": "+proj=longlat +ellps=WGS66 +no_defs",
	// GCS Fischer 1960
	"37002": "+proj=longlat +a=6378166 +b=6356784.283607107 +no_defs",
	// GCS Fischer 1968
	"37003": "+proj=longlat +a=6378150 +b=6356768.337244385 +no_defs",
	// GCS Fischer Modified
	"37004": "+proj=longlat +ellps=fschr60m +no_defs",
	// GCS Hough 1960
	"37005": "+proj=longlat +a=6378270 +b=6356794.343434343 +no_defs",
	// GCS Everest Modified 1969
	"37006": "+proj=longlat +a=6377295.664 +b=6356094.667915204 +no_defs",
	// GCS Walbeck
	"37007": "+proj=longlat +a=6376896 +b=6355834.846687363 +no_defs",
	// GCS Sphere ARC INFO
	"37008": "+proj=longlat +a=6370997 +b=6370997 +no_defs",
	// GCS European 1979
	"37201": "+proj=longlat +ellps=intl +no_defs",
	// GCS Everest Bangladesh
	"37202": "+proj=longlat +a=6377276.345 +b=6356075.413140239 +no_defs",
	// GCS Everest India Nepal
	"37203": "+proj=longlat +a=6377301.243 +b=6356100.230165385 +no_defs",
	// GCS Hjorsey 1955
	"37204": "+proj=longlat +ellps=intl +no_defs",
	// GCS Hong Kong 1963
	"37205": "+proj=longlat +ellps=intl +no_defs",
	// GCS Oman
	"37206": "+proj=longlat +ellps=clrk80 +no_defs",
	// GCS South Asia Singapore
	"37207": "+proj=longlat +ellps=fschr60m +no_defs",
	// GCS Ayabelle
	"37208": "+proj=longlat +ellps=clrk80 +no_defs",
	// GCS Point 58
	"37211": "+proj=longlat +ellps=clrk80 +no_defs",
	// GCS Beacon E 1945
	"37212": "+proj=longlat +ellps=intl +no_defs",
	// GCS Tern Island 1961
	"37213": "+proj=longlat +ellps=intl +no_defs",
	// GCS Astro 1952
	"37214": "+proj=longlat +ellps=intl +no_defs",
	// GCS Bellevue IGN
	"37215": "+proj=longlat +ellps=intl +no_defs",
	// GCS Canton 1966
	"37216": "+proj=longlat +ellps=intl +no_defs",
	// GCS Chatham Island 1971
	"37217": "+proj=longlat +ellps=intl +no_defs",
	// GCS DOS 1968
	"37218": "+proj=longlat +ellps=intl +no_defs",
	// GCS Easter Island 1967
	"37219": "+proj=longlat +ellps=intl +no_defs",
	// GCS Guam 1963
	"37220": "+proj=longlat +ellps=clrk66 +no_defs",
	// GCS GUX 1
	"37221": "+proj=longlat +ellps=intl +no_defs",
	// GCS Johnston Island 1961
	"37222": "+proj=longlat +ellps=intl +no_defs",
	// GCS Carthage Degree
	"37223": "+proj=longlat +a=6378249.2 +b=6356514.999904194 +no_defs",
	// GCS Midway 1961
	"37224": "+proj=longlat +ellps=intl +no_defs",
	// GCS Pitcairn 1967
	"37226": "+proj=longlat +ellps=intl +no_defs",
	// GCS Santo DOS 1965
	"37227": "+proj=longlat +ellps=intl +no_defs",
	// GCS Viti Levu 1916
	"37228": "+proj=longlat +ellps=clrk80 +no_defs",
	// GCS Wake Eniwetok 1960
	"37229": "+proj=longlat +a=6378270 +b=6356794.343434343 +no_defs",
	// GCS Wake Island 1952
	"37230": "+proj=longlat +ellps=intl +no_defs",
	// GCS Anna 1 1965
	"37231": "+proj=longlat +ellps=aust_SA +no_defs",
	// GCS Gan 1970
	"37232": "+proj=longlat +ellps=intl +no_defs",
	// GCS ISTS 073 1969
	"37233": "+proj=longlat +ellps=intl +no_defs",
	// GCS Kerguelen Island 1949
	"37234": "+proj=longlat +ellps=intl +no_defs",
	// GCS Reunion
	"37235": "+proj=longlat +ellps=intl +no_defs",
	// GCS Ascension Island 1958
	"37237": "+proj=longlat +ellps=intl +no_defs",
	// GCS DOS 71 4
	"37238": "+proj=longlat +ellps=intl +no_defs",
	// GCS Cape Canaveral
	"37239": "+proj=longlat +ellps=clrk66 +no_defs",
	// GCS Fort Thomas 1955
	"37240": "+proj=longlat +ellps=clrk80 +no_defs",
	// GCS Graciosa Base SW 1948
	"37241": "+proj=longlat +ellps=intl +no_defs",
	// GCS ISTS 061 1968
	"37242": "+proj=longlat +ellps=intl +no_defs",
	// GCS LC5 1961
	"37243": "+proj=longlat +ellps=clrk66 +no_defs",
	// GCS Observ Meteorologico 1939
	"37245": "+proj=longlat +ellps=intl +no_defs",
	// GCS Pico de Las Nieves
	"37246": "+proj=longlat +ellps=intl +no_defs",
	// GCS Porto Santo 1936
	"37247": "+proj=longlat +ellps=intl +no_defs",
	// GCS Sao Braz
	"37249": "+proj=longlat +ellps=intl +no_defs",
	// GCS Selvagem Grande 1938
	"37250": "+proj=longlat +ellps=intl +no_defs",
	// GCS Tristan 1968
	"37251": "+proj=longlat +ellps=intl +no_defs",
	// GCS Samoa 1962
	"37252": "+proj=longlat +ellps=clrk66 +no_defs",
	// GCS Camp Area
	"37253": "+proj=longlat +ellps=intl +no_defs",
	// GCS Deception Island
	"37254": "+proj=longlat +ellps=clrk80 +no_defs",
	// GCS Gunung Segara
	"37255": "+proj=longlat +ellps=bessel +no_defs",
	// GCS S42 Hungary
	"37257": "+proj=longlat +ellps=krass +no_defs",
	// GCS Kusaie 1951
	"37259": "+proj=longlat +ellps=intl +no_defs",
	// GCS Alaskan Islands
	"37260": "+proj=longlat +ellps=clrk66 +no_defs",
	// GCS Assumed Geographic 1
	"104000": "+proj=longlat +ellps=clrk66 +datum=NAD27 +no_defs",
	// GCS Estonia 1937
	"104101": "+proj=longlat +ellps=bessel +no_defs",
	// GCS Hermannskogel
	"104102": "+proj=longlat +ellps=bessel +no_defs",
	// GCS Sierra Leone 1960
	"104103": "+proj=longlat +ellps=clrk80 +no_defs",
	// GCS Hong Kong 1980
	"104104": "+proj=longlat +ellps=intl +no_defs",
	// GCS Datum Lisboa Bessel
	"104105": "+proj=longlat +ellps=bessel +no_defs",
	// GCS Datum Lisboa Hayford
	"104106": "+proj=longlat +ellps=intl +no_defs",
	// GCS RGF 1993
	"104107": "+proj=longlat +ellps=GRS80 +no_defs",
	// GCS NZGD 2000
	"104108": "+proj=longlat +ellps=GRS80 +no_defs",
	// GCS Merchich Degree
	"104261": "+proj=longlat +a=6378249.2 +b=6356514.999904194 +no_defs",
	// GCS Voirol 1875 Degree
	"104304": "+proj=longlat +a=6378249.2 +b=6356514.999904194 +no_defs",
	// GCS Voirol Unifie 1960 Degree
	"104305": "+proj=longlat +ellps=clrk80 +no_defs",


	////////////////
	// Extra codes from epsg.io. Same story as above. Source:
	// https://github.com/maptiler/epsg.io/blob/4b18240e0830e17f7d95f34c4a02feaa9c0662a4/extra_codes_proj4_4.8.0.2/other.extra
	////////////////

	// NAD83 / BC Albers
	"42102":"+proj=aea +ellps=GRS80 +lat_0=45 +lon_0=-126.0 +lat_1=50.0 +lat_2=58.5 +x_0=1000000.0 +y_0=0 +datum=NAD83 +units=m",
	// WGS84 / Simple Mercator
	"41001":"+proj=merc +lat_ts=0 +lon_0=0 +k=1.000000 +x_0=0 +y_0=0 +ellps=WGS84 +datum=WGS84 +units=m +no_defs",
	// WGS 84 / LCC Canada
	"42101":"+proj=lcc +lat_1=49 +lat_2=77 +lat_0=0 +lon_0=-95 +x_0=0 +y_0=-8000000 +ellps=WGS84 +datum=WGS84 +units=m +no_defs",
	// WGS 84 / LCC USA
	"42103":"+proj=lcc +lat_1=33 +lat_2=45 +lat_0=0 +lon_0=-100 +x_0=0 +y_0=0 +ellps=WGS72 +datum=WGS84 +units=m +no_defs",
	// NAD83 / MTM zone 8 Québec
	"42104":"+proj=tmerc +lat_0=0 +lon_0=-73.5 +k=0.999900 +x_0=304800 +y_0=0 +ellps=GRS80 +units=m +no_defs",
	// WGS84 / Merc NorthAm
	"42105":"+proj=merc +lat_ts=0 +lon_0=-96 +k=1.000000 +x_0=0 +y_0=0 +ellps=WGS84 +datum=WGS84 +units=m +no_defs",
	// WGS84 / Lambert Azim Mozambique
	"42106":"+proj=laea +lat_0=5 +lon_0=20 +x_0=0 +y_0=0 +a=6370997 +b=6370997 +datum=WGS84 +units=m +no_defs",
	// NAD27 / Polar Stereographic / CM=-98
	"42301":"+proj=stere +lat_0=90 +lon_0=-98 +x_0=0 +y_0=0 +ellps=clrk66 +datum=NAD27 +units=m +no_defs",
	// JapanOrtho.09 09
	"42302":"+proj=tmerc +lat_0=36 +lon_0=139.833333333333 +k=0.999900 +x_0=0 +y_0=0 +ellps=bessel +units=m +no_defs",
	// NAD83 / Albers NorthAm
	"42303":"+proj=aea +lat_1=29.5 +lat_2=45.5 +lat_0=23 +lon_0=-96 +x_0=0 +y_0=0 +ellps=GRS80 +datum=NAD83 +units=m +no_defs",
	// NAD83 / NRCan LCC Canada
	"42304":"+proj=lcc +lat_1=49 +lat_2=77 +lat_0=49 +lon_0=-95 +x_0=0 +y_0=0 +ellps=GRS80 +datum=NAD83 +units=m +no_defs",
	// France_II
	"42305":"+proj=lcc +lat_1=45.898918964419 +lat_2=47.696014502038 +lat_0=46.8 +lon_0=2.337229166666667 +x_0=600000 +y_0=2200000 +a=6378249.2 +b=6356514.999904194 +pm=2.337229166666667 +units=m +no_defs",
	// NAD83/QC_LCC
	"42306":"+proj=lcc +lat_1=46 +lat_2=60 +lat_0=44 +lon_0=-68.5 +x_0=0 +y_0=0 +ellps=GRS80 +datum=NAD83 +units=m +no_defs",
	// NAD83 / Texas Central - feet
	"42307":"+proj=lcc +lat_1=31.8833333333333 +lat_2=30.1166666666667 +lat_0=29.6666666666667 +lon_0=-100.333333333333 +x_0=700000.0000000001 +y_0=3000000 +ellps=GRS80 +datum=NAD83 +to_meter=0.3048006096012192 +no_defs",
	// NAD27 / California Albers
	"42308":"+proj=aea +lat_1=34 +lat_2=40.5 +lat_0=0 +lon_0=-120 +x_0=0 +y_0=-4000000 +ellps=clrk66 +datum=NAD27 +units=m +no_defs",
	// NAD 83 / LCC Canada AVHRR-2
	"42309":"+proj=lcc +lat_1=49 +lat_2=77 +lat_0=0 +lon_0=-95 +x_0=0 +y_0=0 +ellps=GRS80 +datum=NAD83 +units=m +no_defs",
	// WGS84+GRS80 / Mercator
	"42310":"+proj=merc +lat_ts=0 +lon_0=0 +k=1.000000 +x_0=0 +y_0=0 +ellps=GRS80 +datum=WGS84 +units=m +no_defs",
	// NAD83 / LCC Statcan
	"42311":"+proj=lcc +lat_1=49 +lat_2=77 +lat_0=63.390675 +lon_0=-91.86666700000001 +x_0=6200000 +y_0=3000000 +ellps=GRS80 +datum=NAD83 +units=m +no_defs",
	// Google Maps Global Mercator
	"900913":"+proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 +units=m +no_defs",
}