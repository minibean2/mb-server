var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var articleSchema = new Schema({
    articleName : String,
    description : String,
    images      : Array,
    categoryId  : String,
    imageURL    : String,
    body        : String,
    created_date: Date
});

var articles = mongoose.model("articles", articleSchema);

module.exports = articles;