

/**
 * Module dependencies
 */
let mongoose = require("mongoose");
let Schema = mongoose.Schema;
let ObjectId = Schema.Types.ObjectId;


let regionSchema = new Schema({

    "_id": {
        "type": ObjectId
    },
    "name": {
        "type": String
    }
});

mongoose.model("Region", regionSchema);
