var express = require('express');
var commentsRouter = express.Router();

var Comment = require('../models/comment.server.model.js');

module.exports = () => {
    commentsRouter.route('/:id')
        .get(function (req, res) {
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
        .post(function (req, res) {
            if (req.user) {

                var comment = new Comment;
                comment.authorId = req.user._id;
                comment.authorUsername = req.user.username;
                comment.comment = req.body.comment;
                comment.postId = req.params.id;

                //Check if id exists

                comment.save(function (err) {
                    if (err) {
                        res.json({
                            success: false,
                            message: 'can\'t connect to database'
                        });
                    } else {
                        res.json({
                            success: true,
                            message: 'succesfully added the comment'
                        });

                    }
                });

            } else {
                res.json({
                    success: false,
                    message: 'not signedin'
                });
            }
        })

    return commentsRouter;
};