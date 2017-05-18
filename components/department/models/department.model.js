/**
 * Module dependencies
 */

let mongoose = require("mongoose");
let Schema = mongoose.Schema;
let ObjectId = Schema.Types.ObjectId;
let addressSchema = require("../../shared/address.schema");

let departmentSchema = new Schema({
    "name": {
        "type": String,
        "required": true
    },
    "code": {
        "type": String,
        "required": false
    },
    "tel": {
        "type": String
    },
    "location_coordinates": {
        "type": { "type": String, "default": "Point" },
        "coordinates": { "type": [ Number ], "default": [ 0, 0 ] }

    },
    "address": addressSchema,
    "region": { "type": ObjectId, "ref": "Region" }
});

departmentSchema.index({ "location_coordinates": "2dsphere" });

module.exports = mongoose.model("Department", departmentSchema);
