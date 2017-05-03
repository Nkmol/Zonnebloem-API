'use strict';

/**
 * Module dependencies
 */
let mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.Types.ObjectId;


let departmentSchema = new Schema({

    _id: {
        type: ObjectId
    },
    name: {
        type: String
    },
    tel: {
        type: String
    },
    location_coordinates: {
        type: { type: String },
        coordinates: [Number]

    },
    address: {
        type: ObjectId, ref: 'Address'
    },
    region: { type: ObjectId, ref: 'Region' }
});

departmentSchema.index({ location_coordinates: '2dsphere' })

mongoose.model('Department', departmentSchema);