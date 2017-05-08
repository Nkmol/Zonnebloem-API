

/**
 * Module dependencies
 */
let mongoose = require("mongoose");
let Schema = mongoose.Schema;
let ObjectId = Schema.Types.ObjectId;


let routeSchema = new Schema({

    "_id": {
        "type": ObjectId
    },
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
    "waypoints": [
        {
            "type": ObjectId, "ref": "Coordinate"
        }
    ],
    "obstacles": [
        { "type": ObjectId, "ref": "Obstacle" }
    ]
}, {
    "timestamps": {
        "createdAt": "created_at",
        "updatedAt": "updated_at"
    }
});

mongoose.model("Route", routeSchema);
