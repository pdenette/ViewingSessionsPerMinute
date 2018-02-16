"use strict";

let convict = require('convict');
// Initialize Convict to allow filepath command line parameter
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
config.validate({allowed: 'strict'});

// Read Lines from PLBSepLogs
let fs = require('fs');
let stream = fs.createReadStream(config.get("logfilepath") +"plb.sep_single.log", {flags: 'r', encoding: 'utf-8'});
let buf = '';
stream.on('data', function(d) {
  buf += d.toString(); // when data is read, stash it in a string buffer
  pump(); // then process the buffer
});

function pump() {
  let pos;

  while ((pos = buf.indexOf('\n')) >= 0) { // keep going while there's a newline somewhere in the buffer
      if (pos == 0) { // if there's more than one newline in a row, the buffer will now start with a newline
          buf = buf.slice(1); // discard it
          continue; // so that the next iteration will start with data
      }
      
      let line = buf.slice(0,pos);

      if (RegExp("reqBegin.+?(?=POST).+?ViewingSession\"").test(line)) {
        processLine(line); // hand off the line
      }

      buf = buf.slice(pos+1); // and slice the processed data off the buffer
  }
}

function processLine(line) { // here's where we do something with a line

        let SHITINEED=JSON.parse(line).time; // do something with the data here!
        console.log(SHITINEED);
}

//

function parseLine() {

}

(function main() {
    if (config.get("logfilepath") === "") {
        console.error("No filepath specified.");
        process.exit(1);
    }

    console.log(config.get("logfilepath"));
})();
