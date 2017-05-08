'use strict';

/**
 * Module dependencies
 */
let mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.Types.ObjectId;

let reportSchema = new Schema ({

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
    created_by: { 
        type: ObjectId, ref: 'User'
    },
    obstacles: [
        { type: ObjectId, ref: 'Obstacle'}
    ],
    department: {
        type: ObjectId, ref: 'Department'
    },
    attachments: [
        new Schema({ url: String }) // attachment file url
    ]
},
{
    timestamps: { 
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

mongoose.model('Report', reportSchema);