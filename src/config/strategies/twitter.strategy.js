var passport = require('passport');
var TwitterStrategy = require('passport-twitter').Strategy;
var User = require('../../models/user.model.js');

module.exports = () => {
    passport.use(new TwitterStrategy({
            consumerKey: 'hkdbZ2QecHWX5U77qII6AIE6O',
            consumerSecret: 'wn4OpL1r2ToUso1NleVkLF8gjbesgGZtpZHAaCufQ04r8xYnfb',
            callbackURL: 'http://localhost:5000/auth/twitter/callback',
            passReqToCallback: true
        },
        function (req, token, tokenSecret, profile, done) {
            if (req.user) {
                console.log('USER ALREADY EXISTS!');
                if (req.user.facebook) {
                    var query = {
                        'facebook.id': req.user.facebook.id
                    };
                } else if (req.user.google) {
                    var query = {
                        'google.id': req.user.google.id
                    };
                }
                User.findOne(query, function (error, user) {
                    if (user) {
                        user.twitter = {};
                        user.twitter.id = profile.id;
                        user.twitter.token = token;
                        user.twitter.secret = 'wn4OpL1r2ToUso1NleVkLF8gjbesgGZtpZHAaCufQ04r8xYnfb';
                        user.save();
                        done(null, user);
                    }
                });
            } else {

                var query = {
                    'twitter.id': profile.id
                };

                User.findOne(query, function (error, user) {
                    if (user) {
                        console.log('Found user');
                        done(null, user);
                    } else {
                        console.log('Not found user');
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
            }
        }
    ));
};