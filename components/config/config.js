var config = {};

// -- Promises --
config.promise = global.Promise;

// -- Glob* --
config.models = 'components/**/models/*.model.js' // Used to dynamically load all models

// -- DB -- 
config.db = {};
config.db.user = 'user';
config.db.password = 'user';
config.db.uri = `mongodb://${config.db.user}:${config.db.password}@ds062059.mlab.com:62059/zonnebloem`;
config.db.options = {
    
};

module.exports = config;