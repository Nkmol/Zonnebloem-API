'use strict'

let mongoose = require('mongoose'),
    User = mongoose.model('User'),
    jwt = require('jsonwebtoken'),
    JWTConfig = require('./../../config/config').jwt;

class UserController {
    constructor() {
        
    }

    isLoggedIn(req, res, next) {
        if(req.user) {
            res.status(200);
            res.send({ "message": "User is already logged in!" });
        } else {
            next();
        }
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
                
                var payload = {id: doc._id};
			    var token = jwt.sign(payload, JWTConfig.secret);
                
                let response = {
                    success: true,
                    status: 200,
                    data: doc,
                    token: token
                };
                res.json(this._createResponseObject(response))
            })
            .catch(error => {
                res.status(error.status).json(this._createResponseObject(error.json));
            })
    }

    register(req, res, next) {

        let body = req.body;

        if (!(body.username && body.password && body.email))
            return res.status(400).json({message: "Please provide all the fields required 'username', 'password' and 'email'"});

        body.password = User.generateHash(body.password);
        body.roles = null; // TODO: add a default role when creating a new user 

        let user = new User(body);

        return user.save().then(doc => {
            console.log('doc', doc);
            if(!doc) {
                throw {
                    json: {
                        message: "The registration of the user has failed."
                    }, 
                    status: 400
                };
            }
            return doc;
        }).then(user => {

            var payload = {id: user._id};
            var token = jwt.sign(payload, JWTConfig.secret);
            
            let response = {
                success: true,
                status: 200,
                data: user,
                token: token
            };
            return res.json(this._createResponseObject(response));
        }).catch(error => {
            return res.status(error.status).json(this._createResponseObject(error.json));
        })

    }

     me(req, res, next) {
        console.log('req', req);
        console.log('res', res);
        console.log('next', next);
        // TODO: implement this route
        res.json({user: "me"})
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
