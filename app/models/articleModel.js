var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var articleSchema = new Schema({
    title : String,
    preview : String,
    category : Object,
    thumbnailUrl : String,
    imageUrl : String,
    body : String,
    published: Boolean,
    featured: Boolean,
    post_date: Date,
    created_date : Date
});

var articles = mongoose.model("articles", articleSchema);

module.exports = articles;