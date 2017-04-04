/*Crated By Vinod
 Date-20-03-2017
 Article Controller
 */

var articles = require("../models/articleModel");

module.exports = function (app) {

    /*Created By Vinod
     Get articles
     */
    app.get("/api/articles", function (req, res) {
        res.header("Access-Control-Allow-Origin", "*");

        var start = parseInt(req.param('start'));
        var limit = parseInt(req.param('limit'));
        var token = req.body.token || req.query.token || req.headers['x-access-token'];
        /*jwt.verify(token, app.get('superSecret'), function(err, decoded) {
         if (err) {
         return res.status(500).send("invalid token");
         }*/
        articles.find({}, null, {
            skip: start,
            limit: limit
        }, function (err, results) {
            if (err) {
                res.status(500).send(err);
            }
            var data = {
                statusCode: "200",
                res: results,
                message: "Articles"
            }
            res.send(data);
        })
        //});
    })

    /*Created By Vinod
     Get article by id
     */
    app.get("/api/article", function (req, res) {
        res.header("Access-Control-Allow-Origin", "*");
        var token = req.body.token || req.query.token || req.headers['x-access-token'];
        /*jwt.verify(token, app.get('superSecret'), function(err, decoded) {
         if (err) {
         return res.status(500).send("invalid token");
         }*/
        articles.findById(req.param('articleId'), function (err, result) {
            if (err) {
                res.status(500).send(err);
            }
            var data = {
                statusCode: "200",
                res: result,
                message: "Article"
            }

            res.send(data);
        });
        //});
    });

    /*Created By Vinod
     Save article
     */
    app.post("/api/article/save", function (req, res) {
        res.header("Access-Control-Allow-Origin", "*");
        var article = req.body;
        var token = req.body.token || req.query.token || req.headers['x-access-token'];
        /*jwt.verify(token, app.get('superSecret'), function(err, decoded) {
         if (err) {
         return res.status(500).send("invalid token");
         } */
        articles.create(article, function (err, result) {
            if (err) {
                res.status(500).send(err);
            }
            var data = {
                statusCode: "200",
                res: result,
                message: "Article"
            }

            res.send(data);
        })
        //});
    });

    /*Created By Vinod
     Get article by category id
     */
    app.get("/api/article/category/:categoryId", function (req, res) {
        res.header("Access-Control-Allow-Origin", "*");
        var categoryId = req.params.categoryId;
        var token = req.body.token || req.query.token || req.headers['x-access-token'];
        /*jwt.verify(token, app.get('superSecret'), function(err, decoded) {
         if (err) {
         return res.status(500).send("invalid token");
         } */
        articles.find({categoryId: categoryId}, function (err, results) {
            if (err) {
                res.status(500).send(err);
            }
            var data = {
                statusCode: "200",
                res: results,
                message: "Article by category id"
            }
            res.send(data);
        })
        //});
    });

    /*Created By Vinod
     Delete article by id
    */

    app.get("/api/article/delete/:articleId", function (req, res) {
        res.header("Access-Control-Allow-Origin", "*");
        var articleId = req.params.articleId;

        articles.remove({"_id":articleId}, function(err, result){
            if (err) {
                res.status(500).send(err);
            }
            var data = {
                statusCode: "200",
                res: result,
                message: "delete article"
            }
            res.send(data);
        });

    });
}
