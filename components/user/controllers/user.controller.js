'use strict'

let mongoose = require('mongoose'),
    User = mongoose.model('User'),
    BaseController = require('./../../base.controller');

class UserController extends BaseController{
    constructor() {
        super();
        this._model = User;
    }

    login(req, res, next) {
        let body = req.body;

        // Early exit
        if(!(body.username && body.password))
            return res.status(400).json({message: "Please provide 'username' and 'password'"});

        // Find user by username and password
        return User.findOne({username: body.username, password: body.password})
            .then(doc => {
                if(!doc) {
                    throw {
                        json: {
                            message: "The given combination of password and username did not exist."
                        }, 
                        status: 401
                    };
                }

                // continue chain
                return doc;
            })
            .then(doc => {
                // TODO: Logic for getting jwt-token
                
                let response = {
                    success: true,
                    status: 200,
                    data: doc
                };
                res.json(this._createResponseObject(response))
            })
            .catch(error => {
                res.status(error.status).json(this._createResponseObject(error.json));
            })
    }

    _createResponseObject(data) {
        let defaultReponse = {
            success: false,
            status: 400,
            message: null,
            data: null,
            token: null
        }

        return Object.assign({}, defaultReponse, data);
    }
}

module.exports = new UserController();
