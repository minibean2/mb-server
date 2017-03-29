var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var articleSchema = new Schema({
    articleName : String,
    description : String,
    images      : Array,
    CategoryId  : String,
    body		: String

});

var articles = mongoose.model("articles", articleSchema);

module.exports = articles;