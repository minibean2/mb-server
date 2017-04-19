var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var searchResultSchema = new Schema({
    title : String,
    desc : String,
    url : String
});

var searchResults = mongoose.model("searchResults", searchResultSchema);

module.exports = searchResults;