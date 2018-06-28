var express = require('express')
var router = express.Router()

var customersController = require('../controllers/customerController')
var transactionsController = require('../controllers/transactionsController')
var productsController = require('../controllers/productsController')
var typeController = require('../controllers/typeController');

router.get('/', (req, res)=>{
	typeController.getAll((type)=>{
		res.render('admin/admin', {
			layout: "layoutAdmin",
			type: type
		})
	})
})

router.get('/bill', (req, res)=>{
	transactionsController.getAllStatus((status)=>{
		transactionsController.getAll((transactions)=>{
			var page = 1
			var rowInPage = 4
			if (req.param('p')) page = req.param('p')
			var pageCount = Math.round(transactions.length / rowInPage + 0.5)
			var pagination = {page: page, pageCount: pageCount}
			transactions = transactions.slice((pagination.page - 1) * rowInPage,  pagination.page * rowInPage)
			res.render('admin/bill', {
				layout: "layoutAdmin", 
				pagination: pagination,
				transactions: transactions,
				status: status
			})
		})
	})
})

router.get('/bill/:id', (req, res)=>{
	transactionsController.getAllStatus((status)=>{
		transactionsController.getAllWithStatus(req.params.id, (transactions)=>{
			var page = 1
			var rowInPage = 4
			if (req.param('p')) page = req.param('p')
			var pageCount = Math.round(transactions.length / rowInPage + 0.5)
			var pagination = {page: page, pageCount: pageCount}
			transactions = transactions.slice((pagination.page - 1) * rowInPage,  pagination.page * rowInPage)
			res.render('admin/bill', {
				layout: "layoutAdmin", 
				pagination: pagination,
				transactions: transactions,
				status: status
			})
		})
	})
})

router.get('/customer', (req, res)=>{
	customersController.getAll((customers)=>{
		var page = 1
		var rowInPage = 4
		if (req.param('p')) page = req.param('p')
		var pageCount = Math.round(customers.length / rowInPage + 0.5)
		var pagination = {page: page, pageCount: pageCount}
		customers = customers.slice((pagination.page - 1) * rowInPage,  pagination.page * rowInPage)
		res.render('admin/customer', {
			layout: "layoutAdmin", 
			pagination: pagination,
			customers: customers
		})
	})
	
})

router.get('/clothes', (req, res)=>{
	typeController.getAll((type)=>{
		productsController.getAll((products)=>{
			var page = 1
			var rowInPage = 4
			if (req.param('p')) page = req.param('p')
			var pageCount = Math.round(products.length / rowInPage + 0.5)
			var pagination = {page: page, pageCount: pageCount}
			products = products.slice((pagination.page - 1) * rowInPage,  pagination.page * rowInPage)
			res.render('admin/clothes', {
				layout: "layoutAdmin",
				products: products,
				type: type
			})
		})
	})
})

router.get('/clothes/:id', (req, res)=>{
	typeController.getAll((type)=>{
		productsController.getAllWithType(req.params.id, (products)=>{
			var page = 1
			var rowInPage = 4
			if (req.param('p')) page = req.param('p')
			var pageCount = Math.round(products.length / rowInPage + 0.5)
			var pagination = {page: page, pageCount: pageCount}
			products = products.slice((pagination.page - 1) * rowInPage,  pagination.page * rowInPage)
			res.render('admin/clothes', {
				layout: "layoutAdmin",
				products: products,
				type: type
			})
		})
	})
})

router.get('/partern', (req, res)=>{
	res.render('admin/partern', {layout: "layoutAdmin"})
})

router.get('/post', (req, res)=>{
	res.render('admin/post', {layout: "layoutAdmin"})
})

module.exports = router;