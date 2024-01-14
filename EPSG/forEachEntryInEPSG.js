const fs = require("fs");
const clientFactory = require("./PostgresClientFactory.js");

/**
 * Runs given query on a database, calls a callback for each row and writes received data to the file.
 *
 * A callback should accept received data and return data to write to the file. To skip an entry, callback should return false.
 *
 * @param query {string} Query to run. For a column containing EPSG code, create an alias called "id", i.e. `SELECT crs.coord_ref_sys_code AS id FROM epsg.epsg_coordinatereferencesystem AS crs`
 * @param callback {function(Object, Object)} A callback. First argument accepts current record and second - current object which will be written to the specified file.
 * @param filename {string} Name of the file without ".js' extension to write to
 * @param comment {string} Comment to append to the file
 * @param afterAll {(obj: Object) => void} Called after all entries has been processed
 */
module.exports = async function (query, callback, filename, comment = "", afterAll = undefined) {
	let client = await clientFactory();
	let object = {};
	client.query(query, async (err, res) => {
		if (err) {
			console.error(err);
			process.exit(1);
		}

		for (let result of res.rows) {
			if (result.id === undefined)
				throw new Error("ID is not defined. Create an alias for a column that should be used as an ID.");

			let v = await callback(result, object);
			if (v !== undefined)
				object[result.id] = v;
		}

		if (afterAll)
			await afterAll(object);

		client.end();

		fs.writeFileSync(`EPSG/data/${filename}.js`, `
// WARNING: This file has been generated automatically

${comment}
module.exports = ${JSON.stringify(object)}`);
	});

}