var express = require('express');
var userRouter = express.Router();

var User = require('../models/user.server.model.js');
var Blog = require('../models/blog.server.model.js');

module.exports = () => {
    userRouter.route('/')
        .get(function (req, res) {
            User.find({}, function (err, users) {
                res.render('userslist', {
                    title: 'Bloggedin',
                    caption: 'Powered by Node.js',
                    copyright: 'ASHw.xyz',
                    users: users
                })
            });
        });

    userRouter.route('/:id')
        .get(function (req, res) {
            var query = {
                authorId: req.params.id
            };

            Blog.find(query, function (err, blogs) {
                if (!err) {
                    res.render('blogs', {
                        title: 'Bloggedin',
                        caption: 'Powered by Node.js',
                        copyright: 'ASHw.xyz',
                        blogs: blogs
                    });
                }
            })
        });

    return userRouter;
};