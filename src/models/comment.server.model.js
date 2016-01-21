var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var blogSchema = mongoose.Schema({
    authorId: {
        type: Schema.Types.ObjectId,
    },
    authorUsername: {
        type: String
    },
    comment: {
        type: String
    }
});

module.exports = mongoose.model('Comment', blogSchema);