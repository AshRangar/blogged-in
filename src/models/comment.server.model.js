var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var blogSchema = mongoose.Schema({
    authorId: {
        type: Schema.Types.ObjectId
    },
    authorUsername: {
        type: String
    },
    postId: {
        type: Schema.Types.ObjectId
    },
    comment: {
        type: String
    },
    time: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Comment', blogSchema);