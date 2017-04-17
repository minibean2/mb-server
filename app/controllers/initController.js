var users = require("../models/userModel");
var categories = require("../models/categoryModel");
var config = require("../../config/config");

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
                        type: constants.CATEGORY_TYPE_CATEGORY,
                        imageUrl: config.IMAGE_BASE_URL + "懷孕分娩.jpg",
                        seq: 1,
                        created_date: new Date()
                    },
                    {
                        name: "育兒資訊",
                        type: constants.CATEGORY_TYPE_CATEGORY,
                        imageUrl: config.IMAGE_BASE_URL + "育兒資訊.jpg",
                        seq: 2,
                        created_date: new Date()
                    },
                    {
                        name: "學習教育",
                        type: constants.CATEGORY_TYPE_CATEGORY,
                        imageUrl: config.IMAGE_BASE_URL + "學習教育.jpg",
                        seq: 3,
                        created_date: new Date()
                    },
                    {
                        name: "親子生活",
                        type: constants.CATEGORY_TYPE_CATEGORY,
                        imageUrl: config.IMAGE_BASE_URL + "親子生活.jpg",
                        seq: 4,
                        created_date: new Date()
                    },
                    {
                        name: "娛樂名人",
                        type: constants.CATEGORY_TYPE_CATEGORY,
                        imageUrl: config.IMAGE_BASE_URL + "娛樂名人.jpg",
                        seq: 5,
                        created_date: new Date()
                    },
                    {
                        name: "增廣見聞",
                        type: constants.CATEGORY_TYPE_CATEGORY,
                        imageUrl: config.IMAGE_BASE_URL + "增廣見聞.jpg",
                        seq: 6,
                        created_date: new Date()
                    },
                    {
                        name: "女人語",
                        type: constants.CATEGORY_TYPE_CATEGORY,
                        imageUrl: config.IMAGE_BASE_URL + "女人語.jpg",
                        seq: 7,
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

