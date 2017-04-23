var awsSDK = require('aws-sdk');
var awsConfig = require("../config/aws.json");

awsSDK.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY || awsConfig.accessKeyId,
  secretAccessKey: process.env.AWS_SECRET_KEY || awsConfig.secretAccessKey,
  region: awsConfig.region
});

var s3 = new awsSDK.S3();

module.exports = Object.freeze({

  getSDK: function () {
    return awsSDK;
  },

  getS3: function () {
    return s3;
  }

});
