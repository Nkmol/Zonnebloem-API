var config = {}

// -- DB --
config.db = {};
config.db.user = "user";
config.db.password = "user";
config.db.uri = `mongodb://${config.db.user}:${config.db.password}@ds064299.mlab.com:64299/zonnebloem-dev`;
config.db.options = {
    
};

module.exports = config;