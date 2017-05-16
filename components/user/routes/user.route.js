let router = require("express").Router();
let controller = require("../controllers/user.controller");

router.route("/")
    .get(controller.get)
    .post(controller.create);

router.route("/me")
    .get(controller.me);

router.route("/:id")
    .get(controller.getOne)
    .put(controller.update)
    .delete(controller.delete);

module.exports = router;