let router = require("express").Router();
let controller = require("../controllers/user.controller");
let roles = require("../../config/roles.config");
let User = require('../models/user.model');
let filterMiddleware = require("../../filterMiddleware");

router.use(roles.middleware());

// SELF
roles.use('adjust user', (req) => {
    if (req.params._id == req.user._id) return true;
});
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
    .get(filterMiddleware(), controller.get)
    .post(controller.create);
    
router.route("/me")
    .get(controller.me);

router.route("/:_id")
    .get(controller.getOne)
    .put(roles.can('adjust user'), controller.put)
    .patch(roles.can('adjust user'), controller.patch)
    .delete(roles.can('adjust user'), controller.delete);

module.exports = router;