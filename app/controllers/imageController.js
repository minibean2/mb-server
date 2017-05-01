var constants = require("../../config/constants");
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

        var tokens = (imageFile.name).split(".");
        var imageThumbName = tokens[0] + "_thumb" + "." + tokens[1];
        var imageFullName = tokens[0] + "_full" + "." + tokens[1];

        console.log("Uploading image to " + awsConfig.S3_BUCKET_NAME);
        console.log("Image: " + imageFile.name);
        //console.log("imageFile: " + JSON.stringify(imageFile, null, 4));

        // resize to thumbnail and full size
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

                lenna.resize(constants.IMAGE_FULL_WIDTH, jimp.AUTO, jimp.RESIZE_BEZIER)
                    //.quality(100)
                    .write(appRoot + '/temp/' + imageFullName);

                lenna.resize(constants.IMAGE_THUMB_WIDTH, jimp.AUTO, jimp.RESIZE_BEZIER)
                    //.quality(100)
                    .write(appRoot + '/temp/' + imageThumbName);

                //console.log("lenna: " + JSON.stringify(lenna, null, 4));
                //console.log("lenna: " + JSON.stringify(lenna));
            });
        });

        // upload image full
        /*
        jimp.read(appRoot + '/temp/' + imageFullName, function (err, lenna) {
            if (err) {
                console.log(err);
                //res.status(500).send(err);
            }

            s3.upload({
                Bucket: awsConfig.S3_BUCKET_NAME,
                Key: path + imageFullName,
                Body: lenna.buffer,
                ACL: awsConfig.S3_DEFAULT_ACL,
            }, (err) => {
                if (err) {
                    console.log("Error: " + err.message);
                    return res.status(400).send(err);
                }

                console.log("ImageFull upload successful");
            });
        });
        */

        s3.upload({
            Bucket: awsConfig.S3_BUCKET_NAME,
            Key: path + imageFile.name,
            Body: imageFile.data,
            ACL: awsConfig.S3_DEFAULT_ACL,
        }, (err) => {
            if (err) {
                console.log("Error: " + err.message);
                return res.status(400).send(err);
            }

            console.log("Image upload successful");
        });

        var urlPrefix = aws.getS3UrlPrefix() + path;
        var data = {
            statusCode: "200",
            res: {
                url_thumb: urlPrefix + imageThumbName,
                url_full: urlPrefix + imageFullName
            },
            message: "Image upload successful"
        };

        res.send(data);
    });

    app.get("/images/:imageName", function (req, res) {
        res.sendFile(appRoot + '/images/' + req.params.imageName);
    });
}