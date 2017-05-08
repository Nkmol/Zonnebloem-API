

/**
 * Module dependencies
 */
let mongoose = require("mongoose");
let Schema = mongoose.Schema;
let ObjectId = Schema.Types.ObjectId;

let roleSchema = new Schema({

    "_id": {
        "type": ObjectId
    },
    "title": {
        "type": String,
        "required": true
    }
});

mongoose.model("Role", roleSchema);
