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
                req.flash('error', 'Invalid username/password!');
                return done(null, false, {
                    message: 'Bad username/password combo'
                });
            }
        });
    };

    var authenticateSignup = (req, username, password, done) => {
        var user = new User;
        user.username = req.body.username.toLowerCase();
        user.password = user.generateHash(req.body.password);
        user.email = req.body.email.toLowerCase();
        user.displayName = req.body.displayname;
        user.save(
            function (err) {
                if (!err) {
                    req.user = user;
                    req.flash('notice', 'Congratulations! Your new account has been created.');
                    return done(null, user);
                } else {
                    req.flash('notice', 'Sorry! We couldn\'t create your new account');
                    return done(null, false, {
                        message: 'Can\'t create new user'
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