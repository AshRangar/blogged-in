var passport = require('passport');
var TwitterStrategy = require('passport-twitter').Strategy;
var twitterStrategyController = require('../../controllers/twitterstrategy.controller.js')();

module.exports = () => {
    passport.use(new TwitterStrategy({
        consumerKey: 'hkdbZ2QecHWX5U77qII6AIE6O',
        consumerSecret: 'wn4OpL1r2ToUso1NleVkLF8gjbesgGZtpZHAaCufQ04r8xYnfb',
        callbackURL: 'http://localhost:5000/auth/twitter/callback',
        passReqToCallback: true
    }, twitterStrategyController.authenticateLogin));
};