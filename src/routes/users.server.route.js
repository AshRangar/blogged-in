var express = require('express');
var userRouter = express.Router();

var User = require('../models/user.server.model.js');
var Post = require('../models/post.server.model.js');

module.exports = (nav, info) => {

    userRouter.route('/')
        .get(function (req, res) {
            User.find({}, function (err, users) {
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