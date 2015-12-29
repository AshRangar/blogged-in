var express = require('express');
var myRouter = express.Router();

var Blog = require('../models/blog.server.model.js');

module.exports = (nav) => {
    myRouter.route('/newBlog')
        .all(function (req, res, next) {
            if (req.user) {
                next();
            } else {
                //                next();
                res.redirect('/');
            }
        })
        .get(function (req, res) {
            res.render('newblog');
        })
        .post(function (req, res) {
            var blog = new Blog;
            blog.title = req.body.title;
            blog.content = req.body.content;
            console.log(req.body);

            blog.save((err) => {
                //Needs to print the error!
                if (err) {
                    console.log('Error. Couldn\'t add blog to database');
                    res.redirect('/my/newblog');
                }
                res.redirect('/my/newblog');
            });
        });

    return myRouter;
};