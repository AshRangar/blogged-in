var express = require('express');
var authRouter = express.Router();
var mongodb = require('mongodb').MongoClient;
var passport = require('passport');

var url = 'mongodb://localhost:27017/bloggedin';

module.exports = (nav) => {

    authRouter.route('/signIn')
        .all(function (req, res, next) {
            console.log(req);
            next();
        })
        .post(passport.authenticate('local', {
            failureRedirect: '/'
        }), (req, res) => {
            res.redirect('/auth/profile');
        });

    authRouter.route('/signUp')
        .post((req, res) => {
            mongodb.connect(url, (err, db) => {
                var collection = db.collection('users');
                var user = {
                    username: req.body.username,
                    password: req.body.password
                };
                collection.insert(user, (err, result) => {
                    req.login(result.ops[0], () => {
                        res.redirect('/auth/profile');
                    });
                });
            });
        });

    authRouter.route('/profile')
        .all((req, res, next) => {
            if (!req.user) {
                res.send('Not signed in');
                //res.redirect('/');
            } else {
                next();
            }
        })
        .get((req, res) => {
            res.json(req.user);
        });

    return authRouter;
};