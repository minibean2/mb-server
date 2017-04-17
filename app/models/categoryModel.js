var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var categorySchema = new Schema({
    name: String,
    type: String,
    imageUrl: String,
    seq: Number,
    created_date: Date
});

var categories = mongoose.model("categories", categorySchema);

module.exports = categories;