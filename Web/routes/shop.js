var express = require('express');
var router = express.Router();

var productsController = require('../controllers/productsController');
var typeController = require('../controllers/typeController');

router.get('/', (req, res)=>{
    typeController.getAll((types)=>{
		productsController.getAll((products)=>{
			var page = 1
			var rowInPage = 6
			if (req.param('p')) page = req.param('p')
			var pageCount = Math.round(products.length / rowInPage + 0.5)
			var pagination = {page: page, pageCount: pageCount}
			products = products.slice((pagination.page - 1) * rowInPage,  pagination.page * rowInPage)
			res.render('shop', {
				product: products,
				pagination: pagination,
				types: types
			})
		})
	})
    // typeController.getAll((types)=>{
    //         productsController.getAll((product)=>{
    //         res.render('shop', {product: product, types: types})
    //     })
    // })
});

router.get('/:id', (req, res)=>{
    let id = req.params.id;
    productsController.getById(id, (product) => {
        res.render('productdetail', {product: product});
    });
})

module.exports = router;