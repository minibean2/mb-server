var express = require("express");
var app = express();
var mongoose = require("mongoose");
var config = require("../config/config");

var initController = require("./controllers/initController");

var port = process.env.PORT || 3000;

app.use("/assets", express.static(__dirname + "/public"));

app.set("view engine", "ejs");

mongoose.connect(config.getDbConnectionString());

initController(app)

app.listen(port);

