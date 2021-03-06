/**
 * Module dependencies
 */
let mongoose = require("mongoose");
let Schema = mongoose.Schema;
let ObjectId = Schema.Types.ObjectId;

// obstacle states
const NEW = "NEW";
const REPORTED = "REPORTED";
const DECLINED = "DECLINED";
const IN_PORGRESS = "IN_PROGRESS";
const SOLVED = "SOLVED";

// obstacle severity states
const HIGH = "HIGH";
const MEDIUM = "MEDIUM";
const LOW = "LOW";

// let imageSchema = new Schema({
//     "url": {
//         "type": String,
//         "required": true
//     }
// });

let obstacleSchema = new Schema({
    "title": {
        "type": String,
        "required": true
    },
    "description": {
        "type": String,
        "required": true
    },
    "geometry": {
        "type": { "type": String, "default": "Point" },
        "coordinates": [ Number ]
    },
    "created_by": {
        "type": ObjectId, "ref": "User"
    },
    "images": [ String ],
    "state": {
        "type": String,
        "enum": {
            "values": [ NEW, REPORTED, DECLINED, IN_PORGRESS, SOLVED ],
            "message": "Invalid  obstacle state for `{PATH}` with value `{VALUE}`"
        },
        "required": true
    },
    "factor": {
        "type": String,
        "enum": {
            "values": [ HIGH, MEDIUM, LOW ],
            "message": "Invalid  severity factor for `{PATH}` with value `{VALUE}`"
        },
        "required": true
    }
}, {
    "timestamps": {
        "createdAt": "created_at",
        "updatedAt": "updated_at"
    }
});

var autoPopulateFields = function(next) {
    this.populate("created_by");
    next();
}

obstacleSchema.index({ "location_coordinates": "2dsphere" });
obstacleSchema
    .pre('find', autoPopulateFields)
    .pre('findById', autoPopulateFields)
    .pre('findOne', autoPopulateFields);

module.exports = mongoose.model("Obstacle", obstacleSchema);
