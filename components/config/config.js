let config = {};

// -- Promises --
config.promise = global.Promise;

// -- Glob* --
config.models = "components/**/models/*.model.js"; // Used to dynamically load all models

// -- JWT --
config.jwt = {};
config.jwt.secret = "zonnebloem-secret-8291828373";
config.jwt.invalidTokenMessage = "Token is invalid or not provided";

module.exports = ((() => {

switch(process.env.NODE_ENV) {
    case "production":
        return Object.assign(require('./config.prod'), config);
    case "test":
        return Object.assign(require('./config.test'), config);
    default:
        return Object.assign(require('./config.dev'), config);
}

})());
