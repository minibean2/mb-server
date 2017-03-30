/*Crated By Vinod
	Date-20-03-2017
	Article Controller
*/

var articles = require("../models/articleModel");
var jwt    = require('jsonwebtoken');

module.exports = function(app) {

	/*Created By Vinod
		Get all articale 
	*/
	app.get("/api/articles", function(req, res) {
		res.header("Access-Control-Allow-Origin", "*");

		var start = parseInt(req.param('start'));
		var end   = parseInt(req.param('end'));
		var token = req.body.token || req.query.token || req.headers['x-access-token'];
    	/*jwt.verify(token, app.get('superSecret'), function(err, decoded) { 
    		if (err) {
        		return res.status(500).send("invalid token");
      		}*/
			articles.find({},null,{
         		skip: start,
         		limit: end
      		}, function(err, results){
				if(err){
					res.status(500).send(err);
				}
				var data = {
                	statusCode : "200",
                	res        : results,
                	message    : "Articles"
            	}
				res.send(data);
			})
		//});
	})

	/*Created By Vinod
		Get articale by id
	*/
	app.get("/api/article", function(req, res){
		res.header("Access-Control-Allow-Origin", "*");
		var token = req.body.token || req.query.token || req.headers['x-access-token'];
    	/*jwt.verify(token, app.get('superSecret'), function(err, decoded) {
    		if (err) {
        		return res.status(500).send("invalid token");
      		}*/ 
			articles.findById(req.param('articleId'), function(err, result){
				if(err){
					res.status(500).send(err);
				}
				var data = {
                	statusCode : "200",
                	res        : result,
                	message    : "Article"
            	}

            	res.send(data);
			});
		//});	
	});

	/*Created By Vinod
	   Save article
	*/
	app.post("/api/article/save", function(req, res){
		res.header("Access-Control-Allow-Origin", "*");
		var article = req.body;
		var token = req.body.token || req.query.token || req.headers['x-access-token'];
    	/*jwt.verify(token, app.get('superSecret'), function(err, decoded) {
    		if (err) {
        		return res.status(500).send("invalid token");
      		} */
			articles.create(article, function(err, result) {
            	if(err){
					res.status(500).send(err);
				}
				var data = {
                	statusCode : "200",
                	res        : result,
                	message    : "Article"
            	}

            	res.send(data);
        	})
		//});
	});

	/*Created By Vinod
		Get article by category id 
	*/
	app.get("/api/article/category/:categoryId", function(req, res){
		res.header("Access-Control-Allow-Origin", "*");
		var categoryId = req.params.categoryId;
		var token = req.body.token || req.query.token || req.headers['x-access-token'];
    	/*jwt.verify(token, app.get('superSecret'), function(err, decoded) {
    		if (err) {
        		return res.status(500).send("invalid token");
      		} */
			articles.find({CategoryId:categoryId}, function(err, results){
				if(err){
					res.status(500).send(err);
				}
				var data = {
                	statusCode : "200",
                	res        : results,
                	message    : "Article by category id"
            	}
				res.send(data);
			})
		//});
	});
}
