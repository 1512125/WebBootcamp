var authController = require('../controllers/authcontroller.js');

module.exports = function(app, passport) {
    app.post('/signin', passport.authenticate('local-signin', {
        successRedirect: '/index',
        failureRedirect: '/index'
    }));

    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/index',
        failureRedirect: '/index'
    }));

    app.get('/signup', authController.signup);
    app.get('/signin', authController.signin);
    app.get('/logout', authController.logout);
    app.get('/index', isLoggedIn, authController.dashboard);

    function isLoggedIn(req, res, next) {
        if (req.isAuthenticated())
            return next();
        res.redirect('/index');
    }
}