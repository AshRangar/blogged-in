var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var passport = require('passport');
var session = require('express-session');

var port = process.env.PORT || 3000;

var mongoose = require('mongoose');
var dbConfig = require('./src/config/db.config.js')();
var db = mongoose.connect(dbConfig.URL);

app.use(express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(cookieParser());
app.use(session({
    secret: 'BloggedInSession'
}));

require('./src/config/passport.js')(app);

app.set('views', './src/views');
app.set('view engine', 'ejs');

var homeRouter = require('./src/routes/home.server.route.js')();
app.use('/', homeRouter);

var authRouter = require('./src/routes/auth.server.route.js')();
app.use('/auth', authRouter);

var myRouter = require('./src/routes/my.server.route.js')();
app.use('/my', myRouter);

var usersRouter = require('./src/routes/users.server.route.js')();
app.use('/users', usersRouter);

var blogsRouter = require('./src/routes/posts.server.route.js')();
app.use('/posts', blogsRouter);

app.listen(port, () => {
    console.log('Listening on port ' + port);
});