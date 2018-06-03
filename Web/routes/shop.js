var express = require('express');
var router = express.Router();

var productsController = require('../controllers/productsController');
var typeController = require('../controllers/typeController');

router.get('/', (req, res)=>{
    typeController.getAll((types)=>{
            productsController.getAll((product)=>{
            res.render('shop', {product: product, types: types})
        })
    })
})

module.exports = router;