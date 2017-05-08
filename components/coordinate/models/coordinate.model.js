/**
 * Module dependencies
 */
let mongoose = require("mongoose");
let Schema = mongoose.Schema;
let ObjectId = Schema.Types.ObjectId;


let coordinateSchema = new Schema({

    "_id": {
        "type": ObjectId
    },
    "lat": {
        // @ts-ignore
        "type": Schema.Types.Decimal128
    },
    "long": {
        // @ts-ignore
        "type": Schema.Types.Decimal128
    }
});

mongoose.model("Coordinate", coordinateSchema);
