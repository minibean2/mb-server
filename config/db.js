const env = require('get-env')();

var dbConfig = "";
if (env === 'dev') {
	dbConfig = require("../config/db_dev");
} else {
	dbConfig = require("../config/db_prod");
}

module.exports = Object.freeze({

	getDbConnectionString: function () {
		return "mongodb://" + dbConfig.username + ":" + dbConfig.password + "@" + dbConfig.url + "/" + dbConfig.name;
	}

});