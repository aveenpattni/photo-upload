const aws = require("aws-sdk");

const config = require("../config");

aws.config.update({
  accessKeyId: config.AWS_ACCESS_KEY,
  secretAccessKey: config.AWS_SECRET_ACCESS,
  region: config.REGION
});

const s3 = new aws.s3({params: {Bucket: "aveen-test-s3"}});

const imageUpload = (path, buffer) => {
  const data = {
    Key: path,
    Body: buffer,
    ContentEncoding: "base64",
    ContentType: "image/jpeg",
    ACL: "public-read"
  };
  return new Promise((res, rej) => {
    s3.putObject(data, err => {
      if(err) {
        rej(err);
      } else {
        res(s3Url + path);
      };
    });
  });
}

module.exports = imageUpload;