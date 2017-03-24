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
		categories.find({}, function(err, results){
			if(err){
				res.send(500,{error: err});
			}
			var data = {
                statusCode : "200",
                res        : results,
                message    : "categories"
            }
			res.send(results);
		})
	});

}
