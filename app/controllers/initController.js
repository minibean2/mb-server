var Users = require("../models/userModel");
var Categories = require("../models/categoryModel");

module.exports = function(app) {

    app.get("/api/initAdminUsers", function(req, res) {

        // seed database
        var adminUsers = [
            {
                login: "admin",
                password: "admin",
                lastname: "admin",
                firstname: "minibean",
                email: "",
                mobile: "",
                active: true,
                created_date: new Date()
            }
        ];

        Users.create(adminUsers, function(err, results) {
            res.send(results);
        })

    });

    app.get("/api/initCategories", function(req, res) {

        // seed database
        var categories = [
            {
                name: "Baby Shower",
                created_date: new Date()
            },
            {
                name: "Education",
                created_date: new Date()
            },
            {
                name: "Food",
                created_date: new Date()
            },
            {
                name: "Sports",
                created_date: new Date()
            },
            {
                name: "Books",
                created_date: new Date()
            }
        ];

        Categories.create(categories, function(err, results) {
            res.send(results);
        })

    });
}

