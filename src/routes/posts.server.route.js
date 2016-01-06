var express = require('express');
var blogsRouter = express.Router();

var Post = require('../models/post.server.model.js');

module.exports = (nav, info) => {
    blogsRouter.route('/')
        .get(function (req, res) {
            Post.find({}, function (err, posts) {
                if (!err) {
                    res.render('pages/allposts', {
                        nav: nav,
                        info: info,
                        title: info.title,
                        caption: info.caption,
                        copyright: info.copyright,
                        posts: posts
                    });
                }
            });
        });

    blogsRouter.route('/:id')
        .get(function (req, res, next) {
            Post.findById(req.params.id, function (err, post) {
                if (!err) {
                    res.render('pages/post', {
                        nav: nav,
                        info: info,
                        title: info.title,
                        caption: info.caption,
                        copyright: info.copyright,
                        post: post
                    });
                } else {
                    res.send('Error!');
                }
            });
        });

    return blogsRouter;
};