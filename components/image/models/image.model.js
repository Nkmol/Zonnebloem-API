/**
 * Module dependencies
 */
let mongoose = require("mongoose");
let Schema = mongoose.Schema;
let ObjectId = Schema.Types.ObjectId;


let imageSchema = new Schema({
    "_id": {
        "type": ObjectId
    },
    "url": {
        "type": String
    }
});

mongoose.model("Image", imageSchema);
