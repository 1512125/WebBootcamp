var express = require('express');
var router = express.Router();

var customersController = require('../controllers/customerController');

router.get('/', (req, res)=>{
    res.render('client/client', {layout: "layoutClient"})
});


module.exports = router;