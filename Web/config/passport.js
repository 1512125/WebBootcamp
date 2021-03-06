var passport = require('passport');
var Customer = require('../controllers/customerController');
var models = require('../models');
var LocalStrategy = require('passport-local').Strategy;
var bCrypt = require('bcrypt-nodejs');

passport.serializeUser(function (customer, done) {
    done(null, customer.id);
});

passport.deserializeUser(function (id, done) {
    Customer.findById(id, function (customer) {
        if (customer) {
            done(null, customer);
        }
        else {
        }
    });
});

passport.use('local-signup', new LocalStrategy({
    usernameField: 'userLogin',
    passwordField: 'password',
    passReqToCallback: true
}, function (req, userLogin, password, done) {
    req.checkBody('userLogin', 'Invalid user login').notEmpty();
    req.checkBody('password', 'Invalid password').notEmpty();
    var errors = req.validationErrors();
    if (errors) {
        var messages = [];
        errors.forEach(function (error) {
            messages.push(error.msg);
        });
        return done(null, false, req.flash('error', messages));
    }
    var generateHash = function (password) {
        return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
    };
    models.Customer.findOne({
            where: {
                userLogin: userLogin
            }
        }, {
            raw: true
        })
        .then(customer => {
            if (customer) {
                return done(null, false, {
                    message: 'User login is already in use.'
                });
            }
            var userPassword = generateHash(password);
            var data = {
                'userLogin': userLogin,
                "password": userPassword,
                "name": req.body.name,
                "email": req.body.email,
                "admin": false
            };

            models.Customer.create(data).then(function (newUser, created) {
                if (!newUser) {
                    return done(null, false);
                }
                if (newUser) {
                    return done(null, newUser);
                }
            });
        });
}));

passport.use('local-signin', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        userLogin: 'username',
        passwordField: 'password',
        passReqToCallback: true // allows us to pass back the entire request to the callback
    },
    function (req, userLogin, password, done) {
        var isValidPassword = function (userpass, password) {
            console.log(userpass, password);
            console.log(bCrypt.compareSync(password, userpass));
            return bCrypt.compareSync(password, userpass);
        };
        models.Customer.findOne({
                where: {
                    userLogin: userLogin
                }
            }, {
                raw: true
            })
            .then(customer => {

                if (!customer) {
                    console.log('fail')
                    return done(null, false, {
                        message: 'User login does not exist'
                    });
                }
                if (!isValidPassword(customer.password, password)) {
                    console.log('fail2')
                    return done(null, false, {
                        message: 'Incorrect password.'
                    });

                }
                console.log('success')
                var userinfo = customer.get();
                req.session.user = customer;
                return done(null, userinfo);
            }).catch(function (err) {
                console.log("Error:", err);
                return done(null, false, {
                    message: 'Something went wrong with your Signin'
                });
            });

    }
));