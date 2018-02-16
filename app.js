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

//

function readFile() {


}

function parseLine() {

}

(function main() {
    if (config.get("logfilepath") === "") {
        console.error("No filepath specified.");
        process.exit(1);
    }

    console.log(config.get("logfilepath"));
})();
