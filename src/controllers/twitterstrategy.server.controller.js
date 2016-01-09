var User = require('../models/user.server.model.js');

var twitterStrategyController = () => {
    var authenticateLogin = function (req, token, tokenSecret, profile, done) {
        var query = {
            'twitter.id': profile.id
        };

        User.findOne(query, function (error, user) {
            if (user) {
                done(null, user);
            } else {
                var user = new User;
                user.image = profile._json.profile_image_url;
                user.displayName = profile.displayName;

                user.twitter = {};
                user.twitter.id = profile.id;
                user.twitter.token = token;
                user.twitter.secret = 'wn4OpL1r2ToUso1NleVkLF8gjbesgGZtpZHAaCufQ04r8xYnfb';
                user.save();
                return done(null, user);
            }
        });
    };

    return {
        authenticateLogin: authenticateLogin
    };
};

module.exports = twitterStrategyController;