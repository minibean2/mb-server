var users = require("../models/userModel");
var categories = require("../models/categoryModel");

module.exports = function (app) {

    app.get("/api/ping", function (req, res) {
        res.status(200).send("pong");
    });

    app.get("/api/initAdminUsers", function (req, res) {

        users.count(function (err, count) {
            // empty collection, seed
            if (!err && count === 0) {
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

                users.create(adminUsers, function (err, results) {
                    res.send(results);
                })
            } else {
                res.send("Users collection not empty.");
            }
        });
    });

    app.get("/api/initCategories", function (req, res) {

        categories.count(function (err, count) {
            // empty collection, seed
            if (!err && count === 0) {
                var cats = [
                    {
                        name: "懷孕分娩",
                        created_date: new Date()
                    },
                    {
                        name: "育兒資訊",
                        created_date: new Date()
                    },
                    {
                        name: "學習教育",
                        created_date: new Date()
                    },
                    {
                        name: "親子生活",
                        created_date: new Date()
                    },
                    {
                        name: "娛樂名人",
                        created_date: new Date()
                    },
                    {
                        name: "增廣見聞",
                        created_date: new Date()
                    },
                    {
                        name: "女人語",
                        created_date: new Date()
                    }
                ];

                categories.create(cats, function (err, results) {
                    res.send(results);
                })
            } else {
                res.send("Categories collection not empty.");
            }
        });
    });
}

