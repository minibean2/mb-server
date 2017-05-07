const env = require('get-env')();
var awsSDK = require('aws-sdk');

var awsConfig = "";
if (env === 'prod') {
  awsConfig = require("../config/aws_prod.json");
} else {
  awsConfig = require("../config/aws_dev.json");
}

awsSDK.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY || awsConfig.ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY || awsConfig.SECRET_KEY,
  region: awsConfig.REGION
});

var s3 = new awsSDK.S3();

module.exports = Object.freeze({

  getS3BucketName: function () {
    return awsConfig.S3_BUCKET_NAME;
  },

  getS3DefaultAcl: function () {
    return awsConfig.S3_DEFAULT_ACL;
  },

  getSDK: function () {
    return awsSDK;
  },

  getS3UrlPrefix: function () {
    return awsConfig.S3_URL_PREFIX + awsConfig.S3_BUCKET_NAME + "/";
  },

  getS3ImagePath: function (folder) {
    return awsConfig.S3_IMAGE_PATH + folder + "/";
  },

  getS3: function () {
    return s3;
  }

});
