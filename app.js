"use strict";

(function main() {
    promptUser();
})();

function readFile() {

}

function parseLine() {

}

function promptUser() {
    let readline = require('readline');
    let rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    
    let answer;

    rl.question("What do you think of Node.js? ", function(input) {
        answer = input;
        rl.close();
    });

}
