const forEach = require("./forEachEntryInEPSG.js");
const csNameToObj = require("./utils/csNameToObj.js");
const csUomToMultiplier = require("./utils/csUomToMultiplier.js");

forEach(`
	SELECT cs.coord_sys_code AS id,
		cs.coord_sys_name as name
	FROM epsg.epsg_coordinatesystem as cs
	WHERE cs.coord_sys_type = 'vertical'
`, (result) => {
	const name = result.name.toLowerCase();

	// Local depth is measured from the reference point which we can't get.
	// I don't think that files with such CS should be supported.
	if (name.includes("local depth"))
		return;

	const cs = csNameToObj(name);
	const uom = cs.uom && cs.uom[0];

	if (!uom)
		return;

	let m = 1;

	const orientation = cs.orientation && cs.orientation[0]
	const axis = cs.axis && cs.axis[0];

	if (orientation)
		m = orientation.includes("u") ? 1 : -1;
	else if (axis?.includes("d")) // If no orientation, and axis is depth
		m = -1;

	const { m: uomM } = csUomToMultiplier(uom);
	return uomM ? m * uomM : undefined;
}, "VerticalCS", `/**
* Maps vertical CS codes to height/depth multipliers. Resulting value always points up.
* @type {Object}
*/
`);