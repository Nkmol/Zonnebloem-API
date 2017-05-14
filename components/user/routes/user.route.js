let router = require("express").Router();
let controller = require("../controllers/user.controller");

router.route("/")
    .get(controller.get);

router.route("/me")
    .get(controller.me);

router.route("/:id")
    .get(controller.getOne);



module.exports = router;