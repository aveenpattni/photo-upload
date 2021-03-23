const express = require("express");
const router = express.Router();
const upload = require("../utils/photo-upload");

const singleUpload = upload.single("image");

router.post("/photo-upload", async (req, res) => {
  singleUpload(req, res, err => {
    if(err) {
      return res.status(422).send({errors: [{title: "File Upload Error", detail: err.message}]});
    }
    return res.json({"imageUrl": req.file.location});
  })
});

module.exports = router;