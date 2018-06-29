var express = require('express');
var router = express.Router();

var transactionsController = require('../controllers/transactionsController');
var productsController = require('../controllers/productsController');

function Cart(oldCart) {
    this.items = oldCart.items;
    this.totalQty = oldCart.totalQty;
    this.totalPrice = oldCart.totalPrice;
    this.add = function (item, id, quantity) {
        var storedItem = this.items[id];

        if (!storedItem) {
            storedItem = this.items[id] = {
                item: item,
                qty: 0,
                price: 0
            };
        }
        storedItem.qty += quantity;
        storedItem.price = storedItem.item.pricing * storedItem.qty;
        this.totalQty++;
        this.totalPrice += storedItem.item.pricing * quantity;
    };

    this.generateArray = function () {
        var arr = [];
        for (var id in this.items) {
            if (this.items[id] != null) {
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
    } else
        res.render('cart');
});


router.get('/:id/:quantity', function (req, res, next) {
    var productId = req.params.id;
    var quantity = Number(req.params.quantity);
    var cart = new Cart(req.session.cart ? req.session.cart : {
        items: [],
        totalQty: 0,
        totalPrice: 0
    });

    productsController.getById(productId, function (product) {
        cart.add(product, product.id, quantity);
        req.session.cart = cart;
        console.log(req.session.cart);
        res.redirect('/shop');
    })
});

router.get('/COD', (req, res) => {
    res.render('cart/COD')
})

var paypal = require('paypal-rest-sdk');

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

router.get('/paypal', (req, res) => {

    if (req.session.cart) {
        var cart = new Cart(req.session.cart);
        var products = cart.generateArray();
        var items = [];
        for (let i = 0; i < products.length; i++) {
            let temp = {
                "name": "",
                "sku": "",
                "price": "",
                "currency": "USD",
                "quantity": 0,
            }
            
            temp.name = products[i].title;
            temp.sku = "item";
            temp.quantity = products[i].qty;
            temp.price = String(products[i].price);
            items.push(temp);
        }
        console.log(items);
        var totalPrice = cart.totalPrice;
        var totalQty = cart.totalQty;
        console.log(totalPrice, totalQty);
        var create_payment_json = {
            "intent": "sale",
            "payer": {
                "payment_method": "paypal"
            },
            "redirect_urls": {
                "return_url": "/success",
                "cancel_url": "/err"
            },
            "transactions": [{
                "item_list": {
                    "items": [{
                        "name": "item",
                        "sku": "item",
                        "price": "1.00",
                        "currency": "USD",
                        "quantity": 1
                    }]
                },
                "amount": {
                    "currency": "USD",
                    "total": 1,
                },
                "description": "This is the payment description."
            }]
        };
    } else
        res.render('cart');


    // call the create Pay method 
    paypal.payment.create(create_payment_json, function (error, payment) {
        if (error) {
            throw error;
        } else {
            console.log("Create Payment Response");
            console.log(payment);
        }
    });
})

router.get('/success', (req, res) => {
    res.render('cart/success');
})

router.get('/err', (req, res) => {
    res.render('cart/err');
})


// const {
//     OnePayInternational
// } = require('vn-payments');
// const onepayDom = new OnePayInternational({
//     paymentGateway: 'https://mtf.onepay.vn/onecomm-pay/vpc.op',
//     merchant: 'ONEPAY',
//     accessCode: 'D67342C2',
//     secureSecret: 'A3EFDFABA8653DF2342E8DAC29B51AF0',
// });

// router.get('/VNPay/:money', (req, res) => {
//     let money = Number(req.params.money);

//     // construct checkout payload from form data and app's defaults
//     var checkoutData = {
//         amount: parseInt(money, 10),
//         currency: 'VND',
//     };

//     // buildCheckoutUrl is async operation and will return a Promise
//     onepayIntl
//         .buildCheckoutUrl(checkoutData)
//         .then(checkoutUrl => {
//             res.writeHead(301, {
//                 Location: checkoutUrl.href
//             });
//             res.end();
//         })
//         .catch(err => {
//             res.send(err);
//         });
// })

// router.get('/VNPay/callback', (req, res) => {
//     const query = req.query;

//     onepayIntl.verifyReturnUrl(query).then(results => {
//         if (results.isSucceed) {
//             res.render('cart/success', {
//                 title: 'Nau Store - Thank You',
//                 orderId: results.orderId,
//                 price: results.price,
//                 message: results.message,
//             });
//         } else {
//             res.render('cart/err', {
//                 title: 'Nau Store - Payment Errors',
//                 message: results.message,
//             });
//         }
//     });
// })

module.exports = router;