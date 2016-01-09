var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var blogSchema = mongoose.Schema({
    authorId: {
        type: Schema.Types.ObjectId,
    },
    authorUsername: {
        type: String
    },
    title: {
        type: String
    },
    subtitle: {
        type: String
    },
    content: {
        type: String
    }
});

module.exports = mongoose.model('Post', blogSchema);