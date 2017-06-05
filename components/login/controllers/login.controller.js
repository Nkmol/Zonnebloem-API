let mongoose = require("mongoose");
let User = mongoose.model("User");
let BaseController = require("./../../base.controller");
let jwt = require("jsonwebtoken");
let JWTConfig = require("./../../config/config").jwt;
let mailService = require('../../services/mail.service');
let crypto = require('crypto');

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
        
        return new Promise((resolve, reject) => {
            // Early exit
            if (!(body.email && body.password)) {
                this.throw("Please provide 'email' and 'password'", 400);
            }

            body.email = body.email.toLowerCase();

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
                        this.throw("The given combination of password and email did not exist.", 401);
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
            // Notify the user that the registration is succeeded 
            let subject = "Zonnebloem - Registratie voltooid";
            let message = `Beste ${user.firstname},\n\nBedankt voor uw registratie.\n\nMet vriendelijke groeten,\nHet Zonnebloem team`;
            mailService.sendMail(user.email, subject, message, null);
            // Generate valid token and return response
            let token = jwt.sign({ "id": user._id }, JWTConfig.secret);
            // Execlude the password from the response
            user.password = undefined;
            return res.json(this._combineStatus({ "token": token, "data": user })); // Add token to default response
        })
        .catch(error => this._errorHandler(res, error));
    }

    forgot(req, res, next) {
        return new Promise((resolve, reject) => {
            crypto.randomBytes(20, (e, buf) => {
                if (e) reject(e);
                let token = buf.toString('hex');
                resolve(token);
            })
        }).then(token => {
            return User.findOne({ email: req.body.email })
                .then(user => {
                    if (!user) {
                        return res.status(404).json(this._combineStatus({ message: "User does not exist for the provided email", status: res.statusCode }));
                    }
                    user.resetPasswordToken = token;
                    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

                    return user.save().then(() => {
                        return {token, user}
                    })
                }) 
        }).then(({token, user}) => {
            let to = user.email;
            let subject = "Zonnebloem wachtwoord resetten"

            let proto = req.connection.encrypted ? 'https' : 'http';
            let host = req.headers.host;
            let message = 
                'U krijgt deze mail omdat u (of iemand anders) een verzoek heeft gedaan om het wachtwoord te veranderen\n\n' +
                'Klik op de volgende link, om dit proces te voltooien:\n\n' + 
                proto + '://' + host + '/reset/' + token + '\n\n' + 
                'Heeft u geen verzoek gedaan tot het resetten van het wachtwoord? Dan kunt u deze email negeren en uw wachtwoord blijft onveranderd.';
            return mailService.sendMail(to, subject, message, null);
        }).then(info => {
            return res.json(this._combineStatus({ message: "Een email is verstuurd naar de gebruiker" }));
        }).catch(e => {
            return res.status(400).json(this._combineStatus({ status: res.statusCode }));
        })
        
    }

    showReset(req, res, next) {
        res.render('reset/index', {
            token: req.params.token
        });
    }

    reset(req, res, next) {
        let token = req.params.token;
        let password = req.body.password;
        let confirm = req.body.confirm;

        if (!password || !confirm) {
            req.flash('error', 'Beide velden zijn verplicht');
            return res.redirect('back');
        }

        User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } })
            .then(user => {
                if (!user) {
                    req.flash('error', 'De token om het wachtwoord te resetten is ongeldig of is al verlopen!');
                    return res.redirect('back');
                }
                if (password !== confirm) {
                    req.flash('error', 'Het wachtwoord combinatie komt niet overeen!');
                    return res.redirect('back');
                }
                return User.generateHash(password).then(hash => { return {user, hash} });
            })
            .then(({user, hash}) => {
                user.password = hash;
                user.resetPasswordToken = undefined;
                user.resetPasswordExpires = undefined;

                return user.save();
            })
            .then(userDoc => {

                let recipientName = (userDoc.firstname) ? userDoc.firstname : 'lid van de Zonnebloem';
                

                let to = userDoc.email;
                let subject = 'Uw wachtwoord is veranderd';
                let message = 'Beste ' + userDoc.firstname + ',\n\n' +
                'Dit is een bevestiging dat het wachtwoord voor uw account ' + userDoc.email + ' is aangepast.\n\n' +
                'Met vriendelijke groeten,\n' +
                'Het Zonnebloem team';
                mailService.sendMail(to, subject, message, null).then(info => {
                    req.flash('success', 'Uw wachtwoord is aangepast.');
                    res.redirect('back');
                });
            })
            .catch(e => {
                res.redirect(`/reset/${token}`);
            })

    }

}

module.exports = new LoginController();