var express = require('express');
var userRouter = express.Router();

var User = require('../models/user.server.model.js');
var Post = require('../models/post.server.model.js');

var info = require('../config/info.config.js')();
var nav = require('../config/nav.config.js')();

module.exports = () => {

    userRouter.route('/')
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
        .get(function (req, res) {
            var query = {
                authorId: req.params.id
            };

            Post.find(query, function (err, posts) {
                if (!err) {
                    info.heading = '';
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