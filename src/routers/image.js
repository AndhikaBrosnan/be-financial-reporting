const express = require("express");
const router = express.Router();

const ImageController = require("#controllers/image");

router.get("/download", ImageController.download);
router.post("/upload", ImageController.upload);

module.exports = router;
