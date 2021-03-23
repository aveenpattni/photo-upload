const aws = require("aws-sdk");

const config = require("../config");

aws.config.update({
  accessKeyId:"",
  secretAccessKey: "",
  region: config.REGION
})