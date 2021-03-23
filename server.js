const express = require("express");
require("dotenv").config();

const PORT = process.env.PORT || 8000;

const app = express();

app.use("/api/v1", require("./routes/photo-upload"));

const server = app.listen(PORT, () => {
  console.log(`💎 Server running on Port: ${PORT}`);
  console.log("Stop with Ctrl+C");
})