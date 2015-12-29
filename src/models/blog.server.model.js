var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var blogSchema = {
    authorId: {
        type: Schema.Types.ObjectId,
    },
    title: {
        type: String
    },
    content: {
        type: String
    }
};

module.exports = mongoose.model('Blog', blogSchema);