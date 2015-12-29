var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var googleStrategyController = require('../../controllers/googlestrategy.controller.js')();

module.exports = () => {
    passport.use(new GoogleStrategy({
        clientID: '594236328445-cql3hms91053u3n96a66ncj0osa5i3p5.apps.googleusercontent.com',
        clientSecret: 'FeS3up9YgTZ9U6FoUubBiWHU',
        callbackURL: 'http://localhost:5000/auth/google/callback',
        passReqToCallback: true
    }, googleStrategyController.authenticateLogin));
};