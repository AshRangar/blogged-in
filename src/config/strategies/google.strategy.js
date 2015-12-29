var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var User = require('../../models/user.model.js');

module.exports = () => {
    passport.use(new GoogleStrategy({
            clientID: '594236328445-cql3hms91053u3n96a66ncj0osa5i3p5.apps.googleusercontent.com',
            clientSecret: 'FeS3up9YgTZ9U6FoUubBiWHU',
            callbackURL: 'http://localhost:5000/auth/google/callback',
            passReqToCallback: true
        },
        function (req, accessToken, refreshToken, profile, done) {
            console.log('req.user is ' + req.user);
            if (req.user) {
                console.log('USER ALREADY EXISTS!');
                if (req.user.facebook) {
                    var query = {
                        'facebook.id': req.user.facebook.id
                    };
                } else if (req.user.twitter) {
                    var query = {
                        'twitter.id': req.user.twitter.id
                    };
                }

                User.findOne(query, function (error, user) {
                    if (user) {
                        user.google = {};
                        user.google.id = profile.id;
                        user.google.token = accessToken;
                        user.google.secret = 'FeS3up9YgTZ9U6FoUubBiWHU';
                        user.save();
                        done(null, user);
                    }
                });
            } else {
                var query = {
                    'google.id': profile.id
                };
                User.findOne(query, function (error, user) {
                    if (user) {
                        console.log('Found user');
                        done(null, user);
                    } else {
                        console.log('Not found user');
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
            }
        }
    ));
};