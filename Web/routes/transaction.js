var express = require('express');
var router = express.Router();

var transactionsController = require('../controllers/transactionsController');

router.get('/', function(req, res){
	transactionsController.getAll(function (transactions) {
        res.render('/cart', {transactions: transactions});
    });
});


module.exports = router;