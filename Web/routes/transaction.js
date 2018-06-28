var express = require('express');
var router = express.Router();

var transactionsController = require('../controllers/transactionsController');
var productsController = require('../controllers/productsController');

function Cart(oldCart) {
    this.items = oldCart.items;
    this.totalQty = oldCart.totalQty;
    this.totalPrice = oldCart.totalPrice;
    this.add = function (item, id) {
        var storedItem = this.items[id];
        
        if (!storedItem) {
            storedItem = this.items[id] = {
                item: item,
                qty: 0,
                price: 0
            };
        }
        storedItem.qty++;
        storedItem.price = storedItem.item.pricing * storedItem.qty;
        this.totalQty++;
        this.totalPrice += storedItem.price;
    };

    this.generateArray = function () {
        var arr = [];
        for (var id in this.items) {
            if(this.items[id] != null){
                arr.push(this.items[id])
            }
        }
        return arr;
    };
}

router.get('/', function (req, res, next) {
    // console.log('tao day tao day');
    // console.log(req.session.cart);
    if (req.session.cart) {
        var cart = new Cart(req.session.cart);
        res.render('cart', {
            products: cart.generateArray(),
            totalPrice: cart.totalPrice,
            totalQty: cart.totalQty
        });
    }
    else
        res.render('cart');
});


router.get('/:id', function (req, res, next) {
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {items: [], totalQty: 0, totalPrice: 0});

    productsController.getById(productId, function (product) {
        cart.add(product, product.id);
        req.session.cart = cart;
        console.log(req.session.cart);
        res.redirect('/shop');
    })
});


module.exports = router;