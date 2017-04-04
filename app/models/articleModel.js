var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var articleSchema = new Schema({
    title: String,
    preview: String,
    images: Array,
    category: Object,
    categoryId: String,
    imageURL: String,
    body: String,
    featured: Boolean,
    published: Boolean,
    created_date: Date
});

var articles = mongoose.model("articles", articleSchema);

module.exports = articles;