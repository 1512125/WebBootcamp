var express = require('express');
var models = require('./models');
var app = express();
var router = express.Router();
var passport = require('passport');
var flash = require('connect-flash');
var session = require('express-session');
var env = require('dotenv').load();
var csrf = require('csurf');
var cookieParser = require('cookie-parser');
var expressValidator = require('express-validator');
var csrfProtection = csrf();
const jwt = require('jsonwebtoken');

// Setting for app here
var Handlebars = require('handlebars');
var HandlebarsIntl = require('handlebars-intl');
HandlebarsIntl.registerWith(Handlebars);

var paginate = require('handlebars-paginate');
Handlebars.registerHelper('paginate', paginate);

app.use(express.static(__dirname + '/public'));
var expressHbs = require('express-handlebars');
var paginateHelper = require('express-handlebars-paginate');
var hbs = expressHbs.create({
    extname: 'hbs',
    defaultLayout: 'layout',
    layoutsDir: __dirname + '/views/layouts/',
    partialsDir: __dirname + '/views/partials/',
    pagesDir: __dirname + '/views/pages/',
    helpers: {
        //paginate: paginateHelper.createPagination
    }
});

//hbs.handlebars.registerHelper('paginateHelper', paginateHelper.createPagination);


app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');

var api = express.Router();
api.use(expressValidator());

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(expressValidator());

// For Passport
const expressSession = require('express-session');
app.use(expressSession({
    secret: 'mySecretKey',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash());

require('./config/passport.js');

app.use(session({
    secret: process.env.FOO_COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    store: new(require('connect-pg-simple')(session))({
        conString: 'pg://' + "postgres" + ':' + "123456" + "@" + "127.0.0.1" + '/' + "shoppingCart",
        tableName: 'session'
    }),
    cookie: {
        secure: true,
        maxAge: null
    }
}))
app.use(cookieParser());
// app.use(csrf());


app.use(function (req, res, next) {
    res.locals.login = req.isAuthenticated();
    res.locals.session = req.session;
    next();
});

var client = require('./routes/client');
app.use('/client', client);

app.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/client',
    failureRedirect: '/',
    failureFlash: true
}));

app.post('/signin', passport.authenticate('local-signin', {
    successRedirect: '/client',
    failureRedirect: '/'
}));

app.get('/logout', (req, res) => {
    req.logout();
    req.session.destroy(function (err) {
        res.redirect('/');
    });
});

var admin = require('./routes/admin');
app.use('/admin', admin);
var shop = require('./routes/shop');
app.use('/shop', shop);
var cart = require('./routes/transaction')
app.use('/cart', cart);

// Define your routes here

app.get('/sync', function (req, res) {
    models.sequelize.sync().then(function () {
        res.send('database sync completed!');
    });
});

app.get('/', (req, res) => {
    res.render('index');
    // {
    //     csrfToken: req.csrfToken()
    // }
})

app.get('/design', (req, res) => {
    res.render('design')
})

var paypal = require('paypal-rest-sdk');
paypal.configure({
    'mode': 'sandbox', //sandbox or live 
    'client_id': 'AWucuJK59bEWLC4ARSAhNM7zkmsBV3ER0o3-nCNtN4mEy7tNe5AcSEBcZZpkgvh5K8PznxqePYUu8BM5', // please provide your client id here 
    'client_secret': 'EO970KoA58cY_PgaaCXkoMPBtBm8HEo_rmdeMR2JlMUyne3Dsk0sQNC5XHGbOijg9MQf4h1F0Xp4fzC1' // provide your client secret here 
});

const { OnePayDomestic } = require('vn-payments');

const onepayDom = new OnePayDomestic({
	paymentGateway: 'https://mtf.onepay.vn/onecomm-pay/vpc.op',
	merchant: 'ONEPAY',
	accessCode: 'D67342C2',
	secureSecret: 'A3EFDFABA8653DF2342E8DAC29B51AF0',
});

// Set Server Port & Start Server
app.set('port', (process.env.PORT || 5000));

app.listen(app.get('port'), function () {
    console.log('Server is listening at port ' + app.get('port'));
});
