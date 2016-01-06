var passport = require('passport');
var TwitterStrategy = require('passport-twitter').Strategy;
var twitterStrategyController = require('../../controllers/twitterstrategy.server.controller.js')();

var keys = require('../auth.config.js')();

module.exports = () => {
    passport.use(new TwitterStrategy({
        consumerKey: keys.twitterId,
        consumerSecret: keys.twitterSecret,
        callbackURL: 'http://localhost:5000/auth/twitter/callback',
        passReqToCallback: true
    }, twitterStrategyController.authenticateLogin));
};