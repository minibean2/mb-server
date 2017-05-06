var dbConfig = require("./db.json");
module.exports = Object.freeze({

    getDbConnectionString: function() {
        return "mongodb://" + dbConfig.username + ":" + dbConfig.password + "@" + dbConfig.url + "/" + dbConfig.name;
    },

    getSecret : function() {
    	return "mbToken";
    },

    getAppDefaultPort : function() {
        return 9000;
    },

    IMAGE_BASE_URL: "http://www.minibean.com.hk/images/"
});