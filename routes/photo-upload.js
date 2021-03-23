const express = require("express");
const router = express.Router();

router.post("/photo-upload", async (req, res) => {
  console.log("💎");
  res.send("Ok");
});

module.exports = router;