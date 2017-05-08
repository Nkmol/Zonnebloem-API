let config = require("../config/config");
let passport = require("passport");
let autoBind = require("auto-bind");

class JWTMiddleware {

    constructor(passport) {
        this.passport = passport;

        autoBind(this); // Bind all methods to itself
    }

    authenticate(req, res, next) {
        this.passport.authenticate("jwt", { "session": false }, (err, user, info) => {
            if (err) {
                return next(err);
            }
            if (!user) {
                res.statusCode = 401;
                return res.json({
                    "status": res.statusCode,
                    "message": config.jwt.invalidTokenMessage
                });
            }
            req.user = user;
            next();
        })(req, res, next);
    }

}

module.exports = new JWTMiddleware(passport);
