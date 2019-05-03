require("dotenv").config();

var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var fs = require("fs");
var logFile = "./log.txt";
var request = require("request");
var moment = require("moment");


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
function doMovie(argument) {
    if (!argument) {
        argument = "Mr. Nobody"
    }
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

function doSpotify(argument) {
    var spotify = new Spotify(keys.spotify);
    if (!argument) {
        argument = "Good Christians Don't Get Jiggy With It 'Til After Marriage"
    }
    spotify.search(
        {
            type: "track",
            query: argument
        },
        function (error, data) {
            if (error) {
                console.log("error")
                return;
            }
            var song = data.tracks.items;

            console.log("Song name: " + song[0].name);
            console.log("Artist: " + song[0].artists[0].name);
            console.log("Preview: " + song[0].preview_url);
            console.log("Album: " + song[0].album.name);
            console.log("__________End_Of_Data__________");

        }
    )
}

function doConcert(argument) {
    if (!argument) {
        console.log("enter an argument")
    }
    var queryUrl = "https://rest.bandsintown.com/artists/" + argument + "/events?app_id=codingbootcamp";

    request(queryUrl, function (error, response, data) {

        if (!error && response.statusCode === 200) {
            var data = JSON.parse(data);

            for (var i = 0; i < data.length; i++){

            console.log(data[i].venue.name);
            console.log(data[i].venue.city + ", " + data[i].venue.country);
            console.log(moment(data[i].datetime).format("L"));
            console.log("____________________")
            }
        }
        else {
            console.log("error");
        }
    })
}

function doWhat() {
    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
            return console.log(error);
        }

        var arr = data.split(",");
        console.log(arr);
        console.log(arr[1]);

        if (arr[0] === "spotify-this-song") {
            doSpotify(arr[1]);
        }
        else if (arr[0] === "movie-this") {
            var getMovie = arr[1].slice(1, -1);
            doMovie(getMovie);
        }
        else if (arr[0] === "concert-this") {
            var getConcert = arr[1].slice(1, -1);
            doConcert(getConcert);
        }
    });
}