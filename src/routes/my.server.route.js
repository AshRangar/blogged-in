var express = require('express');
var myRouter = express.Router();

var Blog = require('../models/blog.server.model.js');

module.exports = (nav, info) => {

    myRouter.route('/newBlog')
        .all(function (req, res, next) {
            if (req.user) {
                next();
            } else {
                //next();
                res.redirect('/');
            }
        })
        .get(function (req, res) {
            res.render('newblog', {
                nav: nav,
                title: info.title,
                caption: info.caption,
                copyright: info.copyright
            });
        })
        .post(function (req, res) {
            var blog = new Blog;
            blog.title = req.body.title;
            blog.subtitle = req.body.subtitle;
            blog.content = req.body.content;
            blog.authorId = req.user._id;

            blog.save((err) => {
                //Needs to print the error!
                if (err) {
                    console.log('Error. Couldn\'t add blog to database');
                    res.redirect('/my/newblog');
                }
                res.redirect('/my/newblog');
            });
        });

    myRouter.route('/blogs')
        .all(function (req, res, next) {
            if (req.user) {
                next();
            } else {
                //next();
                res.redirect('/');
            }
        })
        .get(function (req, res) {
            console.log(req.user._id);
            Blog.find({
                'authorId': req.user._id
            }, function (err, blogs) {
                if (!err) {
                    console.log(blogs);
                    res.render('blogs', {
                        nav: nav,
                        title: info.title,
                        caption: info.caption,
                        copyright: info.copyright,
                        blogs: blogs
                    });
                    //                    res.json(blogs);
                } else {
                    res.send('Error!');
                }
            });
        });

    return myRouter;
};