var User = require('../models/user.server.model.js');

var googleStrategyController = () => {
    var authenticateLogin = function (req, accessToken, refreshToken, profile, done) {
        var query = {
            'google.id': profile.id
        };
        User.findOne(query, function (error, user) {
            if (user) {
                done(null, user);
            } else {
                var user = new User;
                user.email = profile.emails[0].value;
                user.image = profile._json.image.url;
                user.displayName = profile.displayName;

                user.google = {};
                user.google.id = profile.id;
                user.google.token = accessToken;
                user.google.secret = 'FeS3up9YgTZ9U6FoUubBiWHU';
                user.save();
                return done(null, user);
            }
        });
    };
    return {
        authenticateLogin: authenticateLogin
    };
};

module.exports = googleStrategyController;