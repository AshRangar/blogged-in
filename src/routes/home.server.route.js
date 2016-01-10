var express = require('express');
var homeRouter = express.Router();

var info = require('../config/info.config.js')();
var nav = require('../config/nav.config.js')();

module.exports = () => {
    homeRouter.route('/')
        .all((req, res, next) => {
            if (req.user) {
                nav[nav.length - 1].item = 'Log out';
                nav[nav.length - 1].link = '/auth/signOut';
                res.redirect('my/posts/');
            } else {
                nav[nav.length - 1].item = 'Login';
                nav[nav.length - 1].link = '/';
                next();
            }
        })
        .get((req, res) => {
            res.render('pages/login', {
                nav: nav,
                info: info
            });
        });

    return homeRouter;
};