var images = require("../models/imagesModel");
var awsConfig = require("../../config/aws.json");
var aws = require("../../config/aws");
var jimp = require("jimp");
var moment = require('moment');
var appRoot = require('app-root-path');

var s3 = aws.getS3();

module.exports = function (app) {

    app.post("/api/image/upload", function (req, res) {
        console.log("/api/image/upload:");

        if (!req.files) {
            console.log("No files were uploaded...");
            return res.status(400).send('No files were uploaded.');
        }

        var imageFile = req.files.file;
        var folder = moment(Date.now()).format("YYYYMMDD");
        var path = aws.getS3ImagePath(folder);
        var imageFilePath = path + imageFile.name;

        console.log("Uploading image to " + awsConfig.S3_BUCKET_NAME);
        console.log("Image: " + imageFilePath);
        //console.log("imageFile: " + JSON.stringify(imageFile, null, 4));


        /*
        // resize to thumbnail and standard size
        imageFile.mv(appRoot + '/temp/' + imageFile.name, function (err) {
            if (err) {
                console.log(err);
                //return res.status(500).send(err);
            }

            jimp.read(appRoot + '/temp/' + imageFile.name, function (err, lenna) {
                if (err) {
                    console.log(err);
                    //res.status(500).send(err);
                }

                var tokens = (imageFile.name).split(".");
                var image300 = tokens[0] + "_300" + "." + tokens[1];
                var image600 = tokens[0] + "_600" + "." + tokens[1];

                lenna.resize(300, 300)            // resize 
                    .quality(100)                 // set JPEG quality    
                    .write(appRoot + '/temp/' + image300);

                lenna.resize(600, 600)            // resize 
                    .quality(100)                 // set JPEG quality    
                    .write(appRoot + '/temp/' + image600);
            });
        });
        */


        s3.upload({
            Bucket: awsConfig.S3_BUCKET_NAME,
            Key: imageFilePath,
            Body: imageFile.data,
            ACL: awsConfig.S3_DEFAULT_ACL,
        }, (err) => {
            if (err) {
                console.log("Error: " + err.message);
                return res.status(400).send(err);
            }

            console.log("Image upload successful");

            var urlPrefix = aws.getS3UrlPrefix() + path;
            var data = {
                statusCode: "200",
                res: {
                    url_300: urlPrefix + imageFile.name,
                    url_600: urlPrefix + imageFile.name
                },
                message: "Image upload successful"
            };

            res.send(data);
        });
    });

    app.get("/images/:imageName", function (req, res) {
        res.sendFile(appRoot + '/images/' + req.params.imageName);
    });
}