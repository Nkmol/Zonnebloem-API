let router = require("express").Router();
let controller = require("../controllers/obstacle.controller");

router.route("/")
    .get(controller.get);

module.exports = router;
