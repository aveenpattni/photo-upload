const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");

const config = require("../config");

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
    cb(new Error("Invalid File type. Only JPEG and PNG"), false);
  }
}

const imageUpload = multer({
  fileFilter,
  storage: multerS3({
    s3,
    bucket: "aveen-test-s3/photo-upload",
    acl: "public-read",
    metadata: function (req, file, cb) {
      cb(null, {fieldName: "Metadata_Test"});
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString());
    }
  })
})

module.exports = imageUpload;