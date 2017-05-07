var constants = require("../../config/constants");
var images = require("../models/imagesModel");
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
            return res.status(400).send("No files were uploaded...");
        }

        var imageFile = req.files.file;
        var folder = moment(Date.now()).format("YYYYMMDD");
        var path = aws.getS3ImagePath(folder);

        var tokens = (imageFile.name).split(".");
        var imageThumbName = tokens[0] + "_thumb.jpg";
        var imageFullName = tokens[0] + "_full.jpg";

        console.log("Uploading image to " + aws.getS3BucketName());
        console.log("Image: " + imageFile.name);
        console.log(imageFile);

        //console.log("imageFile: " + JSON.stringify(imageFile, null, 4));

        // make a copy of original image
        imageFile.mv(appRoot + "/" + constants.IMAGE_TEMP_UPLOAD_DIR + imageFile.name, function (err) {
            if (err) {
                console.log(err);
                //return res.status(500).send(err);
            }

            // read and resize to thumb size image
            jimp.read(appRoot + "/" + constants.IMAGE_TEMP_UPLOAD_DIR + imageFile.name, function (err, lenna) {
                if (err) throw err

                lenna.resize(constants.IMAGE_THUMB_WIDTH, jimp.AUTO, jimp.RESIZE_BEZIER)
                    .quality(constants.IMAGE_JPEG_QUALITY)
                    .write(appRoot + "/" + constants.IMAGE_TEMP_UPLOAD_DIR + imageThumbName)
                    .getBuffer(jimp.MIME_JPEG, function (err, buffer) {
                        if (err) throw err

                        // upload to s3
                        s3.upload({
                            Bucket: aws.getS3BucketName(),
                            Key: path + imageThumbName,
                            Body: buffer,
                            ACL: aws.getS3DefaultAcl(),
                        }, (err) => {
                            if (err) {
                                console.log("Error: " + err.message);
                                return res.status(400).send(err);
                            }

                            console.log("ImageThumb uploaded successfully");
                        });

                        console.log("ImageThumb:");
                        console.log(buffer);
                    });
            });

            // read and resize to full size image
            jimp.read(appRoot + "/" + constants.IMAGE_TEMP_UPLOAD_DIR + imageFile.name, function (err, lenna) {
                if (err) throw err

                lenna.resize(constants.IMAGE_FULL_WIDTH, jimp.AUTO, jimp.RESIZE_BEZIER)
                    .quality(constants.IMAGE_JPEG_QUALITY)
                    .write(appRoot + "/" + constants.IMAGE_TEMP_UPLOAD_DIR + imageFullName)
                    .getBuffer(jimp.MIME_JPEG, function (err, buffer) {
                        if (err) throw err

                        // upload to s3
                        s3.upload({
                            Bucket: aws.getS3BucketName(),
                            Key: path + imageFullName,
                            Body: buffer,
                            ACL: aws.getS3DefaultAcl(),
                        }, (err) => {
                            if (err) {
                                console.log("Error: " + err.message);
                                return res.status(400).send(err);
                            }

                            console.log("ImageFull uploaded successfully");
                        });

                        console.log("ImageFull:");
                        console.log(buffer);
                    });
            });
        });

        /*
        // upload to s3
        s3.upload({
            Bucket: aws.getS3BucketName(),
            Key: path + imageFile.name,
            Body: imageFile.data,
            ACL: aws.getS3DefaultAcl(),
        }, (err) => {
            if (err) {
                console.log("Error: " + err.message);
                return res.status(400).send(err);
            }

            console.log("Image uploaded successfully");
        });
        */

        var urlPrefix = aws.getS3UrlPrefix() + path;
        var data = {
            statusCode: "200",
            res: {
                url_thumb: urlPrefix + imageThumbName,
                url_full: urlPrefix + imageFullName
            },
            message: "Image uploaded successfully"
        };

        res.send(data);
    });

    app.get("/images/:imageName", function (req, res) {
        res.sendFile(appRoot + '/images/' + req.params.imageName);
    });
}