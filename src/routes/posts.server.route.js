var express = require('express');
var blogsRouter = express.Router();

var Post = require('../models/post.server.model.js');

var info = require('../config/info.config.js')();
var nav = require('../config/nav.config.js')();

module.exports = () => {
    blogsRouter.route('/')
        .all(function (req, res, next) {
            if (req.user) {
                nav[nav.length - 1].item = 'Logout';
                nav[nav.length - 1].link = '/auth/signOut';
            } else {
                nav[nav.length - 1].item = 'Login';
                nav[nav.length - 1].link = '/';
            }
            next();
        })
        .get(function (req, res) {
            Post.find({}, function (err, posts) {
                if (!err) {
                    info.heading = 'ALL POSTS';
                    info.subheading = 'Bloggedin';
                    res.render('pages/allposts', {
                        nav: nav,
                        info: info,
                        posts: posts
                    });
                }
            });
        });

    blogsRouter.route('/:id')
        .get(function (req, res, next) {
            Post.findById(req.params.id, function (err, post) {
                if (!err) {
                    info.heading = post.title;
                    info.subheading = post.caption;
                    res.render('pages/post', {
                        nav: nav,
                        info: info,
                        post: post
                    });
                } else {
                    res.send('Error!');
                }
            });
        });

    return blogsRouter;
};