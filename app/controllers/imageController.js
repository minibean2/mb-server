/*Crated By Vinod
	Date-29-03-2017
	image Controller
*/

var images = require("../models/imagesModel");
var jwt    = require('jsonwebtoken');

module.exports = function(app) {

	/*Created By Vinod
	   Save images
	*/
	app.post("/api/image/upload", function(req, res){
		res.header("Access-Control-Allow-Origin", "*");
		var token = req.body.token || req.query.token || req.headers['x-access-token'];
    	/*jwt.verify(token, app.get('superSecret'), function(err, decoded) { 
    		if (err) {
        		return res.status(500).send("invalid token");
      		}*/
			if (!req.files)
    			return res.status(400).send('No files were uploaded.');
    		let sampleFile = req.files.file;
    		sampleFile.mv(__dirname + '/images/'+sampleFile.name, function(err) {
    			if (err) {
    				return res.status(500).send(err);
                }
                var image = {
    				url: '/images/'+sampleFile.name,
					created_date: new Date()
    			};
      			images.create(image, function(err, result){
      				if(err) return res.status(500).send(err);
      				res.send(result);
      			});
  			});
    	//});
	});

	app.get("/images/:imageName", function(req, res){
		res.header("Access-Control-Allow-Origin", "*");
		res.sendFile(__dirname+'/images/'+req.params.imageName);
	})
}