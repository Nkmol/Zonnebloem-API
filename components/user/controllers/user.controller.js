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
        .then(docs => {
            if (!docs) {
                return res.status(404).json(this._combineStatus({
                    status: res.statusCode,
                    message: "No users found"
                }));
            }
            return res.json(this._combineStatus({data: docs}));
        }).catch(e => {
            // TODO: send an error response
        })
    }

    getOne(req, res, next) {
        super.getOne(req, res, next);
        let id = req.params.id;

        this._model.findById(id)
        .then(doc => {
            if (!doc) {       
                return res.status(404).json(this._combineStatus({
                    status: res.statusCode,
                    message: "User does not exist"
                }))
            }
            return res.json(this._combineStatus({data: doc}));
        }).catch(e => {
            
        })
    }

    create(req, res, next) {
        super.create(req, res, next);
    }

    update(req, res, next) {
        super.update(req, res, next);

        let id = req.params.id;
        let body = req.body;
    
        // Exclude fields from update
        delete body.username;
        delete body.password;

        this._model.findByIdAndUpdate(id, { $set: body}, { new: true })
        .then(doc => {
            return res.json(this._combineStatus({data: doc}));
        })
        .catch(e => {
            // TODO: handle errors
        })
    }

    delete(req, res, next) {
        super.delete(req, res, next);
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
