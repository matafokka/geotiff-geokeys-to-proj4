/**
 * Parses CS name. Returns key-value pairs.
 * @param {string} name CS name
 * @returns {Record<string, string>} Parsed CS params
 */
module.exports = function csNameToObj(name) {
	// For some reason, CS parameters are merged into one string instead of being split to the columns
	// Example:
	// Ellipsoidal 3D CS. Axes: latitude, longitude, ellipsoidal height. Orientations: north, east, up. UoM: degree, degree, metre.
	// Let's just hope this structure won't change later, ha-ha.

	let sentencesStr = name.toLowerCase(); // Normalize string, though, it already seems normalized
	if (sentencesStr.endsWith("."))
		sentencesStr = sentencesStr.substring(0, sentencesStr.length - 1);
	const sentences = sentencesStr.split(". ");

	// Split each sentence into parameter name (string before column) and values separated by a comma
	const cs = {};
	for (const sentence of sentences) {
		let paramName = "", columnIndex = 0;

		for (const symbol of sentence) {
			columnIndex++; // Accounting space
			if (symbol === ":")
				break;
			paramName += symbol;
		}

		cs[paramName] = sentence.substring(columnIndex + 1).split(", ");
	}

	return cs;
}