var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var userSchema = new Schema({
    login: String,
    password: String,
    lastname: String,
    firstname: String,
    email: String,
    mobile: String,
    created_date: Date
});

var Users = mongoose.model("Users", userSchema);

module.exports = Users;