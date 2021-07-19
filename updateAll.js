/*
This script updates database from scripts from epsg.org, updates local files from that database and rebuilds the project.
Unfortunately, we can't pass CLI args to chained commands (npm limitation), that's why this script exists
*/

const spawnSync = require("child_process").spawnSync;

const buildScript = "npm run-script build"; // This one is exception, we shouldn't pass anything to it
const scripts = ["node postgres_prep/prepareData.js", "npm run-script update-existing", buildScript];
const options = {stdio: "inherit"};
const args = process.argv.slice(2);

for (let script of scripts) {
	let split = script.split(" ");
	let command = split[0]; // Only program name should be in command, other stuff goes to args
	if (command === "npm" && process.platform === "win32") // Solves bug in npm for Windows
		command = "npm.cmd";

	let newArgs = split.slice(1);
	newArgs.push("--");
	if (script !== buildScript)
		newArgs = newArgs.concat(args);

	let res = spawnSync(command, newArgs, options);
	if (res.error) {
		console.error(res.error);
		break;
	}
}