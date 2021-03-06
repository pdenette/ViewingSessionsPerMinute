"use strict";

let convict = require('convict');
let config = convict({
	env: {
		doc: "The application environment.",
		format: ["production", "development", "test"],
		default: "development",
		env: "NODE_ENV",
		arg: "env"
	},
	logfilepath: {
		doc: "The PrizmDoc log filepath.",
		format: "*",
		default: "",
		env: "LOG_FILEPATH",
		arg: "logfilepath"
	}
});

// Perform validation
config.validate({ allowed: 'strict' });

// main()
(function main() {
	if (config.get("logfilepath") === "") {
		console.error("No filepath specified.");
		process.exit(1);
	}

	let readline = require('readline').createInterface({
		input: require('fs').createReadStream(config.get("logfilepath") + "plb.sep_single.log")
	});

	let lines = [];

	readline.on("line", function (line) {
		if (RegExp("reqBegin.+?(?=POST).+?ViewingSession\"").test(line)) {
			lines.push(JSON.parse(line).time);
		}
	});
	readline.on("close", function () {
		let moment = require("moment")

		let logStartDate = lines[0];
		let logStartDateParsed = moment(logStartDate);

		console.log(logStartDateParsed);

		let logEndDate = lines[lines.length - 1];
		let logEndDateParsed = moment(logEndDate);

		console.log(logEndDateParsed);

		let DateDifference = moment.duration(logEndDateParsed.diff(logStartDateParsed));
		let TotalMinutes = Math.floor(DateDifference.asMinutes());

		console.log(lines.length / TotalMinutes);
	})
})();
