const Units = require("./Units.js");

/**
 * Returns sign from given hemisphere
 * @param hemisphere {"n"|"s"|"e"|"w"} Hemisphere letter, case insensitive
 * @return Sign from given hemisphere
 */
function signFromHemisphere(hemisphere) {
	let h = hemisphere.toLowerCase();
	if (h === "n" || h === "e")
		return 1;
	return -1;
}

/**
 * Converts value with given units EPSG code to degrees
 * @param value {number|string} Value to convert
 * @param code {number} Units EPSG code
 * @return {number|null} Given value in degrees or null, if units can't be converted
 */
module.exports = function (value, code) {
	let codeStr = code.toString();
	if (codeStr in Units)
		return value * Units[codeStr].m * 180 / Math.PI;

	// Messed up shit
	if (code === 9110) {
		let valStr = value.toString();
		let ptPos = valStr.indexOf(".");
		let sign = Math.sign(value);
		let deg = parseFloat(valStr.substring(0, ptPos)) || 0;
		let min = parseFloat(valStr.substring(ptPos + 1, ptPos + 3)) || 0;
		let sec = parseFloat(valStr.substring(ptPos + 3)) || 0;
		return deg + sign * min / 60 + sign * sec / 3600;
	}

	// Hemisphere degree
	if (code === 9117)
		return signFromHemisphere(value[0]) * parseFloat(value.substring(1));

	// Degree hemisphere
	if (code === 9116)
		return signFromHemisphere(value[value.length - 1]) * parseFloat(value.substring(0, value.length - 1));

	return null;
}