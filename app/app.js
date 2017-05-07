const env = require('get-env')();
var express = require("express");
var cors = require('cors')
var app = express();

var config = "";
if (env === 'prod') {
    console.log("Running in Prod mode");
    config = require("../config/config_prod");
} else {
    console.log("Running in Dev mode");
    config = require("../config/config_dev");
}

var bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');

// database
var db = require("../config/db");
var mongoose = require("mongoose");
mongoose.connect(db.getDbConnectionString());

// aws
var aws = require("../config/aws");

var initController = require("./controllers/initController");
var adminController = require("./controllers/adminController");
var categoryController = require("./controllers/categoryController");
var articleController = require("./controllers/articleController");
var searchController = require("./controllers/searchController");
var imageController = require("./controllers/imageController");

var port = process.env.PORT || config.getAppDefaultPort();

app.use(cors());
app.use("/assets", express.static(__dirname + "/public"));

app.set("view engine", "ejs");

app.set('superSecret', config.getSecret());
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(bodyParser.json());
app.use(fileUpload());

// Allow CORS
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,accept,access_token,X-Requested-With");
    next();
});

initController(app);
adminController(app);
categoryController(app);
articleController(app);
searchController(app);
imageController(app);

app.listen(port);

