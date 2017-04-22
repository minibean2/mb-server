var Users = require("../models/userModel");
var jwt = require('jsonwebtoken');

module.exports = function (app) {

    /*Created By Vinod
        Date-20-03-2017
        user login
        req-username and password
    */
    app.get("/api/login", function (req, res) {

        var user = {
            login: req.query['username'],
            password: req.query['password']
        }
        Users.find(user, function (err, results) {
            if (err) {
                res.send(500, { error: err });
            }
            if (results.length == 0) {
                res.send(500, { error: "Invalid username and/or password" });
            } else {
                var token = jwt.sign(user, app.get('superSecret'), {
                });

                var data = {
                    statusCode: "200",
                    res: results,
                    token: token,
                    message: "Login successfully"
                }

                res.send(data);
            }
        });

    });
}

