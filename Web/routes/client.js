var express = require('express');
var router = express.Router();

var customersController = require('../controllers/customerController');

router.get('/', (req, res)=>{
    res.render('client/client', {layout: "layoutClient"})
});

router.get('/shop', (req, res)=>{
	res.render('client/shop', {layout: "layoutClient"});
});


router.get('/design', (req, res)=>{
	res.render('client/design', {layout: "layoutClient"});
});

module.exports = router;