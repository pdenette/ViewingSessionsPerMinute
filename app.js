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
	let viewingsessiondatetimearray = [];
	let fs = require('fs');
	let stream = fs.createReadStream(config.get("logfilepath") + "plb.sep_single.log", { flags: 'r', encoding: 'utf-8' });
	let buf = '';

	stream.on('data', function (d) {
		buf += d.toString(); // when data is read, stash it in a string buffer
		let pos;
		while ((pos = buf.indexOf('\n')) >= 0) { // keep going while there's a newline somewhere in the buffer
			if (pos == 0) { // if there's more than one newline in a row, the buffer will now start with a newline
				buf = buf.slice(1); // discard it
				continue; // so that the next iteration will start with data
			}
			let line = buf.slice(0, pos);
			if (RegExp("reqBegin.+?(?=POST).+?ViewingSession\"").test(line)) {
				let viewingsessiondatetime = JSON.parse(line).time; // do something with the data here!
				viewingsessiondatetimearray.push(viewingsessiondatetime);
			}
			buf = buf.slice(pos + 1); // and slice the processed data off the buffer
		}
	});

	stream.on("end", function () {
		stream.close();
		let moment = require("moment")
		console.log(viewingsessiondatetimearray[0]);
		console.log(viewingsessiondatetimearray[viewingsessiondatetimearray.length - 1]);
		let totalminutes = (viewingsessiondatetimearray[viewingsessiondatetimearray.length - 1]) - (viewingsessiondatetimearray[0]);
		console.log(totalminutes);
	})
})();
