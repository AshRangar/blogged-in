var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var passport = require('passport');
var session = require('express-session');
var flash = require('connect-flash');
var flashMiddleware = require('./src/middleware/connectflash.middleware.js');

var port = process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || 3000;
//var ip = process.env.OPENSHIFT_NODEJS_IP || process.env.ip || '127.0.0.1';

app.set('port', port);
//app.set(ip);

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

app.use(flash());
app.use(flashMiddleware);

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

var commentsRouter = require('./src/routes/comments.server.route.js')();
app.use('/comments', commentsRouter);

app.listen(app.get('port'), function () {
    console.log('Listening on port ' + port);
});