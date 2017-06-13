let router = require("express").Router();
let controller = require("../controllers/department.controller");
let roles = require("../../config/roles.config");
let JWTAuthenticator = require("../../passport/middlewares");
let filterMiddleware = require("../../filterMiddleware");

router.use(roles.middleware());

// Only the moderator is allowed to modify the department
roles.use('adjust department', (req) => {
    let departmentId = req.params._id;
    let me = req.user;
    if ((departmentId && me) && (me.roles && me.roles.length > 0)) {
        let isModerator = false;
        me.roles.forEach(function(myRole) {
            if (myRole.role == "MODERATOR" && myRole.department._id.equals(departmentId)) {
                isModerator = true;
            }
        });
        if (isModerator) return true;
    }
})

router.route("/")
    .get(filterMiddleware(), controller.get)
    .post(JWTAuthenticator.authenticate, controller.create);

router.route("/:_id")
    .get(controller.getOne)
    .put([JWTAuthenticator.authenticate, roles.can('adjust department')], controller.put)
    .patch([JWTAuthenticator.authenticate, roles.can('adjust department')], controller.patch)
    .delete([JWTAuthenticator.authenticate, roles.can('adjust department')], controller.delete);

module.exports = router;