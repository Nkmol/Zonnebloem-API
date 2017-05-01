'use strict';

/**
 * Module dependencies
 */
let mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.Types.ObjectId;


let coordinateSchema = new Schema ({

    _id: { 
        type: ObjectId
    },
    lat: {
        type: Schema.Types.Decimal128
    },
    long: {
        type: Schema.Types.Decimal128
    }
});

mongoose.model('Coordinate', coordinateSchema);