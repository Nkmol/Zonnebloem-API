let router = require("express").Router();
let controller = require("../controllers/user.controller");
let {guards, roles} = require("../../config/roles.config");
let User = require('../models/user.model');

router.use(roles.middleware());

// SELF
roles.use(guards.onlyMe.key, guards.onlyMe.action);
// ADMIN
roles.use(guards.admin.action);
// SUPER-ADMIN
roles.use(guards.onlyMe.key, guards.onlyMe.action);

router.route("/")
    .get(controller.get)
    .post(controller.create);

router.route("/me")
    .get(controller.me);

router.route("/:_id")
    .get(controller.getOne)
    .put(roles.can(guards.onlyMe.key), controller.put)
    .patch(roles.can(guards.onlyMe.key), controller.patch)
    .delete(roles.can(guards.onlyMe.key), controller.delete);

module.exports = router;