let router = require("express").Router();
let multer = require("multer");
let upload = multer({ "dest": "uploads/" });
let controller = require("../controllers/file.controller");

router.post("/", upload.array("files"), controller.upload);
router.delete("/", controller.remove);

module.exports = router;
