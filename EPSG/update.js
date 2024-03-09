if (process.argv.indexOf("-h") !== -1 || process.argv.indexOf("--help") !== -1) {
	console.log(`
This script generates data from EPSG database.

How to generate data:
	1. Set up PostgreSQL. This script doesn't support other databases.
	2. Download PostgreSQL database (archive with scripts) from epsg-registry.org.
	3. Run scripts from the archive on "epsg" schema. Run scripts in order described in readme file in the archive.
	4. Run this script and provide connection parameters through its arguments.

Arguments:
	-h or --help    - Show this help and exit
	--host          - PostgreSQL host                      - Defaults to "localhost"
	--port          - PostgreSQL port                      - Defaults to "5432"
	--database      - Database containing "epsg" schema    - Defaults to "postgres"
	--user          - PostgreSQL database user             - Defaults to "user"
	--password      - Password for the user                - Defaults to "12345"
`);
	process.exit();
}

const {Worker} = require('worker_threads');
const baseDir = "./EPSG/";
const options = {workerData: require("../dbConnectionParams.js")};

// Fetch units first because all other entities depends on it
fetchLinearUnits();

function fetchLinearUnits() {
	let unitsWorker = new Worker(baseDir + "UnitsWorker.js", options);
	unitsWorker.on("exit", () => {
		new Worker(baseDir + "ConversionsWorker.js", options); // Conversions depends only on units, everything else depends on each other
		fetchBasicEntities();
	});
}

// Fetch ellipsoids and meridians on which all other entities depends
function fetchBasicEntities() {
	let files = [
		{name: "EllipsoidsWorker", completed: false},
		{name: "MeridiansWorker", completed: false},
		{name: "VerticalCSWorker", completed: false},
	];
	for (let file of files) {
		let w = new Worker(`${baseDir + file.name}.js`, options);
		w.on("exit", () => {
			file.completed = true;
			for (let f of files) {
				if (!f.completed)
					return;
			}
			fetchOtherEntities();
		});
	}
}

// Fetch all other entities. Each next entity depends on previous one.
async function fetchOtherEntities() {
	let files = ["DatumsWorker", "CRSWorker"];
	for (let file of files) {
		await new Promise(resolve => {
			let w = new Worker(`${baseDir + file}.js`, options);
			w.on("exit", () => {
				resolve();
			});
		})
	}
}