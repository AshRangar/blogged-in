var express = require('express');
var myRouter = express.Router();

var Post = require('../models/post.server.model.js');

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
                info: info
            });
        })
        .post(function (req, res) {
            var post = new Post;
            post.title = req.body.title;
            post.subtitle = req.body.subtitle;
            post.content = req.body.content;
            post.authorId = req.user._id;

            post.save((err) => {
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
            Post.find(query).sort({
                date: -1
            }).exec(function (err, posts) {
                if (!err) {
                    res.render('pages/allposts', {
                        nav: nav,
                        info: info,
                        posts: posts
                    });
                } else {
                    res.send('Error!');
                }
            });
        });

    return myRouter;
};