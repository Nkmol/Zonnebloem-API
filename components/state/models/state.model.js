'use strict';

/**
 * Module dependencies
 */
let mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.Types.ObjectId;

let stateSchema = new Schema ({

    _id: { 
        type: ObjectId
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
});

mongoose.model('State', stateSchema);