var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var googleStrategyController = require('../../controllers/googlestrategy.controller.js')();

var keys = require('../auth.config.js')();

module.exports = () => {
    passport.use(new GoogleStrategy({
        clientID: keys.googleId,
        clientSecret: keys.googleSecret,
        callbackURL: 'http://localhost:5000/auth/google/callback',
        passReqToCallback: true
    }, googleStrategyController.authenticateLogin));
};