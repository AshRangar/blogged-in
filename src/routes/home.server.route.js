var express = require('express');
var homeRouter = express.Router();

module.exports = (nav, info) => {
    homeRouter.route('/')
        .all((req, res, next) => {
            if (req.user) {
                res.redirect('/blogs/');
            } else {
                next();
            }
        })
        .get((req, res) => {
            res.render('login', {
                nav: nav,
                title: info.title,
                caption: info.caption,
                copyright: info.copyright
            });
        });

    return homeRouter;
};