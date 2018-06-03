var exports = module.exports = {}

exports.logout = function(req, res) {
    req.session.destroy(function(err) {
        res.redirect('/');
    });
}

exports.dashboard = function(req, res) {
    res.render('index');
}