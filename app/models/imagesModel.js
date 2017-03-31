var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var imageSchema = new Schema({
    url : String,
    created_date: Date
});

var images = mongoose.model("images", imageSchema);

module.exports = images;