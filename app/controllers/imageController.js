var images = require("../models/imagesModel");
var awsConfig = require("../../config/aws.json");
var aws = require("../../config/aws");
var jimp = require("jimp");
var moment = require('moment');

var s3 = aws.getS3();

module.exports = function (app) {

    app.post("/api/image/upload", function (req, res) {
        console.log("/api/image/upload:");

        if (!req.files) {
            console.log("No files were uploaded...");
            return res.status(400).send('No files were uploaded.');
        }

        var file = req.files.file;

        console.log("uploading " + file.name + " to S3...");
        //console.log("File: " + JSON.stringify(file));
        //console.log("File: " + JSON.stringify(file, null, 4));

        var path = awsConfig.S3_IMAGE_PATH + moment(Date.now()).format("YYYYMMDD") + "/" + file.name;

        s3.upload({
            Bucket: awsConfig.S3_BUCKET_NAME,
            Key: path,
            Body: file.data,
            ACL: awsConfig.S3_DEFAULT_ACL,
        }, (err) => {
            if (err) {
                console.log("Error: " + err.message);
                return res.status(400).send(err);
            }

            console.log("File uploaded to S3");
            res.send("File uploaded to S3");
        });

        /*
        let sampleFile = req.files.file;
        sampleFile.mv(__dirname + '/images/' + sampleFile.name, function (err) {
            if (err) {
                return res.status(500).send(err);
            }
            jimp.read(__dirname + '/images/' + sampleFile.name, function (err, lenna) {
                if (err) res.status(500).send(err);

                var url = (sampleFile.name).split(".");
                var url1 = url[0] + "_300" + "." + url[1];
                var url2 = url[0] + "_600" + "." + url[1];

                lenna.resize(300, 300)            // resize 
                    .quality(100)                 // set JPEG quality    
                    .write(__dirname + '/images/' + url1);

                lenna.resize(600, 600)            // resize 
                    .quality(100)                 // set JPEG quality    
                    .write(__dirname + '/images/' + url2);

                var image = {
                    url: '/images/' + sampleFile.name,
                    url_300: '/images/' + url1,
                    url_600: '/images/' + url2,
                    created_date: new Date()
                };

                images.create(image, function (err, result) {
                    if (err) return res.status(500).send(err);
                    res.send(result);
                });
            });
        });
        */
    });

    app.get("/images/:imageName", function (req, res) {
        res.sendFile(__dirname + '/images/' + req.params.imageName);
    });
}