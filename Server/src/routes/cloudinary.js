const express = require("express");
const { createImage } = require("../controller/cloudinary");
const router = express.Router();

router.post("/images", createImage);

module.exports = router;
