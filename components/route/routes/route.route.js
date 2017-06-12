let router = require("express").Router();
let filterMiddleware = require("../../filterMiddleware");
let controller = require("../controllers/route.controller");

router.route("/")
    .get(filterMiddleware(), controller.get)
    .post(controller.create);

router.route("/:_id")
    .get(controller.getOne)
    .put(controller.put)
    .patch(controller.patch)
    .delete(controller.delete);

module.exports = router;