var passport = require('passport');

module.exports = function (app) {

    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser((user, done) => {
        done(null, user);
    });

    passport.deserializeUser((user, done) => {
        done(null, user);
    });

    require('./strategies/local.strategy.js')();
    require('./strategies/google.strategy.js')();
    require('./strategies/twitter.strategy.js')();
    require('./strategies/facebook.strategy.js')();
};