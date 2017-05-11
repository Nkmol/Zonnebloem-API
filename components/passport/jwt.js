let JWTConfig = require("../config/config").jwt;
let User = require("../user/models/user.model");
let passport = require("passport");

let { Strategy, ExtractJwt } = require("passport-jwt");
let options = {
    "jwtFromRequest": ExtractJwt.fromAuthHeader(),
    "secretOrKey": JWTConfig.secret
};

class PassportJWT {

    constructor() {
        this.setupStrategy();
    }

    setupStrategy() {
        passport.use(new Strategy(options,
            (payload, done) => {
                User.findOne({ "_id": payload.id }).then((user) => {
                    if (!user) {
                        return done(null, false);
                    }

                    return done(null, user);
                }).catch((e) => {
                    return done(e);
                });
            }
        ));

        // Serialize user for the session
        passport.serializeUser((user, done) => {
            done(null, user.id);
        });

        // Deserialize user
        passport.deserializeUser((id, done) => {
            User.findById(id, (err, user) => {
                done(err, user);
            });
        });
    }
}

module.exports = new PassportJWT();
