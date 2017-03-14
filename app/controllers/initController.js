var Users = require("../models/userModel");

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
                created_date: new Date()
            }
        ];

        Users.create(adminUsers, function(err, results) {
            res.send(results);
        })

    });

}

