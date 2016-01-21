var express = require('express');
var commentsRouter = express.Router();

var Comment = require('../models/comment.server.model.js');

module.exports = () => {
    commentsRouter.route('/:id')
        .get((req, res) => {
            var query = {
                postId: req.params.id
            };
            Comment.find(query, null, {
                sort: {
                    time: -1
                }
            }, function (err, comments) {
                console.log(err);
                if (!err) {
                    res.json(comments);
                } else {
                    res.json({});
                }
            });
        })