var express = require('express');
var homeRouter = express.Router();

var info = require('../config/info.config.js')();
var nav = require('../config/nav.config.js')();

module.exports = () => {
    homeRouter.route('/')
        .all((req, res, next) => {
            if (req.user) {
                res.redirect('my/posts/');
            } else {
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