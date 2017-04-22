'use strict';

/**
 * Module dependencies
 */
let mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.Types.ObjectId;

let obstacleSchema = new Schema ({

    _id: { 
        type: ObjectId
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    coordinates: {
        type: ObjectId, ref: 'Coordinate'
    },
    created_by: { 
        type: ObjectId, ref: 'User'
    },
    images: [
        { type: ObjectId, ref: 'Image' }
    ],
    state: {
        type: ObjectId, ref: 'State',
        required: true
    },
    factor: {
        type: ObjectId, ref: 'Factor'
    }
},
{
    timestamps: { 
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

// Used to load state as the default state
obstacleSchema.pre('save', function(next) {

});

mongoose.model('Obstacle', obstacleSchema);