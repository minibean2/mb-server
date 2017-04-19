/*Crated By Vinod
 Date-20-03-2017
 Article Controller
 */

var articles = require("../models/searchResultModel");

module.exports = function (app) {

    /*Created By Vinod
     Get articles
     */
    app.get("/api/search", function (req, res) {
        var searchKey = parseInt(req.param('searchKey'));

        // TODO - fill in search logic
        var results = [
            {
                title: "miniBean Search Result 1",
                desc: "miniBean Search Result 1",
                url: "http://www.minibean.hk"
            },
            {
                title: "miniBean Search Result 2",
                desc: "miniBean Search Result 2",
                url: "http://www.minibean.hk"
            },
            {
                title: "miniBean Search Result 3",
                desc: "miniBean Search Result 3",
                url: "http://www.minibean.hk"
            }
        ];

        var data = {
            statusCode: "200",
            res: results,
            message: "Search Results"
        }
        res.send(data);
    })

}
