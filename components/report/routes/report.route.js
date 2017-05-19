let router = require("express").Router();
let controller = require("../controllers/report.controller");

router.route("/")
    .get(controller.get)
    .post(controller.create);

router.route("/:_id")
    .get(controller.getOne)
    .put(controller.put)
    .patch(controller.patch)
    .delete(controller.delete);

module.exports = router;