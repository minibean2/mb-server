/*Crated By Vinod
 Date-20-03-2017
 Category Controller
 */

var categories = require("../models/categoryModel");

module.exports = function (app) {

    /*Created By Vinod
     Get all category
     */
    app.get("/api/categories", function (req, res) {
        categories.find({}, function (err, results) {
            if (err) {
                res.status(500).send(err);
            }
            res.send(results);
        });
    });

}
