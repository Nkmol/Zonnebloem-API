let router = require("express").Router();
let controller = require("../controllers/user.controller");
let {sharedGuards, roles} = require("../../config/roles.config");
let User = require('../models/user.model');

router.use(roles.middleware());

// SELF
roles.use(sharedGuards.me.key, sharedGuards.me.action);
// Moderator
roles.use((req) => {
    let userId = req.params._id;
    let me = req.user;
    return User.findById(userId).then(doc => {
        let isAdmin = false;
        if ((doc.roles && me.roles) && (doc.roles.length > 0 && me.roles.length > 0)) {
            doc.roles.forEach(function(userRole) {
                me.roles.forEach(function(myRole) {
                    if ((userRole.department._id.equals(myRole.department._id)) && myRole.role == "MODERATOR") {
                        isAdmin = true;
                    }
                })
            });
        }
        if (isAdmin) return true;
    })
    .catch(e => {
        console.log('error', e);
    })
});

router.route("/")
    .get(controller.get)
    .post(controller.create);

router.route("/me")
    .get(controller.me);

router.route("/:_id")
    .get(controller.getOne)
    .put(roles.can(sharedGuards.me.key), controller.put)
    .patch(roles.can(sharedGuards.me.key), controller.patch)
    .delete(roles.can(sharedGuards.me.key), controller.delete);

module.exports = router;