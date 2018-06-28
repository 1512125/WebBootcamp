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
	cookie: { secure: true, maxAge: null }
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

function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}

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
// var cart = require('./routes/transaction')
// app.use('/cart', cart);

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

app.get('/cart', (req, res) => {
    res.render('cart')
})

app.get('/cart/COD', (req, res) => {
    res.render('COD')
})

var paypal = require('paypal-rest-sdk');
paypal.configure({
    'mode': 'sandbox', //sandbox or live 
    'client_id': 'AWucuJK59bEWLC4ARSAhNM7zkmsBV3ER0o3-nCNtN4mEy7tNe5AcSEBcZZpkgvh5K8PznxqePYUu8BM5', // please provide your client id here 
    'client_secret': 'EO970KoA58cY_PgaaCXkoMPBtBm8HEo_rmdeMR2JlMUyne3Dsk0sQNC5XHGbOijg9MQf4h1F0Xp4fzC1' // provide your client secret here 
});

app.get('/cart/paypal/:money', (req, res) => {
    let money = Number((req.params.money) / 22000);
    const create_payment_json = {
        "intent": "sale",
        "payer": {
            "payment_method": "paypal"
        },
        "redirect_urls": {
            "return_url": "/cart/success",
            "cancel_url": "/cart/err"
        },
        "transactions": [{
            "item_list": {
                "items": [{
                    "name": "Red Sox Hat",
                    "sku": "001",
                    "price": "25.00",
                    "currency": "USD",
                    "quantity": 1
                }]
            },
            "amount": {
                "currency": "USD",
                "total": money
            },
            "description": "Hat for the best team ever"
        }]
    };

    paypal.payment.create(create_payment_json, function (error, payment) {
        if (error) {
            throw error;
        } else {
            for (let i = 0; i < payment.links.length; i++) {
                if (payment.links[i].rel === 'approval_url') {
                    res.redirect(payment.links[i].href);
                }
            }
        }
    });

})

app.get('/cart/success', (req, res) => {
    const payerId = req.query.PayerID;
    const paymentId = req.query.paymentId;

    const execute_payment_json = {
        "payer_id": payerId,
        "transactions": [{
            "amount": {
                "currency": "USD",
                "total": "25.00"
            }
        }]
    };

    paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
        if (error) {
            console.log(error.response);
            throw error;
        } else {
            console.log(JSON.stringify(payment));
            res.send('Success');
        }
    });
    res.render('cart/success');
})

app.get('/cart/err', (req, res) => {
    res.render('cart/err');
})

app.get('/cart/COD', (req, res) => {
    res.render('cart/COD');
})

const {OnePayInternational} = require('vn-payments');
const onepayDom = new OnePayInternational({
	paymentGateway: 'https://mtf.onepay.vn/onecomm-pay/vpc.op',
	merchant: 'ONEPAY',
	accessCode: 'D67342C2',
	secureSecret: 'A3EFDFABA8653DF2342E8DAC29B51AF0',
});
app.get('/cart/VNPay/:money', (req, res) => {
    let money = Number(req.params.money);

    // construct checkout payload from form data and app's defaults
    var checkoutData = {
        amount: parseInt(money, 10),
        currency: 'VND',
    };

    // buildCheckoutUrl is async operation and will return a Promise
    onepayIntl
        .buildCheckoutUrl(checkoutData)
        .then(checkoutUrl => {
            res.writeHead(301, {
                Location: checkoutUrl.href
            });
            res.end();
        })
        .catch(err => {
            res.send(err);
        });
})

app.get('/cart/VNPay/callback', (req, res) => {
    const query = req.query;

    onepayIntl.verifyReturnUrl(query).then(results => {
        if (results.isSucceed) {
            res.render('/cart/success', {
                title: 'Nau Store - Thank You',
                orderId: results.orderId,
                price: results.price,
                message: results.message,
            });
        } else {
            res.render('/cart/err', {
                title: 'Nau Store - Payment Errors',
                message: results.message,
            });
        }
    });
})


// Set Server Port & Start Server
app.set('port', (process.env.PORT || 5000));

app.listen(app.get('port'), function () {
    console.log('Server is listening at port ' + app.get('port'));
});

var createPay = (payment) => {
    return new Promise((resolve, reject) => {
        paypal.payment.create(payment, function (err, payment) {
            if (err) {
                reject(err);
            } else {
                resolve(payment);
            }
        });
    });
}