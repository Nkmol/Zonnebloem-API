let router = require("express").Router();
let controller = require("../controllers/user.controller");
let roles = require("../../config/roles.config");
let User = require('../models/user.model');

router.use(roles.middleware());

// SELF
roles.use('adjust user', (req) => {
    if (req.params._id == req.user._id) return true;
})

// ADMIN
roles.use((req) => {
    let userId = req.params._id;
    let me = req.user;
    //TODO: remove all console logs
    return User.findById(userId).then(doc => {
        if ((doc.roles && me.roles) && (doc.roles.length > 0 && me.roles.length > 0)) {
            let isAdmin = false;
            console.log("checking for admin");
            doc.roles.forEach(function(userRole) {
                console.log('user role', userRole.role);
                console.log('user department', userRole.department);
                me.roles.forEach(function(myRole) {
                    console.log('my role', myRole.role);
                    console.log('my department', myRole.department);
                    if ((userRole.department._id.equals(myRole.department._id)) && myRole.role == "ADMIN") {
                        isAdmin = true;
                    }
                })
            });
            console.log('is admin', isAdmin);
            if (isAdmin) return true;
        }
    })
    .catch(e => {
        console.log('error', e);
    })
})

// SUPER-ADMIN
roles.use((req) => {
    let user = req.user;
    if (user.roles && user.roles.length > 0) {
        let isSuperAdmin = false;
        user.roles.forEach(function(userRole) {
            if (userRole.role == "SUPER-ADMIN") {
                isSuperAdmin = true;
            }
        });
        if (isSuperAdmin) return true;
    }
})

router.route("/")
    .get(controller.get)
    .post(controller.create);

router.route("/me")
    .get(controller.me);

router.route("/:_id")
    .get(controller.getOne)
    .put(roles.can('adjust user'), controller.put)
    .patch(roles.can('adjust user'), controller.patch)
    .delete(roles.can('adjust user'), controller.delete);

module.exports = router;