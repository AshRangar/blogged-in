var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var blogSchema = mongoose.Schema({
    authorId: {
        type: Schema.Types.ObjectId,
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

module.exports = mongoose.model('Blog', blogSchema);