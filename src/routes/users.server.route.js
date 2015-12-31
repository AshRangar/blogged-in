var express = require('express');
var userRouter = express.Router();

var User = require('../models/user.server.model.js');

module.exports = () => {
    userRouter.route('/')
        .get(function (req, res) {
            User.find({}, function (err, users) {
                res.render('userslist', {
                    title: 'Bloggedin',
                    caption: 'Powered by Node.js',
                    copyright: 'ASHw.xyz',
                    users: users
                })
            });
        });

    return userRouter;
};