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

	// Messed up shit. Remark from the database:
	// Pseudo unit. Format: signed degrees - period - minutes (2 digits) - integer seconds (2 digits) - fraction of seconds (any precision). Must include leading zero in minutes and seconds and exclude decimal point for seconds. Convert to deg using algorithm.
	if (code === 9110) {
		let valStr = value.toString();
		let ptPos = valStr.indexOf(".");

		// Add point and zeroes to normalize
		if (ptPos === -1) {
			ptPos = valStr.length;
			valStr += ".0000";
		}

		// Add missing zeroes to normalize
		const lengthAfterPoint = valStr.length - 1 - ptPos;
		if (lengthAfterPoint < 4) {
			for (let i = 0; i < 4 - lengthAfterPoint; i++)
				valStr += "0";
		}

		// Parse parts
		const sign = Math.sign(value);
		const deg = Math.abs(parseFloat(valStr.substring(0, ptPos)));
		const min = parseFloat(valStr.substring(ptPos + 1, ptPos + 3));
		let secStr = valStr.substring(ptPos + 3);
		secStr = secStr ? secStr.substring(0, 2) + "." + secStr.substring(2) : "";
		const sec = parseFloat(secStr || 0);
		return sign * (deg + min / 60 + sec / 3600);
	}

	// Hemisphere degree
	if (code === 9117)
		return signFromHemisphere(value[0]) * parseFloat(value.substring(1));

	// Degree hemisphere
	if (code === 9116)
		return signFromHemisphere(value[value.length - 1]) * parseFloat(value.substring(0, value.length - 1));

	return null;
}