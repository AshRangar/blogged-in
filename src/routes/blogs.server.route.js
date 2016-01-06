var express = require('express');
var blogsRouter = express.Router();

var Blog = require('../models/blog.server.model.js');

module.exports = (nav, info) => {
    blogsRouter.route('/')
        .get(function (req, res) {
            Blog.find({}, function (err, blogs) {
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
            });
        });

    blogsRouter.route('/:id')
        .get(function (req, res, next) {
            Blog.findById(req.params.id, function (err, blog) {
                if (!err) {
                    res.render('pages/post', {
                        nav: nav,
                        info: info,
                        title: info.title,
                        caption: info.caption,
                        copyright: info.copyright,
                        blog: blog
                    });
                } else {
                    res.send('Error!');
                }
            });
        });

    return blogsRouter;
};