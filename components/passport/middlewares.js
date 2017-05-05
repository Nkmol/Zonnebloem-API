let config = require('../config/config');
let passport = require('passport');

class JWTMiddleware {

    constructor(passport) {
        this.passport = passport;    
    }

    authenticate(req, res, next) {
        this.passport.authenticate("jwt", { session: false }, function(err, user, info) {
            if (err) return next(err);
            if (!user) {
                res.statusCode = 401;
                return res.json({
                    status: res.statusCode,
                    message: config.jwt.invalidTokenMessage
                })
            }
            req.user = user;
            next();
        })(req, res, next);
    }

}

module.exports = new JWTMiddleware(passport);