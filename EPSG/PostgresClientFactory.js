const {Client} = require("pg");
const argConnectionParams = require("../dbConnectionParams.js");
const {workerData} = require("worker_threads");
let connectionParams = (argConnectionParams) ? argConnectionParams : workerData;

/**
 * Creates new client for Postgres database
 * @return {Promise<Client>}
 */
module.exports = async function () {
	let client;
	try {
		client = new Client(connectionParams);
		await client.connect();
	} catch (e) {
		console.error(e);
		console.error("Can't connect to the database! See error above for more information.");
		process.exit(1);
	}
	return client;
}