var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = {
    username: {
        type: String
    },
    password: {
        type: String
    },
    displayName: {
        type: String
    },
    image: {
        type: String
    },
    email: {
        type: String
    },
    facebook: {
        type: Object
    },
    twitter: {
        type: Object
    },
    google: {
        type: Object
    }
};

module.exports = mongoose.model('User', userSchema);