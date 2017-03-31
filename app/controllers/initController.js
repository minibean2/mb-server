var Users = require("../models/userModel");
var Categories = require("../models/categoryModel");
var jwt    = require('jsonwebtoken');

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

    /*Created By Vinod
        Date-20-03-2017
        user login
        req-username and password
    */
    app.get("/api/login", function(req, res){

        var user = {
            login    : req.param('username'),
            password : req.param('password')
        }

        res.header("Access-Control-Allow-Origin", "*");
        Users.find(user, function(err, results){
            if(err){
                res.send(500, { error: err });
            }
            if(results.length == 0){
                res.send(500, { error: "invalid username and/or password" });
            }else{
                var token = jwt.sign(user, app.get('superSecret'), {
                });

                var data = {
                    statusCode : "200",
                    res        : results,
                    token      : token,
                    message    : "login successfully...."
                }
                
                res.send(data);
            }         
        });

    });
}

