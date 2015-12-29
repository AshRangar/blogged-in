var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var User = require('../../models/user.model.js');

module.exports = () => {
    passport.use(new FacebookStrategy({
        clientID: '607712572693771',
        clientSecret: '26cc144209ac1c9376eab4a1985af450',
        callbackURL: 'http://localhost:5000/auth/facebook/callback',
        passReqToCallback: true
    }, function (req, accessToken, refreshToken, profile, done) {
        if (req.user) {

            if (req.user.google) {
                var query = {
                    'google.id': req.user.google.id
                };
            } else if (req.user.twitter) {
                var query = {
                    'twitter.id': req.user.twitter.id
                };
            }

            User.findOne(query, function (error, user) {
                if (user) {
                    user.facebook = {};
                    user.facebook.id = profile.id;
                    user.facebook.token = accessToken;
                    user.facebook.secret = '26cc144209ac1c9376eab4a1985af450';
                    user.save();
                    done(null, user);
                }
            });
        } else {
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
        }
    }));
};