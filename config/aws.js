var awsConfig = require("../config/aws.json");
var awsSDK = require('aws-sdk');
var multer = require("multer");
var multerS3 = require("multer-s3");
// https://github.com/badunk/multer-s3

awsSDK.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY || awsConfig.ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY || awsConfig.SECRET_KEY,
  region: awsConfig.REGION
});

var s3 = new awsSDK.S3();

var s3Upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: awsConfig.S3_BUCKET_NAME,
    acl: awsConfig.S3_DEFAULT_ACL,
    cacheControl: awsConfig.S3_CACHE_CONTROL,
    key: function (req, file, cb) {
      console.log(file);
      cb(null, file.originalname);

      // Use Date.now() for unique file keys
      //cb(null, Date.now().toString() + "-" + file.originalname)
    }
  })
});

module.exports = Object.freeze({

  getSDK: function () {
    return awsSDK;
  },

  getS3Upload: function () {
    return s3Upload;
  }

});
