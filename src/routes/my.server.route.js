var express = require('express');
var myRouter = express.Router();

var Blog = require('../models/blog.server.model.js');

module.exports = (nav) => {
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
            res.render('newblog');
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
                "authorId": req.user._id
            }, function (err, blogs) {
                if (!err) {
                    console.log(blogs);
                    res.render('blogs', {
                        title: 'Bloggedin',
                        caption: 'Powered by Node.js',
                        copyright: 'ASHw.xyz',
                        blogs: blogs
                    });
                    //                    res.json(blogs);
                } else {
                    res.send('Error!')
                }
            });
        });

    myRouter.route('/blogs/:id')
        .all(function (req, res, next) {
            if (req.user) {
                next();
            } else {
                next();
                //res.redirect('/');
            }
        })
        .get(function (req, res, next) {
            Blog.findById(req.params.id, function (err, blog) {
                if (!err) {
                    console.log(blog);
                    res.render('my/post', {
                        title: 'Bloggedin',
                        caption: 'Powered by Node.js',
                        copyright: 'ASHw.xyz',
                        blog: blog
                    });
                    //                    res.json(blogs);
                } else {
                    res.send('Error!')
                }
            });
        })

    return myRouter;
};