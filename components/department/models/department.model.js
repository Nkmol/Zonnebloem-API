'use strict';

/**
 * Module dependencies
 */
let mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.Types.ObjectId;


let departmentSchema = new Schema ({

    _id: { 
        type: ObjectId
    },
    name: {
        type: String
    },
    tel: {
        type: String
    },
    coordinates: {
        type: ObjectId, ref: 'Coordinate'
    },
    address: {
        type: ObjectId, ref: 'Address'
    },
    region: { type: ObjectId, ref: 'Region'
    }
});

// Used to load state as the default state
departmentSchema.pre('save', function(next) {

});

mongoose.model('Department', departmentSchema);