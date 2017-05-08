

/**
 * Module dependencies
 */
let mongoose = require("mongoose");
let Schema = mongoose.Schema;
let ObjectId = Schema.Types.ObjectId;
let bcrypt = require("bcrypt-nodejs");


let userSchema = new Schema({
    "username": {
        "type": String,
        // minlength: 5,
        // maxlength: 25,
        "index": { "unique": true },
        "required": true
    },
    "password": {
        "type": String,
        // minlength: 5,
        // maxlength: 25,
        "required": true
    },
    "email": {
        "type": String,
        "required": true
    },
    "firstname": {
        "type": String
    },
    "lastname": {
        "type": String
    },
    "tel": {
        "type": String
    },
    "address": {
        "type": ObjectId, "ref": "Address"
    },
    "is_active": {
        "type": Boolean
    },

    "roles": [
        { "type": ObjectId, "ref": "Role" }
    ],
    "profile_image": {
        "type": ObjectId, "ref": "Image"
    }
}, {
    "timestamps": {
        "createdAt": "created_at",
        "updatedAt": "updated_at"
    }
});

// Used to load user role as the default role
userSchema.pre("save", (next) => {
    next();
});

userSchema.statics.generateHash = function(password) {
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, bcrypt.genSaltSync(8), null, (err, data) => {
            if (err !== null) {
                return reject(err);
            }
            resolve(data);
        });
    });
};

userSchema.methods.validatePassword = function(password) {
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, this.password, (err, data) => {
            if (err !== null) {
                return reject(err);
            }
            resolve(data);
        });
    });
};

module.exports = mongoose.model("User", userSchema);
