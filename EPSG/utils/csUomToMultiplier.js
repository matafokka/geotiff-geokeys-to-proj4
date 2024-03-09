const Units = require("../data/Units.js");

module.exports = function csUomToMultiplier(uom) {
	let m = 0, isAngle = false;

	if (uom === "deg" || uom === "degree" || uom === "degrees") { // Can't just find deg because there're degree with hemisphere and dec degree
		m = 1;
		isAngle = true;
	} else if (uom.includes("grad") || uom.includes("gon")) {
		m = Units["9105"].m * 180 / Math.PI;
		isAngle = true;
	} else if (uom.includes("rad")) { // grad handled by previous case
		m = Units["9101"].m * 180 / Math.PI;
		isAngle = true;
	} else if (uom === "m" || uom.includes("met"))
		m = 1;
	else if (uom.includes("br36"))
		m = 0.3048007491; // British feet (1936)
	else if (uom === "ft")
		m = 0.3048;
	else if (uom === "ftus")
		m = 0.3048006096;
	else if (uom === "ydind")
		m = 0.3047995;
	else if (uom === "ftcla")
		m = 0.3047972654;
	else if (uom === "ydcl")
		m = 3.3047972654;
	else if (uom === "chbnb")
		m = Units["9042"].m;
	else if (uom === "chse")
		m = 20.1167651215526;
	else if (uom === "chse(t)")
		m = 20.116756;
	else if (uom === "ftgc")
		m = 0.304799710181509;
	else if (uom === "ftse")
		m = 0.304799471538676;
	else if (uom === "km")
		m = 1000;
	else if (uom === "lkcla")
		m = 0.201166195164;
	else if (uom === "ydse")
		m = 0.914398414616029;
	else if (uom === "glm")
		m = 1.0000135965;
	else if (uom === "lk")
		m = 0.201168;

	// Uoms don't use other units than specified above for now, but let's kinda future-proof it
	if (uom.includes("μ") || (isAngle && uom.includes("m")))
		m *= 0.000001;

	return { m, isAngle };
}