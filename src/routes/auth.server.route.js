var express = require('express');
var authRouter = express.Router();
var passport = require('passport');

var User = require('../models/user.server.model.js');

module.exports = (nav) => {

    authRouter.route('/signIn')
        .all(function (req, res, next) {
            console.log(req);
            next();
        })
        .post(passport.authenticate('local.signin', {
            failureRedirect: '/'
        }), (req, res) => {
            res.redirect('/auth/profile');
        });

    authRouter.route('/signUp')
        .post(passport.authenticate('local.signup', {
            failureRedirect: '/'
        }), (req, res) => {
            res.redirect('/auth/profile');
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
            successRedirect: '/auth/profile',
            failureRedirect: '/error'
        }));

    authRouter.route('/google')
        .get(passport.authenticate('google', {
            scope: ['https://www.googleapis.com/auth/userinfo.profile', 'https://www.googleapis.com/auth/userinfo.email']
        }));

    authRouter.route('/twitter/callback')
        .get(passport.authenticate('twitter', {
            successRedirect: '/auth/profile',
            failureRedirect: '/error'
        }));

    authRouter.route('/twitter')
        .get(passport.authenticate('twitter'));

    authRouter.route('/facebook/callback')
        .get(passport.authenticate('facebook', {
            successRedirect: '/auth/profile',
            failureRedirect: '/error'
        }));

    authRouter.route('/facebook')
        .get(passport.authenticate('facebook', {
            scope: ['email']
        }));

    return authRouter;
};