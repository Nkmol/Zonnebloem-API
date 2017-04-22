'use strict';

/**
 * Module dependencies
 */
let mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.Types.ObjectId;

let factorSchema = new Schema ({

    _id: { 
        type: ObjectId
    },
    name: {
        type: String
    },
    description: {
        type: String
    },
    level: {
        type: Number
    }
});

mongoose.model('Factor', factorSchema);