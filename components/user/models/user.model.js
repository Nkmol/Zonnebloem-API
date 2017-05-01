'use strict';

/**
 * Module dependencies
 */
let mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.Types.ObjectId;

let userSchema = new Schema ({
    username: {
        type: String,
        // minlength: 5,
        // maxlength: 25,
        index: { unique: true },
        required: true
    }, 
    password: {
        type: String,
        // minlength: 5,
        // maxlength: 25,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    firstname: {
        type: String
    },
    lastname: {
        type: String
    },
    tel: {
        type: String
    },
    address: {
        type: ObjectId, ref: 'Address'
    },
    is_active: {
        type: Boolean
    },

    roles: [
        {type: ObjectId, ref: "Role"}
    ],
    profile_image: {
        type: ObjectId, ref: 'Image'
    }
},
{
    timestamps: { 
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

// Used to load user role as the default role
userSchema.pre('save', function(next) {
    next();
});

mongoose.model('User', userSchema);