'use strict';

/**
 * Module dependencies
 */
let mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.Types.ObjectId;

let roleSchema = new Schema ({

    _id: { 
        type: ObjectId
    },
    title: {
        type: String,
        required: true
    }
});

mongoose.model('Role', roleSchema);