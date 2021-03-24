const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");

const config = require("../config");
const user = "avp"

aws.config.update({
  accessKeyId: config.AWS_ACCESS_KEY,
  secretAccessKey: config.AWS_SECRET_ACCESS,
  region: config.REGION
});

const s3 = new aws.S3();

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    console.log("🔥", new Error("Invalid File type. Only JPEG and PNG"));
    cb(new Error("Invalid File type. Only JPEG and PNG"), false);
  }
}

const imageUpload = multer({
  fileFilter,
  storage: multerS3({
    s3,
    bucket: "aveen-test-s3/photo-upload",
    acl: "public-read",
    contentType: multerS3.AUTO_CONTENT_TYPE,
    metadata: function (req, file, cb) {
      cb(null, {fieldName: "photo-upload-node"});
    },
    key: function (req, file, cb) {
      cb(null, `${user}_${Date.now().toString()}`);
    }
  })
})

module.exports = imageUpload;