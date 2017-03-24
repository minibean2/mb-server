var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var categorySchema = new Schema({
    name : String
});

var categories = mongoose.model("categories", categorySchema);

module.exports = categories;