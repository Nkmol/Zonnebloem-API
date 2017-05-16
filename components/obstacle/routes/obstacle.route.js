let router = require("express").Router();
let controller = require("../controllers/obstacle.controller");

router.route("/")
    .get(controller.get)
    .post(controller.create);

router.route("/:_id")
    .delete(controller.delete)
    .put(controller.put)
    .patch(controller.patch);

module.exports = router;
