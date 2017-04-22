'use strict';


const GOOD = 'GOOD';
const BAD = 'BAD';
const IN_PORGRESS = 'IN_PROGRESS';
const FIXED = 'FIXED';

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
    location: {
        type: [Number], index: '2dsphere'
    },
    created_by: { 
        type: ObjectId, ref: 'User'
    },
    images: [
        { type: ObjectId, ref: 'Image' }
    ],
    state: {
        type: String,
        enum: {
            values: [GOOD, BAD, IN_PORGRESS, FIXED]
        },
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
    },
    
});

// Used to load state as the default state
obstacleSchema.pre('save', function(next) {

});

mongoose.model('Obstacle', obstacleSchema);