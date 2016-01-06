var passport = require('passport');
var localStrategy = require('passport-local').Strategy;
var localStrategyController = require('../../controllers/localstrategy.server.controller.js')();

module.exports = function () {
    console.log('Authenticating!');
    console.log(localStrategyController);

    passport.use('local.signin', new localStrategy({
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true
    }, localStrategyController.authenticateSignin));

    passport.use('local.signup', new localStrategy({
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true
    }, localStrategyController.authenticateSingup));
};