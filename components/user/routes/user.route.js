let router = require("express").Router();
let controller = require("../controllers/user.controller");

router.route("/")
    .get(controller.get)
    .post(controller.create);

router.route("/me")
    .get(controller.me);

router.route("/:_id")
    .get(controller.getOne)
    .put(controller.put)
    .patch(controller.patch)
    .delete(controller.delete);

module.exports = router;