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
//, 'My Posts', , 'All Users', 'All Posts', 'Logout'
var nav = [
    {
        item: 'Home',
        link: '/'
    },
    {
        item: 'My Posts',
        link: '/my/blogs/'
    },
    {
        item: 'New Post',
        link: '/my/newblog'
    },
    {
        item: 'All Users',
        link: '/users/'
    },
    {
        item: 'All Posts',
        link: '/blogs/'
    },
    {
        item: 'Logout',
        link: '/auth/signout/'
    }
];

var info = {
    title: 'Bloggedin',
    caption: 'Powered by Node.js',
    copyright: 'ASHw.xyz'
};

var homeRouter = require('./src/routes/home.server.route.js')(nav, info);
app.use('/', homeRouter);

var authRouter = require('./src/routes/auth.server.route.js')(nav, info);
app.use('/auth', authRouter);

var myRouter = require('./src/routes/my.server.route.js')(nav, info);
app.use('/my', myRouter);

var usersRouter = require('./src/routes/users.server.route.js')(nav, info);
app.use('/users', usersRouter);

var blogsRouter = require('./src/routes/blogs.server.route.js')(nav, info);
app.use('/blogs', blogsRouter);

//app.get('/', (req, res) => {
//    res.render('login', {
//        nav: nav,
//        title: info.title,
//        caption: info.caption,
//        copyright: info.copyright,
//    });
//});

app.listen(port, () => {
    console.log('Listening on port ' + port);
});