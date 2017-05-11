'use strict';

/**
 * Module dependencies
 */
let mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.Types.ObjectId,
    addressSchema = require('../../shared/address.schema');

let departmentSchema = new Schema({

    _id: {
        type: ObjectId
    },
    name: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: false
    },
    tel: {
        type: String
    },
    location_coordinates: {
        type: { type: String, default: 'Point' },
        coordinates: { type: [Number], default: [0,0] }

    },
    address: addressSchema,
    region: { type: ObjectId, ref: 'Region' }
});

departmentSchema.index({ location_coordinates: '2dsphere' })

mongoose.model('Department', departmentSchema);