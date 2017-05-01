'use strict';

/**
 * Module dependencies
 */
let mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.Types.ObjectId;


let regionSchema = new Schema ({

    _id: { 
        type: ObjectId
    },
    name: {
        type: String
    }
});

// Used to load state as the default state
regionSchema.pre('save', function(next) {

});

mongoose.model('Region', regionSchema);