/*Crated By Vinod
	Date-20-03-2017
	Category Controller
*/

var categories = require("../models/categoryModel");

module.exports = function(app) {

	/*Created By Vinod
		Get all category 
	*/
	app.get("/api/categories", function(req, res) {
		res.header("Access-Control-Allow-Origin", "*");
		var token = req.body.token || req.query.token || req.headers['x-access-token'];
    	/*jwt.verify(token, app.get('superSecret'), function(err, decoded) {
    		if (err) {
        		return res.status(500).send("invalid token");
      		} */
			categories.find({}, function(err, results){
				if(err){
					res.status(500).send(err);
				}
				var data = {
                	statusCode : "200",
                	res        : results,
                	message    : "categories"
            	}
				res.send(results);
			})
		//});
	});

}
