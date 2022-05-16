const express = require('express');
const router = express();
const authMiddleware = require("../middlewares/auth");
const os = require("os");
const multer = require("multer");
const upload = multer({ dest: os.tmpdir() });
const requestController = require("../controllers/request");

router.post(
  "/make_request",
  authMiddleware,
  upload.single("file"),
  (req, res) => {
    let file = req.file;
    requestController.handleExcelFile(file.path);
    res.send(200);
  }
);

module.exports = router;