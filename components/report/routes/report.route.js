let router = require("express").Router();
let controller = require("../controllers/report.controller");
let roles = require("../../config/roles.config");
let Report = require('../models/report.model');

router.use(roles.middleware());

// allow modification if the report is made by me
roles.use('adjust report', (req) => {
    let reportId = req.params._id;
    let me = req.user;
    if ((reportId && me)) {
        return Report.findById(reportId).then(report => {
            let createdByMe = false;
            if (report && report.created_by) {
                if (report.created_by._id.equals(me._id)) {
                    createdByMe = true;
                }
            }
            if (createdByMe) return true;
        }).catch(e => {
            console.log('error', e);
        })
    }
})

// the moderator is allowed to modify the obstacles
roles.use((req) => {
    let me = req.user;
    if (me && (me.roles && me.roles.length > 0)) {
        let isModerator = false;
        me.roles.forEach(function(myRole) {
            if (myRole.role == "MODERATOR") {
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
    .put(roles.can('adjust report'), controller.put)
    .patch(roles.can('adjust report'), controller.patch)
    .delete(roles.can('adjust report'), controller.delete);

module.exports = router;