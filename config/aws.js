var awsConfig = require("../config/aws.json");
var awsSDK = require('aws-sdk');

awsSDK.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY || awsConfig.ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY || awsConfig.SECRET_KEY,
  region: awsConfig.REGION
});

var s3 = new awsSDK.S3();

module.exports = Object.freeze({

  getSDK: function () {
    return awsSDK;
  },

  getS3UrlPrefix: function () {
    return awsConfig.S3_URL_PREFIX + awsConfig.S3_BUCKET_NAME;
  },

  getS3: function () {
    return s3;
  }

});
