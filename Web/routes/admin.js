var express = require('express')
var router = express.Router()

var customersController = require('../controllers/customerController')
var transactionsController = require('../controllers/transactionsController')
var productsController = require('../controllers/productsController')


router.get('/', (req, res)=>{
	res.render('admin/admin', {layout: "layoutAdmin"})
})

router.get('/bill', (req, res)=>{
	transactionsController.getAll((transactions)=>{
		res.render('admin/bill', {layout: "layoutAdmin", transactions: transactions})
		console.log(date(transactions[0].createdAt))
	})
})

router.get('/customer', (req, res)=>{
	customersController.getAll((customers)=>{
		res.render('admin/customer', {layout: "layoutAdmin", customers: customers})
	})
	
})

router.get('/clothes', (req, res)=>{
	productsController.getAll((products)=>{
		res.render('admin/clothes', {layout: "layoutAdmin", products: products})
	})
})

router.get('/partern', (req, res)=>{
	res.render('admin/partern', {layout: "layoutAdmin"})
})

router.get('/post', (req, res)=>{
	res.render('admin/post', {layout: "layoutAdmin"})
})

module.exports = router;