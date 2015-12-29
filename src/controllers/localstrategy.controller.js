var User = require('../models/user.server.model.js');

var localStrategyController = () => {
    var authenticateSignin = (req, username, password, done) => {
        var query = {
            username: username
        };
        User.findOne(query, function (error, user) {
            if (user && user.validPassword(req.body.password)) {
                return done(null, user);
            } else {
                return done(null, false, {
                    message: 'Bad username/password combo'
                });
            }
        });
    };

    var authenticateSignup = (req, username, password, done) => {
        var user = new User;
        user.username = req.body.username;
        user.password = user.generateHash(req.body.password);
        user.email = req.body.email;
        user.displayName = req.body.email;
        user.save(
            function (err) {
                if (!err) {
                    console.log('Here in signUp Mongoose!');
                    req.user = user;
                    return done(null, user);
                } else {
                    return done(null, false, {
                        message: 'Bad username/password combo'
                    });
                }
            }
        );
    };

    return {
        authenticateSignin: authenticateSignin,
        authenticateSingup: authenticateSignup
    };
};

module.exports = localStrategyController;