var tz = require("tz-lookup");
var bodyParser = require("body-parser");
var moment = require("moment-timezone");

var app = require("./app");

// host static files
app.use(require("express").static('static'));

// body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", function(req, res) {
    res.redirect("/index.html");
});

app.post("/tz", function(req, res) {
    if (!req.body.lng) {
        return res.status(400).send({error: "Missing 'long' POST parameter"});
    }
    if (!req.body.lat) {
        return res.status(400).send({error: "Missing 'lat' POST parameter"});
    }

    var timezone = tz(req.body.lat, req.body.lng);

    return res.status(200).send({
        timezone: timezone,
        now: moment().tz(timezone).format(),
        latitude: req.body.lat,
        longitude: req.body.lng
    });
});




// 404 must happen last
app.use(function (req, res, next) {
  res.status(404).send("Sorry can't find that!")
})