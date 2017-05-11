'use strict';

/**
 * Module dependencies
 */
let mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.Types.ObjectId,
    addressSchema = require('../../shared/address.schema'),
    bcrypt = require('bcrypt-nodejs');

// User roles
let ROLES = ['ADMIN', 'MODERATOR', 'CONTROLER', 'VOLUNTEER'];

let userRoleSchema = new Schema({
    role: {
        type: String,
        enum: {
            values: ROLES,
            message: '`{VALUE}` is not a valid user role.'
        }
    },
    department: {
        type: ObjectId,
        ref: 'Department'
    }
}, { _id: false });

let userSchema = new Schema({
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
    address: addressSchema,
    roles: [userRoleSchema],
    profile_image: {
        type: String
    },
    is_active: {
        type: Boolean
    }
},
    {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    });

userSchema.statics.generateHash = function (password) {
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, bcrypt.genSaltSync(8), null, (err, data) => {
            if (err !== null) return reject(err);
            resolve(data);
        });
    });
}

userSchema.methods.validatePassword = function (password) {
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, this.password, (err, data) => {
            if (err !== null) return reject(err);
            resolve(data);
        });
    });
}

module.exports = mongoose.model('User', userSchema);