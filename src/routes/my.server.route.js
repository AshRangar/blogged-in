var express = require('express');
var myRouter = express.Router();

var Post = require('../models/post.server.model.js');
var User = require('../models/user.server.model.js');

var info = require('../config/info.config.js')();
var nav = require('../config/nav.config.js')();

module.exports = () => {

    myRouter.route('/newpost')
        .all(function (req, res, next) {
            if (req.user) {
                next();
            } else {
                req.flash('error', 'Please sign in to access this page!');
                res.redirect('/');
            }
        })
        .get(function (req, res) {
            info.heading = 'NEW POST';
            info.subheading = req.user.username;
            res.render('pages/newpost', {
                nav: nav,
                info: info
            });
        })
        .post(function (req, res) {
            var post = new Post;
            post.title = req.body.title;
            post.subtitle = req.body.subtitle;
            post.content = req.body.content;
            post.authorId = req.user._id;
            post.authorUsername = req.user.username;

            post.save((err) => {
                if (err) {
                    req.flash('error', 'Error! Couldn\'t save the post');
                    res.redirect('/my/newpost');
                } else {
                    req.flash('notice', 'Congratulations! Your post has been added.');
                    res.redirect('/my/newpost');
                }

            });
        });

    myRouter.route('/posts')
        .all(function (req, res, next) {
            if (req.user) {
                next();
            } else {
                req.flash('error', 'Please sign in to access this page!');
                res.redirect('/');
            }
        })
        .get(function (req, res) {
            var query = {
                'authorId': req.user._id
            };
            Post.find(query).sort({
                date: -1
            }).exec(function (err, posts) {
                if (!err) {
                    info.heading = 'My Posts';
                    info.subheading = req.user.username;
                    res.render('pages/allposts', {
                        nav: nav,
                        info: info,
                        posts: posts
                    });
                } else {
                    res.send('Error!');
                }
            });
        });


    //Check if the user is the author. Otherwise display an error message
    myRouter.route('/post')
        .all(function (req, res, next) {
            if (req.user) {
                next();
            } else {
                req.flash('error', 'Please sign in to access this page!');
                res.redirect('/');
            }
        });

    myRouter.route('/post/edit/:id')
        .all(function (req, res, next) {
            var query = {
                _id: req.params.id
            };
            Post.findOne(query, function (err, post) {
                if (!err) {
                    if (req.user && post.authorId == req.user._id) {
                        next();
                    } else {
                        req.flash('error', 'The operation could not be processed!');
                        res.redirect('/');
                    }
                } else {
                    req.flash('error', 'The operation could not be processed!');
                    res.redirect('/');
                }
            });
        })
        .get(function (req, res, next) {
            res.send('Editing the post');
        })
        .post(function (req, res, next) {

        });

    myRouter.route('/post/delete/:id')
        .get(function (req, res, next) {
            var query = {
                _id: req.params.id
            };
            Post.findOne(query, function (err, post) {
                if (!err) {
                    if (req.user && post.authorId == req.user._id) {
                        post.remove(function (err, post) {
                            if (!err) {
                                req.flash('notice', 'The post was deleted successfully!');
                                res.redirect('/my/posts');
                            } else {
                                req.flash('error', 'Sorry the post could not be deleted!');
                                res.redirect('/');
                            }
                        });
                    } else {
                        req.flash('error', 'The operation could not be processed!');
                        res.redirect('/');
                    }
                } else {
                    req.flash('error', 'The operation could not be processed!');
                    res.redirect('/');
                }
            });
        });

    return myRouter;
};