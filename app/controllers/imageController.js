/*Crated By Vinod
	Date-29-03-2017
	image Controller
*/

var images = require("../models/imagesModel");
var Jimp = require("jimp");

module.exports = function(app) {

	/*Created By Vinod
	   Save images
	*/
	app.post("/api/image/upload", function(req, res){
    	if (!req.files) {
            return res.status(400).send('No files were uploaded.');
        }
        let sampleFile = req.files.file;
        sampleFile.mv(__dirname + '/images/'+sampleFile.name, function(err) {
            if (err) {
                return res.status(500).send(err);
            }
            Jimp.read(__dirname + '/images/'+sampleFile.name, function (err, lenna) {
                if (err) res.status(500).send(err);
                
                var url = (sampleFile.name).split(".");
                var url1 = url[0]+"_300"+"."+url[1];
                var url2 = url[0]+"_600"+"."+url[1];

                lenna.resize(300, 300)            // resize 
                    .quality(100)                 // set JPEG quality    
                    .write(__dirname + '/images/'+url1);

                lenna.resize(600, 600)            // resize 
                    .quality(100)                 // set JPEG quality    
                    .write(__dirname + '/images/'+url2);    

                var image = {
                    url: '/images/'+sampleFile.name,
                    url_300: '/images/'+url1,
                    url_600: '/images/'+url2,
                    created_date: new Date()
                };    

                images.create(image, function(err, result){
                    if(err) return res.status(500).send(err);
                    res.send(result);
                });
            });            
        });
	});

	app.get("/images/:imageName", function(req, res){
       		res.sendFile(__dirname+'/images/'+req.params.imageName);
	})
}