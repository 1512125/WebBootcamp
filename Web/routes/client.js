var express = require('express');
var router = express.Router();

var customersController = require('../controllers/customerController');
// var transactionsController = require('../controllers/transactionsController');
var productsController = require('../controllers/productsController');
var typeController = require('../controllers/typeController');

router.get('/', (req, res) => {
    res.render('client/client', {
        userinfo: req.session.user,
        layout: "layoutClient"
    })
});

router.get('/shop', (req, res) => {
    typeController.getAll((types) => {
        productsController.getAll((product) => {
            res.render('client/shop', {
                product: product,
                types: types,
                layout: "layoutClient"
            });
        });
    });
});

router.get('/shop/:id', (req, res)=>{
    let id = req.params.id;
    productsController.getById(id, (product) => {
        res.render('client/productdetail', {product: product});
    });
})

router.get('/design', (req, res) => {
    res.render('client/design', {
        layout: "layoutClient"
    });
});

router.get('/cart', (req, res) => {
    if (req.session.cart) {
        var cart = new Cart(req.session.cart);
        res.render('cart', {
            products: cart.generateArray(),
            totalPrice: cart.totalPrice,
            totalQty: cart.totalQty
        }, {
            layout: "layoutClient"
        });
    } else
        res.render('cart', {
            layout: "layoutClient"
        });

});

router.get('/cart/:id', (req, res) => {
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});

    productController.findById(productId, function (err, product) {
        if (err) {
            return res.redirect("/");
        }
        cart.add(product, product.id);
        req.session.cart = cart;
        res.redirect('/client/shop');
    })
});

router.get('/modifyClient', isLoggedIn, (req, res) => {
    console.log(req.session.user);
    res.render('client/modifyClient', {
        userinfo: req.session.user, layout: "layoutClient"
    });
});

router.get('/modifyClient/:info', isLoggedIn, (req, res) => {
    var info = req.params.info;
    var userid= req.session.user.id;
    info = JSON.parse(info);
    console.log(info);

    customersController.updateInfo(userid, info, function(){
        customersController.findById(userid, function(userinfo){
            req.session.user = userinfo;
            res.render('client/modifyClient', {
                userinfo: userinfo, layout: "layoutClient"
            });
        })
        
    })
    
});

router.get('/modifyClient/changPassword/:info', isLoggedIn, (req, res) => {
    var info = req.params.info;
    var userid= req.session.user.id;
    info = JSON.parse(info);

    customersController.updatePassword(userid, info, function(){
        customersController.findById(userid, function(userinfo){
            req.session.user = userinfo;
            res.render('client/modifyClient', {
                userinfo: userinfo, layout: "layoutClient"
            });
        })
        
    })
    
});

function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}

module.exports = router;