var User = require('../models/user.server.model.js');

var facebookStrategyController = () => {
    var authenticateLogin = function (req, accessToken, refreshToken, profile, done) {
        var query = {
            'facebook.id': profile.id
        };
        User.findOne(query, function (error, user) {
            if (user) {
                done(null, user);
            } else {
                var user = new User;
                user.displayName = profile.displayName;

                user.facebook = {};
                user.facebook.id = profile.id;
                user.facebook.token = accessToken;
                user.facebook.secret = '26cc144209ac1c9376eab4a1985af450';
                user.save();
                return done(null, user);
            }
        });
    };

    return {
        authenticateLogin: authenticateLogin
    };
};

module.exports = facebookStrategyController;