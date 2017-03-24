var express = require("express");
var app = express();
var mongoose = require("mongoose");
var config = require("../config/config");
var bodyParser = require('body-parser');

var initController = require("./controllers/initController");
var categoryController = require("./controllers/categoryController");
var articleController = require("./controllers/articleController");

var port = process.env.PORT || 3000;

app.use("/assets", express.static(__dirname + "/public"));

app.set("view engine", "ejs");

app.use(bodyParser.json())

mongoose.connect(config.getDbConnectionString());

initController(app);
categoryController(app);
articleController(app);

app.listen(port);

