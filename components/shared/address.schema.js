/**
 * Module dependencies
 */
let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let addressSchema = new Schema({

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
    "zip_code": {
        "type": String,
        "required": true
    }
}, { "_id": false });

module.exports = addressSchema;
