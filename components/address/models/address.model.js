/**
 * Module dependencies
 */
let mongoose = require("mongoose");
let Schema = mongoose.Schema;
let ObjectId = Schema.Types.ObjectId;

let addressSchema = new Schema({
    "_id": {
        "type": ObjectId
    },
    "street": {
        "type": String,
        "required": true
    },
    "house_number": {
        "type": String,
        "required": true
    },
    "city": {
        "type": String,
        "required": true
    },
    "zipe_code": {
        "type": String,
        "required": true
    }
});

mongoose.model("Address", addressSchema);
