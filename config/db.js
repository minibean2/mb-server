const env = require('get-env')();
var mongoose = require("mongoose");
var config = "";
if (env === 'dev') {
	config = require("../config/config_dev");
}else{
	config = require("../config/config_prod");
}

mongoose.connect(config.getDbConnectionString());