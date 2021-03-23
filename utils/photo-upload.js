const aws = require("aws-sdk");

const config = require("../config");

aws.config.update({
  accessKeyId: config.AWS_ACCESS_KEY,
  secretAccessKey: config.AWS_SECRET_ACCESS,
  region: config.REGION
})