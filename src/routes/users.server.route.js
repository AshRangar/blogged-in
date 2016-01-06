var express = require('express');
var userRouter = express.Router();

var User = require('../models/user.server.model.js');
var Blog = require('../models/blog.server.model.js');

module.exports = (nav, info) => {

    userRouter.route('/')
        .get(function (req, res) {
            User.find({}, function (err, users) {
                res.render('pages/userslist', {
                    nav: nav,
                    info: info,
                    title: info.title,
                    caption: info.caption,
                    copyright: info.copyright,
                    users: users
                });
            });
        });

    userRouter.route('/:id')
        .get(function (req, res) {
            var query = {
                authorId: req.params.id
            };

            Blog.find(query, function (err, blogs) {
                if (!err) {
                    res.render('pages/allposts', {
                        nav: nav,
                        info: info,
                        title: info.title,
                        caption: info.caption,
                        copyright: info.copyright,
                        blogs: blogs
                    });
                }
            })
        });

    return userRouter;
};