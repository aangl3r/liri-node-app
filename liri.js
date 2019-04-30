require("dotenv").config();

var keys = require("./keys.js");
var spotifyAPI = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
var fs = require("fs");
var logFile = "./log.txt"


//npm simple-node-logger
var log = require("simple-node-logger").createSimpleFileLogger(logFile);
log.setLevel("all");


//taking input from the console
var nodeArg = process.argv
var command = nodeArg[2];
var argument = nodeArg[3];

for (var i = 4; i < nodeArg.length; i++) {
    argument += "+" + nodeArg[i];
}

