let mongoose = require("mongoose");
let mongoosePaginate = require("mongoose-paginate");
let config = require("../config/config");
let chalk = require("chalk");

class Mongoose {
    constructor() {
        mongoose.Promise = config.promise;
        mongoose.plugin(mongoosePaginate);
    }

    connect() {
        mongoose.connection.on("error", console.error.bind(console, "connection error:"));
        return mongoose.connect(config.db.uri, config.db.options)
            .then(() => console.log(chalk.green(`Connected with MongoDB! [${mongoose.connection.readyState}]`)))
            .catch((err) => {
                console.error(chalk.red("Could not connect to MongoDB!"));
                console.error(chalk.red(config.db.uri));
                console.log(err);
            });
    }

    disconnect() {
        return mongoose.connection.close()
            .then(() => console.log(chalk.green(`MongoDB got disconneted  [${mongoose.connection.readyState}]`)));
    }

    model(modelName) {
        return mongoose.model(modelName);
    }
}

module.exports = new Mongoose();
