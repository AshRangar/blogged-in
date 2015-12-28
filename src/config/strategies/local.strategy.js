var passport = require('passport');
var localStrategy = require('passport-local').Strategy;

var localStrategyController = require('../../controllers/localstrategy.controller.js')();

module.exports = function () {
    passport.use(new localStrategy({
        usernameField: 'username',
        passwordField: 'password'
    }, localStrategyController.authenticateLogin));
};