var express = require('express');
var authRouter = express.Router();
var passport = require('passport');

var info = require('../config/info.config.js')();
var nav = require('../config/nav.config.js')();

var User = require('../models/user.server.model.js');

module.exports = () => {

    authRouter.route('/signIn')
        .post(passport.authenticate('local.signin', {
            failureRedirect: '/'
        }), (req, res) => {
            res.redirect('/my/posts');
        });

    authRouter.route('/signUp')
        .post(passport.authenticate('local.signup', {
            failureRedirect: '/'
        }), (req, res) => {
            res.redirect('/my/posts');
        });

    authRouter.route('/signOut')
        .get(function (req, res) {
            req.logout();
            res.redirect('/');
        });

    // Route to force user to create an username if haven't created already
    // Intended to users that use OAuth
    authRouter.route('/username')
        // If the user is not logged in, redirect to login page
        // If the user is logged in, go next
        .all(function (req, res, next) {
            if (!req.user) {
                res.redirect('/');
            } else {
                next();
            }
        })
        // If the user doesn't have a username, redirect to pages/username
        // If the user has username, redirect to /my/posts
        .get(function (req, res) {
            if (!req.user.username) {
                res.render('pages/username', {
                    info: info,
                    nav: nav
                });
            } else {
                res.redirect('/my/posts');
            }
        })
        // If the user has username, redirect to /my/posts
        // If the user doesn't have one, add the entered username to user document
        .post(function (req, res) {
            if (!req.user.username) {
                var query = {
                    _id: req.user._id
                };
                User.findOne(query, function (err, user) {
                    if (!err) {
                        user.username = req.body.username;
                        user.save();
                        res.redirect('/my/posts');
                    } else {
                        res.redirect('/auth/username');
                    }
                });
            } else {
                res.redirect('/my/posts');
            }

        });

    // API to check if the username is already taken
    authRouter.route('/username/:username')
        .get(function (req, res, next) {
            var query = {
                username: req.params.username
            };
            User.findOne(query, function (err, user) {
                if (err) {
                    res.json({
                        error: 'true',
                        message: 'cannot connect to database'
                    });
                } else if (user) {
                    res.json({
                        exists: 'true'
                    });
                } else {
                    res.json({
                        exists: 'false'
                    });
                }
            });
        });

    // API to check if the user with the provided email exits
    authRouter.route('/email/:email')
        .get(function (req, res, next) {
            var query = {
                email: req.params.email
            };
            User.findOne(query, function (err, user) {
                if (err) {
                    res.json({
                        error: 'true',
                        message: 'cannot connect to database'
                    });
                } else if (user) {
                    res.json({
                        exists: 'true'
                    });
                } else {
                    res.json({
                        exists: 'false'
                    });
                }
            });
        });

    authRouter.route('/profile')
        .all((req, res, next) => {
            if (!req.user) {
                res.redirect('/');
            } else {
                next();
            }
        })
        .get((req, res) => {
            res.json(req.user);
        });

    authRouter.route('/google/callback')
        .get(passport.authenticate('google', {
            successRedirect: '/auth/username',
            failureRedirect: '/error'
        }));

    authRouter.route('/google')
        .get(passport.authenticate('google', {
            scope: ['https://www.googleapis.com/auth/userinfo.profile', 'https://www.googleapis.com/auth/userinfo.email']
        }));

    authRouter.route('/twitter/callback')
        .get(passport.authenticate('twitter', {
            successRedirect: '/auth/username',
            failureRedirect: '/error'
        }));

    authRouter.route('/twitter')
        .get(passport.authenticate('twitter'));

    authRouter.route('/facebook/callback')
        .get(passport.authenticate('facebook', {
            successRedirect: '/auth/username',
            failureRedirect: '/error'
        }));

    authRouter.route('/facebook')
        .get(passport.authenticate('facebook', {
            scope: ['email']
        }));

    return authRouter;
};