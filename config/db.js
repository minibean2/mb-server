const env = require('get-env')();

var dbConfig = "";
if (env === 'prod') {
	dbConfig = require("../config/db_prod");
} else {
	dbConfig = require("../config/db_dev");
}

module.exports = Object.freeze({

	getDbConnectionString: function () {
		return "mongodb://" + dbConfig.username + ":" + dbConfig.password + "@" + dbConfig.url + "/" + dbConfig.name;
	}

});