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
        var start = parseInt(req.query['start']);
        var limit = parseInt(req.query['limit']);
        articles.find({}, null, {
            skip: start,
            limit: limit,
            sort: {
                post_date: -1
            }
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
        });
    })

    /*Created By Vinod
     Get article by id
     */
    app.get("/api/article", function (req, res) {
        articles.findById(req.query['articleId'], function (err, result) {
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
    });

    /*Created By Vinod
     Save article
     */
    app.post("/api/article/save", function (req, res) {
        var article = req.body;

        if (article.post_date == undefined || article.post_date == '') {
            article.post_date = new Date();
        }

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
        });
    });

    /*Created By Vinod
        update article by id
    */
    app.post("/api/article/update/:articleId", function (req, res) {
        var articleId = req.params.articleId;
        var article = req.body;
        articles.update({ "_id": articleId }, article, function (err, num) {
            if (err) {
                res.status(500).send(err);
            }
            var data = {
                statusCode: "200",
                res: num,
                message: "Article updated"
            }

            res.send(data);
        });
    });


    /*Created By Vinod
     Get article by category id
     */
    app.get("/api/article/category/:categoryId", function (req, res) {
        var start = parseInt(req.query['start']);
        var limit = parseInt(req.query['limit']);
        var categoryId = req.params.categoryId;

        articles.find({ "category.id": categoryId }, null, {
            skip: start,
            limit: limit,
            sort: {
                post_date: -1
            }
        }, function (err, results) {
            if (err) {
                res.status(500).send(err);
            }
            var data = {
                statusCode: "200",
                res: results,
                message: "Article by category id"
            }
            res.send(data);
        });
    });

    /*Created By Vinod
     Delete article by id
     */
    app.get("/api/article/delete/:articleId", function (req, res) {
        var articleId = req.params.articleId;

        articles.remove({ "_id": articleId }, function (err, result) {
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

    /*Created By Vinod
      Get featured articles
    */
    app.get("/api/featured-articles", function (req, res) {
        articles.find({ "featured": true }, null, {
            sort: {
                post_date: -1
            }
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
        });
    })

    /*Created by Vinod
    Update featured
    */
    app.post("/api/featured-articles/update", function (req, res) {

        var obj = req.body;
        var article = obj.articles;
        if (!article) {
            article = [];
        }
        articles.update({}, { featured: false }, { multi: true },
            function (err, num) {
                if (article.length == 0) {
                    return res.send("no record to update");
                }
                var count = article.length;
                var length = 0;

                for (var i = 0; i < article.length; i++) {
                    length++;
                    articles.update({ "_id": article[i] }, { featured: true },
                        function (err, num) {
                        });
                }

                res.send("update record...");
            });
    });

}
