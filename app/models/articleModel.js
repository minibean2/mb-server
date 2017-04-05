var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var articleSchema = new Schema({
    title : String,
    preview : String,
    images : Array,
    category : Object,
    categoryId: String,
    imageURL : String,
    body : String,
    status: Boolean,
    featured: Boolean,
    post_date: Date,
    created_date : Date
});

var articles = mongoose.model("articles", articleSchema);

module.exports = articles;