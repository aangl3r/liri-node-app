require("dotenv").config();

var keys = require("./keys.js");
var spotifyAPI = require("node-spotify-api");
//var spotify = new Spotify(keys.spotify);
var fs = require("fs");
var logFile = "./log.txt";
var request = require("request");


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

//command function calls

switch (command) {

    case "concert-this":
        doConcert();
        break;

    case "spotify-this-song":
        doSpotify();
        break;

    case "movie-this":
        doMovie();
        break;

    case "do-what-it-says":
        doWhat();
        break;
}


//movie retrieval from OMDB
function doMovie() {
    var queryUrl = "http://www.omdbapi.com/?t=" + argument + "&y=&plot=short&apikey=trilogy";

    request(queryUrl, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            var body = JSON.parse(body);

            console.log("Title: " + body.Title);
            console.log("Release Year: " + body.Year)
            console.log("IMdB Rating: " + body.imdbRating);
            console.log("Rotten Tomatoes Rating: " + body.Ratings[2].Value);
            console.log("Country: " + body.Country);
            console.log("Language: " + body.Language);
            console.log("Plot: " + body.Plot);
            console.log("Actors: " + body.Actors);
        }
        else {
            console.log("error")
        }
    })
}

