/**
 * Module dependencies
 */
let mongoose = require("mongoose");
let Schema = mongoose.Schema;
let ObjectId = Schema.Types.ObjectId;


let departmentSchema = new Schema({

    "_id": {
        "type": ObjectId
    },
    "name": {
        "type": String
    },
    "tel": {
        "type": String
    },
    "coordinates": {
        "type": ObjectId, "ref": "Coordinate"
    },
    "address": {
        "type": ObjectId, "ref": "Address"
    },
    "region": { "type": ObjectId, "ref": "Region"
    }
});

mongoose.model("Department", departmentSchema);
