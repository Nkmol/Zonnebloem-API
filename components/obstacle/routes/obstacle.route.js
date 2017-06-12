let router = require("express").Router();
let controller = require("../controllers/obstacle.controller");
let roles = require("../../config/roles.config");
let Obstacle = require('../models/obstacle.model');
let filterMiddleware = require("../../filterMiddleware");

router.use(roles.middleware());

// allow modification if the obstacle is made by me
roles.use('adjust obstacle', (req) => {
    let obstacleId = req.params._id;
    let me = req.user;
    if ((obstacleId && me)) {
        return Obstacle.findById(obstacleId).then(obstacle => {
            let createdByMe = false;
            if (obstacle && obstacle.created_by) {
                if (obstacle.created_by._id.equals(me._id)) {
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
    .get(filterMiddleware(), controller.get)
    .post(controller.create);
    
router.route("/:_id")
    .get(controller.getOne)
    .put(roles.can('adjust obstacle'), controller.put)
    .patch(roles.can('adjust obstacle'), controller.patch)
    .delete(roles.can('adjust obstacle'), controller.delete);

module.exports = router;
