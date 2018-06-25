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
var validator = require('validator');
var csrfProtection = csrf();

router.use(csrfProtection);
// Setting for app here
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
        paginate: paginateHelper.createPagination
    }
});
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());
// app.use(validator());
// For Passport
const expressSession = require('express-session');
app.use(expressSession({
    secret: 'mySecretKey'
}));

app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
})); // session secret
app.use(flash());
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/client',
    failureRedirect: '/',
    failureFlash: true
}));

app.post('/signin', passport.authenticate('local-signin', {
    successRedirect: '/client',
    failureRedirect: '/'
}));

require('./config/passport.js');
//var customer = require('./routes/admin');
//app.use('/customer', customer);
// var product = require('./routes/product');
// app.use('/product', product);
// var productdetail = require('./routes/productdetail');
// app.use('/productdetail', productdetails);
// var transaction = require('./routes/transaction');
// app.use('/transaction', transactions);
// var type = require('./routes/type');
// app.use('/type', types);
var admin = require('./routes/admin');
app.use('/admin', admin);
var shop = require('./routes/shop');
app.use('/shop', shop);
var client = require('./routes/client');
app.use('/client', client);

// Define your routes here

app.get('/sync', function (req, res) {
    models.sequelize.sync().then(function () {
        res.send('database sync completed!');
    });
});

app.get('/', (req, res) => {
    res.render('index');
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
    'client_id': 'ARlT-GyoZyDC5IQnTAF55KdMuSLYNcQwi1sX_x0YZCQzw6gwGA45spkNn0n1mcyll392D2qvb0hjzg4A', // please provide your client id here 
    'client_secret': 'EDkLe3-VBYlK7M9Ps6UgjWpFHWuiVnikKGXeJsSfq16qm6rXtXyUOguR6GLJ2Fs52oe4mlF9V-B4BYBn' // provide your client secret here 
});

app.get('/cart/paypal/:money', (req, res) => {
    let money = (req.params.money) / 22000;
    var payment = {
        "intent": "sale",
        "payer": {
            "payment_method": "paypal"
        },
        "redirect_urls": {
            "return_url": "/cart/success",
            "cancel_url": "/cart/err"
        },
        "transactions": [{
            "amount": {
                "total": money,
                "currency": "USD"
            },
            "description": " money for products "
        }]
    }


    // call the create Pay method 
    createPay(payment)
        .then((transaction) => {
            var id = transaction.id;
            var links = transaction.links;
            var counter = links.length;
            while (counter--) {
                if (links[counter].method == 'REDIRECT') {
                    // redirect to paypal where user approves the transaction 
                    return res.redirect(links[counter].href)
                }
            }
        })
        .catch((err) => {
            console.log(err);
            res.redirect('/cart/err');
        });
})

app.get('/cart/success' , (req ,res ) => {
    res.render('cart/success'); 
})

app.get('/cart/err' , (req ,res ) => { 
    res.render('cart/err'); 
})


app.get('/cart/VNPay', (req, res) => {
    res.render('VNPay')
})
// Set Server Port & Start Server
app.set('port', (process.env.PORT || 5000));

app.listen(app.get('port'), function () {
    console.log('Server is listening at port ' + app.get('port'));
});

var createPay = ( payment ) => {
    return new Promise( ( resolve , reject ) => {
        paypal.payment.create( payment , function( err , payment ) {
         if ( err ) {
             reject(err); 
         }
        else {
            resolve(payment); 
        }
        }); 
    });
}		