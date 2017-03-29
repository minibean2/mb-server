var express = require("express");
var app = express();
var mongoose = require("mongoose");
var config = require("../config/config");
var bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
var jwt    = require('jsonwebtoken');

var initController = require("./controllers/initController");
var categoryController = require("./controllers/categoryController");
var articleController = require("./controllers/articleController");
var imageController = require("./controllers/imageController");

var port = process.env.PORT || 3000;

app.use("/assets", express.static(__dirname + "/public"));

app.set("view engine", "ejs");

app.set('superSecret', config.getSecret());
app.use(fileUpload());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true ,limit: '50mb'}));

mongoose.connect(config.getDbConnectionString());

initController(app);
categoryController(app);
articleController(app);
imageController(app);

app.listen(port);

