/**
 * Maps EPSG angle units codes to their multipliers to convert to degrees
 * @type {Object}
 */
module.exports = {
	"9102": 1, // degree
	"9122": 1, // degree
	"9114": 9 / (50 * Math.PI), // mil_6400, approximately equals to 1mrad
	"9113": 0.00009, // centesimal second
	"9112": 0.009, // centesimal minute
	"9109": 0.000001 * 180 / Math.PI, // microradian
	"9105": 0.9, // grad
	"9104": 1 / 3600, // arc-second
	"9103": 1 / 60, // arc-minute
	"9101": 180 / Math.PI, // radian
	"1031": 1 / 3600000, // milliarc-second
	"9106": 0.9, // gon
}