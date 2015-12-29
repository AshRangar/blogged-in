var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var facebookStrategyController = require('../../controllers/facebookstrategy.controller.js')();

module.exports = () => {
    passport.use(new FacebookStrategy({
        clientID: '607712572693771',
        clientSecret: '26cc144209ac1c9376eab4a1985af450',
        callbackURL: 'http://localhost:5000/auth/facebook/callback',
        passReqToCallback: true
    }, facebookStrategyController.authenticateLogin));
};