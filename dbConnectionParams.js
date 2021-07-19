let connectionParams = {
	user: "user",
	host: "localhost",
	database: "postgres",
	password: "12345",
	port: 5432,
}

for (let param in connectionParams) {
	if (!connectionParams.hasOwnProperty(param))
		continue;

	let index = process.argv.indexOf("--" + param);
	if (index === -1)
		continue;

	let value = process.argv[index + 1];
	if (param === "port")
		value = parseFloat(value);
	connectionParams[param] = value;
}

/**
 * Database connection parameters parsed from CLI arguments.
 * If imported in a worker thread, will be null.
 * @type {Object|null}
 */
module.exports = (process.argv.length === 2) ? null : connectionParams;