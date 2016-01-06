var express = require('express');
var authRouter = express.Router();
var passport = require('passport');

module.exports = (nav, info) => {

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
            successRedirect: '/my/posts',
            failureRedirect: '/error'
        }));

    authRouter.route('/google')
        .get(passport.authenticate('google', {
            scope: ['https://www.googleapis.com/auth/userinfo.profile', 'https://www.googleapis.com/auth/userinfo.email']
        }));

    authRouter.route('/twitter/callback')
        .get(passport.authenticate('twitter', {
            successRedirect: '/my/posts',
            failureRedirect: '/error'
        }));

    authRouter.route('/twitter')
        .get(passport.authenticate('twitter'));

    authRouter.route('/facebook/callback')
        .get(passport.authenticate('facebook', {
            successRedirect: '/my/posts',
            failureRedirect: '/error'
        }));

    authRouter.route('/facebook')
        .get(passport.authenticate('facebook', {
            scope: ['email']
        }));

    return authRouter;
};