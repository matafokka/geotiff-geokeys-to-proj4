/* This script updates Postgres database from scripts from this directory. Drop SQL files here and run "npm run-script update-all". */

const fs = require("fs");
const dbParams = require("../dbConnectionParams.js");
const clientFactory = require("../EPSG/PostgresClientFactory.js");

const names = ["Table", "Data", "FKey"];

(async function () {
	let client = await clientFactory();
	// Drop existing schema and create a new one
	await client.query(`DROP SCHEMA IF EXISTS epsg CASCADE`);
	await client.query(`CREATE SCHEMA epsg AUTHORIZATION ${dbParams.user}`);

	// Import stuff
	for (let name of names) {
		let fileName = __dirname + `/PostgreSQL_${name}_Script.sql`;
		// Read file, convert buffer to string and remove freaking BOM which makes postgres throw syntax error
		let script = fs.readFileSync(fileName).toString().replace("\uFEFF", "");
		await client.query("\nSET SCHEMA 'epsg';\n\n" + script);
	}
	client.end();
})();