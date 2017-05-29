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
        return res.json(this._combineStatus({data: user}));
    }
}

module.exports = new UserController();
