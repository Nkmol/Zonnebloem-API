/**
 * Module dependencies
 */
let mongoose = require("mongoose");
let Schema = mongoose.Schema;
let ObjectId = Schema.Types.ObjectId;

let reportSchema = new Schema({
    "title": {
        "type": String,
        "required": true
    },
    "description": {
        "type": String,
        "required": true
    },
    "created_by": {
        "type": ObjectId, "ref": "User"
    },
    "obstacles": [
        { "type": ObjectId, "ref": "Obstacle" }
    ],
    "department": {
        "type": ObjectId, "ref": "Department"
    },
    "attachments": [
        { "url": String, "required": true } // attachment file url
    ]
}, {
    "timestamps": {
        "createdAt": "created_at",
        "updatedAt": "updated_at"
    }
});

module.exports = mongoose.model("Report", reportSchema);
