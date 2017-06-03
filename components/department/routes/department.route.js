let router = require("express").Router();
let controller = require("../controllers/department.controller");
let roles = require("../../config/roles.config");

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
    .get(controller.get)
    .post(controller.create);

router.route("/:_id")
    .get(controller.getOne)
    .put(roles.can('adjust department'), controller.put)
    .patch(roles.can('adjust department'), controller.patch)
    .delete(roles.can('adjust department'), controller.delete);

module.exports = router;