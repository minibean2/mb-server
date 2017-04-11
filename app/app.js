var express = require("express");
var app = express();

var config = require("../config/config");
var bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');

// database
var db = require("../config/db");

var initController = require("./controllers/initController");
var adminController = require("./controllers/adminController");
var categoryController = require("./controllers/categoryController");
var articleController = require("./controllers/articleController");
var imageController = require("./controllers/imageController");

var port = process.env.PORT || config.getAppDefaultPort();

app.use("/assets", express.static(__dirname + "/public"));

app.set("view engine", "ejs");

app.set('superSecret', config.getSecret());
app.use(fileUpload());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true ,limit: '50mb'}));

initController(app);
adminController(app);
categoryController(app);
articleController(app);
imageController(app);

app.listen(port);

