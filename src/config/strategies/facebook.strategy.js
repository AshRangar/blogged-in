var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var facebookStrategyController = require('../../controllers/facebookstrategy.server.controller.js')();

var keys = require('../auth.config.js')();

module.exports = () => {
    passport.use(new FacebookStrategy({
        clientID: keys.facebookId,
        clientSecret: keys.facebookSecret,
        callbackURL: 'http://localhost:5000/auth/facebook/callback',
        passReqToCallback: true
    }, facebookStrategyController.authenticateLogin));
};