'use strict';

/**
 * Module dependencies
 */
let mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.Types.ObjectId;


let imageSchema = new Schema ({

    _id: { 
        type: ObjectId
    },
    url: {
        type: String
    }
});

mongoose.model('Image', imageSchema);