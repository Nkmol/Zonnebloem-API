'use strict';

/**
 * Module dependencies
 */
let mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.Types.ObjectId;

let addressSchema = new Schema ({

    _id: { 
        type: ObjectId
    },
    street: {
        type: String,
        required: true
    },
    house_number: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    zipe_code: {
        type: String,
        required: true
    }
});

mongoose.model('Address', addressSchema);