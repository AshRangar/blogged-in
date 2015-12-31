var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var passport = require('passport');
var session = require('express-session');

var port = process.env.PORT || 3000;

var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost/bloggedin');

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
//app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(session({
    secret: 'BloggedInSession'
}));
require('./src/config/passport.js')(app);

app.set('views', './src/views');
app.set('view engine', 'ejs');

var nav = [];
var info = {
    title: 'Bloggedin',
    caption: 'Powered by Node.js',
    copyright: 'ASHw.xyz'
};

var authRouter = require('./src/routes/auth.server.route.js')(nav, info);
app.use('/auth', authRouter);

var myRouter = require('./src/routes/my.server.route.js')(nav, info);
app.use('/my', myRouter);

var usersRouter = require('./src/routes/users.server.route.js')(nav, info);
app.use('/users', usersRouter);

app.get('/', (req, res) => {
    res.render('login', {
        title: info.title,
        caption: info.caption,
        copyright: info.copyright,
    });
});

app.listen(port, () => {
    console.log('Listening on port ' + port);
});