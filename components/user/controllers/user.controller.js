let mongoose = require("mongoose");
let User = mongoose.model("User");
let BaseController = require("./../../base.controller");
let jwt = require("jsonwebtoken");
let JWTConfig = require("./../../config/config").jwt;

class UserController extends BaseController {
    constructor() {
        super();
        this._model = User;
    }

    get _BaseResponse() {
        // Extend baseresponse with default token value
        return Object.assign(super._BaseResponse, {
            "token": null
        });
    }

    get(req, res, next) {
        super.get(req, res, next);
        
        this._model.find({})
        .select("-password") //execlude the password field
        .then(doc => {
            return res.json(this._combineStatus({data: doc}));
        }).catch(e => {
            // TODO: send an error response
        })
    }

    getOne(req, res, next) {
        super.getOne(req, res, next);
        let id = req.params.id;

        this._model.findById(id)
        .select("-password") //execlude the password field
        .then(doc => {
            return res.json(this._combineStatus({data: doc}));
        }).catch(e => {

        })
    }

    me(req, res, next) {
        let user = req.user;
        if (user) {
            delete user.password;
        }
        return res.json(this._combineStatus({data: user}));
    }
}

module.exports = new UserController();
