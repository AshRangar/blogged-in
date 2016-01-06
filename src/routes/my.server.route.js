var express = require('express');
var myRouter = express.Router();

var Blog = require('../models/blog.server.model.js');

module.exports = (nav, info) => {

    myRouter.route('/newpost')
        .all(function (req, res, next) {
            if (req.user) {
                next();
            } else {
                //next();
                res.redirect('/');
            }
        })
        .get(function (req, res) {
            res.render('pages/newpost', {
                nav: nav,
                info: info,
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
                    res.redirect('/my/newpost');
                }
                res.redirect('/my/newpost');
            });
        });

    myRouter.route('/posts')
        .all(function (req, res, next) {
            if (req.user) {
                next();
            } else {
                //next();
                res.redirect('/');
            }
        })
        .get(function (req, res) {
            var query = {
                'authorId': req.user._id
            };
            Blog.find(query).sort({
                date: -1
            }).exec(function (err, blogs) {
                if (!err) {
                    console.log(blogs);
                    res.render('pages/allposts', {
                        nav: nav,
                        info: info,
                        title: info.title,
                        caption: info.caption,
                        copyright: info.copyright,
                        blogs: blogs
                    });
                } else {
                    res.send('Error!');
                }
            });
        });

    return myRouter;
};