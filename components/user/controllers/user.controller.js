let mongoose = require("mongoose");
let User = mongoose.model("User");
let BaseController = require("./../../base.controller");

class UserController extends BaseController {
    constructor() {
        super();
        this._model = User;
    }

    me(req, res, next) {
        let user = req.user;

        if (user) {
            user = user.toObject();
            delete user.password;
        }
        return res.json(this._combineStatus({ "data": user }));
    }

    // TODO Move to Schema logic
    put(req, res, next) {
        User.generateHash(req.body.password)
            .then(hash => {
                req.body.password = hash;

                super.put(req, res, next);
            });
    }

    // TODO Move to Schema logic
    patch(req, res, next) {
        User.generateHash(req.body.password)
            .then(hash => {
                req.body.password = hash;

                super.patch(req, res, next);

            });
    }
}

module.exports = new UserController();
