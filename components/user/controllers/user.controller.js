'use strict'

let mongoose = require('mongoose'),
    User = mongoose.model('User'),
    BaseController = require('./../../base.controller'),
    jwt = require('jsonwebtoken'),
    JWTConfig = require('./../../config/config').jwt;


class UserController extends BaseController{
    constructor() {
        super();
        this._model = User;
        this._BaseResponse = Object.assign(this._BaseResponse, {
            token: null
        })
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
            return res.status(400).json(this._combineStatus({message: "Please provide 'username' and 'password'"}));

        // Find user by username and password
        return User.findOne({username: body.username})
            .then(doc => {
                // 'Validate' username
                if(!doc) 
                   this.throw("The given combination of password and username did not exist.", 401);

                return doc;
            })
            .then(doc => {
                // Validate password
                return doc.validatePassword(body.password)
                    .then(result => {
                        if(!result)
                            this.throw("The given combination of password and username did not exist.", 401);
                    })
                    .then(() => doc); // continue doc chain
            })
            .then(doc => {
                // Create payload
                var payload = {id: doc._id};
			    var token = jwt.sign(payload, JWTConfig.secret);
                
                res.json(this._combineStatus({token: token}))
            })
            .catch(error => {
                // TODO : Always work with normal string error (with default thow "")
                res.status(error.status).json(this._combineStatus(error));
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
            if(!doc) 
                this.throw("The registration of the user has failed.", 400);
            
            return doc;
        }).then(user => {
            let token = jwt.sign({id: user._id}, JWTConfig.secret);
            
            return res.json(this._combineStatus({token: token}));
        }).catch(error => {
            return res.status(error.status).json(this._combineStatus(error));
        })

    }

     me(req, res, next) {
        console.log('req', req);
        console.log('res', res);
        console.log('next', next);
        // TODO: implement this route
        res.json({user: "me"})
    }
}

module.exports = new UserController();