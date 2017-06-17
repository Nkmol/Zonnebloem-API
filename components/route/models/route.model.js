

/**
 * Module dependencies
 */
let mongoose = require("mongoose");
let Schema = mongoose.Schema;
let ObjectId = Schema.Types.ObjectId;

let routeSchema = new Schema({
    "name": {
        "type": String,
        "required": true
    },
    "walked_by": { "type": ObjectId, "ref": "User" },
    "start_time": {
        "type": Date
    },
    "end_time": {
        "type": Date
    },
    "waypoints": {
        "type": { "type": String, "enum": [ "LineString" ], "required": true, "default": "LineString" },
        "coordinates": {
            "type": [ [ Number ] ],
            "required": true
        }
    },
    "obstacles": [
        { "type": ObjectId, "ref": "Obstacle" }
    ]
}, {
    "timestamps": {
        "createdAt": "created_at",
        "updatedAt": "updated_at"
    }
});

routeSchema.index({ "waypoints": "2dsphere" });

let autoPopulateFields = function(next) {
    this.populate("walked_by");
    this.populate("obstacles");
    next();
};

routeSchema
    .pre("findById", autoPopulateFields)
    .pre("findOne", autoPopulateFields)
    .pre("find", autoPopulateFields);

module.exports = mongoose.model("Route", routeSchema);
