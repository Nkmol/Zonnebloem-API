'use strict';

/**
 * Module dependencies
 */
let mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.Types.ObjectId, 
    bcrypt = require('bcrypt-nodejs');

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

userSchema.statics.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}

userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
}

module.exports = mongoose.model('User', userSchema);

