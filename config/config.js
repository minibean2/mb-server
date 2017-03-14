var dbConfig = require("./db.json");

module.exports = {

    getDbConnectionString: function() {
        return "mongodb://" + dbConfig.username + ":" + dbConfig.password + "@" + dbConfig.url + "/" + dbConfig.name;
    }

}