var dynamoose = require("dynamoose");
var aws = require("../config/aws.json");

dynamoose.AWS.config.update({
  accessKeyId: aws.accessKeyId,
  secretAccessKey: aws.secretAccessKey,
  region: aws.region
});