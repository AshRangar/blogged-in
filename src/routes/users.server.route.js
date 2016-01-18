var express = require('express');
var userRouter = express.Router();

var User = require('../models/user.server.model.js');
var Post = require('../models/post.server.model.js');

var info = require('../config/info.config.js')();
var nav = require('../config/nav.config.js')();

module.exports = () => {

    userRouter.route('/')
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
            User.find({}, function (err, users) {
                info.heading = 'ALL USERS';
                info.subheading = 'Bloggedin';
                res.render('pages/userslist', {
                    nav: nav,
                    info: info,
                    users: users
                });
            });
        });

    userRouter.route('/:id')
        .all(function (req, res, next) {

            var query = {
                _id: req.params.id
            };

            User.findOne(query, function (err, user) {
                if (user) {
                    req.username = user.username;
                    next();
                } else {
                    req.flash('error', 'Error! Couldn\'t find the user');
                    res.redirect('users');
                }
            });
        })
        .get(function (req, res) {
            var query = {
                authorId: req.params.id
            };

            Post.find(query, function (err, posts) {
                if (!err) {
                    info.heading = req.username;
                    info.subheading = 'Posts';
                    res.render('pages/allposts', {
                        nav: nav,
                        info: info,
                        posts: posts
                    });
                }
            });
        });

    return userRouter;
};