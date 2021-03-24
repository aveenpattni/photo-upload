const aws = require("aws-sdk");
const config = require("../config");
const multer = require("multer");
const express = require("express");
const router = express.Router();
// const upload = require("../utils/photo-upload");

// const singleUpload = upload.single("image");

const s3 = new aws.S3({
  accessKeyId: config.AWS_ACCESS_KEY,
  secretAccessKey: config.AWS_SECRET_ACCESS,
  region: config.REGION
});
const storage = multer.memoryStorage({
  destination: function(req, file, cb) {
    cb(null, "");
  }
})
const photoUpload = multer({storage}).single("image");

router.post("/photo-upload", photoUpload, async (req, res) => {
  // singleUpload(req, res, err => {
  //   if(err) {
  //     return res.status(422).send({errors: [{title: "File Upload Error", detail: err.message}]});
  //   }
  //   return res.json({"imageUrl": req.file.location});
  // })
  const user = "avp"
  const fileName = req.file.originalname.split(".");
  const fileType = fileName[fileName.length-1];
  const params = {
    Bucket: config.DB,
    Key: `${user}_${Date.now().toString()}.${fileType}`,
    Body: req.file.buffer,
    ACL: "public-read",
  }

  s3.upload(params, (err, data) => {
    if(err) {
      return res.status(422).send({errors: [{title: "File Upload Error", detail: err.message}]});
    }
    if(data) {
      return res.json({"imageUrl": data.Location});
    }
  })
});

module.exports = router;