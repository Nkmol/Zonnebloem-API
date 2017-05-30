let mongoose = require("mongoose");
let User = mongoose.model("User");
let BaseController = require("./../../base.controller");
let jwt = require("jsonwebtoken");
let JWTConfig = require("./../../config/config").jwt;

class LoginController extends BaseController {

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

    isLoggedIn(req, res, next) {
        if (req.user) {
            res.status(200);
            res.send({ "message": "User is already logged in!" });
        }
        else {
            next();
        }
    }

    login(req, res, next) {
        let body = req.body;
        
        body.email = body.email.toLowerCase();

        return new Promise((resolve, reject) => {
            // Early exit
            if (!(body.email && body.password)) {
                this.throw("Please provide 'email' and 'password'", 400);
            }

            resolve();
        })
        .then(() => User.findOne({ "email": body.email }).select("+password"))
        .then(doc => {
            // 'Validate' email
            if (!doc) {
                this.throw("The given combination of password and email did not exist.", 401);
            }

            return doc;
        })
        .then(doc => {

            // Validate password
            return doc.validatePassword(body.password)
                .then(result => {

                    console.log('result', result);

                    if (!result) {
                        this.throw("The given combination of password and username did not exist.", 401);
                    }
                })
                .then(() => doc); // continue doc chain
        })
        .then(doc => {
            // Create payload
            let payload = { "id": doc._id };
            let token = jwt.sign(payload, JWTConfig.secret);
            // Execlude the password from the response
            doc.password = undefined;
            res.json(this._combineStatus({ "token": token, "data": doc }));
        })
        .catch(error => this._errorHandler(res, error));
    }

    register(req, res, next) {
        let body = req.body;

        return new Promise((resolve, reject) => {
            // Check input
            if (!(body.password && body.email)) {
                this.throw("Please provide all the fields required 'email' and 'password'", 400);
            }

            resolve();
        })
        .then(() => User.generateHash(body.password))
        .then(hash => {
            // create user and save
            body.password = hash;

            let user = new User(body);

            return user.save();
        })
        .then(doc => {
            // Check if user is saved
            if (!doc) {
                this.throw("The registration of the user has failed.", 400);
            }

            return doc;
        })
        .then(user => {
            // Generate valid token and return response
            let token = jwt.sign({ "id": user._id }, JWTConfig.secret);
            // Execlude the password from the response
            user.password = undefined;
            return res.json(this._combineStatus({ "token": token, "data": user })); // Add token to default response
        })
        .catch(error => this._errorHandler(res, error));
    }

}

module.exports = new LoginController();