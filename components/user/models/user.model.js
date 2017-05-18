/**
 * Module dependencies
 */
let mongoose = require("mongoose");
let Schema = mongoose.Schema;
let ObjectId = Schema.Types.ObjectId;
let addressSchema = require("../../shared/address.schema");
let bcrypt = require("bcrypt-nodejs");

// User roles
let ROLES = [ "ADMIN", "MODERATOR", "CONTROLER", "VOLUNTEER", "GUEST" ];

let userRoleSchema = new Schema({
    "role": {
        "type": String,
        "enum": {
            "values": ROLES,
            "default": "GUEST",
            "message": "`{VALUE}` is not a valid user role."
        },
        "required": true
    },
    "department": {
        "type": ObjectId,
        "ref": "Department"
    }
}, { "_id": false });

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
        "required": true,
        "select": false
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
    "address": addressSchema,
    "roles": [ userRoleSchema ],
    "profile_image": {
        "type": String
    },
    "is_active": {
        "type": Boolean
    }
},
    {
        "timestamps": {
            "createdAt": "created_at",
            "updatedAt": "updated_at"
        }
    });
   
// Load default user role if non are specified
userSchema.pre("save", false, function(next) {
    // If a department (role object) has been defined without a Role
    if (this.roles && this.roles.length > 0) {
        this.roles.forEach((userRole, i) => {
            if (!userRole.role) {
                this.user_role[ i ].role = "VOLUNTEER";
            }
        });
    }
    // When no department has been given, we assume this is a guest (not directly working with Zonnebloem)
    else if (!this.roles || this.roles.length <= 0) {
        this.roles = [];
        this.roles.push({ "role": "GUEST" });
    }

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
