'use strict';

/**
 * Module dependencies
 */
let mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.Types.ObjectId;


let regionSchema = new Schema ({

    _id: { 
        type: ObjectId
    },
    name: {
        type: String
    }
});

mongoose.model('Region', regionSchema);