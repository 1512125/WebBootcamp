var authController = require('../controllers/authcontroller.js');

module.exports = function(app, passport) {
    app.post('/signin', passport.authenticate('local-signin', {
        successRedirect: '/',
        failureRedirect: '/'
    }));

    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/',
        failureRedirect: '/'
    }));

    app.get('/logout', authController.logout);
    // app.get('/', isLoggedIn, authController.dashboard);

    function isLoggedIn(req, res, next) {
        if (req.isAuthenticated())
            return next();
        res.redirect('/');
    }
}