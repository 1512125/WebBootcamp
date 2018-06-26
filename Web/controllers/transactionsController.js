var controller = {};
var async = require('async')

var models = require('../models');

controller.getAll = function(callback){
    models.Transaction
    .findAll({
        include: [models.Status, models.Customer, models.Product]
    })
    .then(function(transactions){
        callback(transactions);
    })
};

module.exports = controller;