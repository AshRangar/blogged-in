var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var passport = require('passport');
var session = require('express-session');

var port = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(session({
    secret: 'BloggedInSession'
}));
require('./src/config/passport.js')(app);

app.set('views', './src/views');
app.set('view engine', 'ejs');

//var bookRouter = require('./src/routes/bookRouter.js')(nav);
//app.use('/Books', bookRouter);
app.get('/', (req, res) => {
    res.render('login', {
        title: 'Hello from render',
        caption: 'Powered by Node.js'
    });
});

app.get('/index', (req, res) => {
    res.render('index', {
        title: 'Hello from render',
        caption: 'Powered by Node.js'
    });
});

app.listen(port, () => {
    console.log('Listening on port ' + port);
});