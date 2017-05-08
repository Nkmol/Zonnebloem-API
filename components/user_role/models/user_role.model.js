

/**
 * Module dependencies
 */
let mongoose = require("mongoose");
let Schema = mongoose.Schema;
let ObjectId = Schema.Types.ObjectId;

let userRoleSchema = new Schema({

    "_id": {
        "type": ObjectId
    },
    "roles": [
        { "type": ObjectId, "ref": "Role", "required": true }
    ],
    "department": {
        "type": ObjectId, "ref": "Department",
        "required": true
    }
});

mongoose.model("UserRole", userRoleSchema);
