var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var imageSchema = new Schema({
    url : String
});

var images = mongoose.model("images", imageSchema);

module.exports = images;