var controller = {};
var async = require('async')

var models = require('../models');

controller.getAll = function(id ,callback){
    models.Transaction
    .findAll({
        include: [models.Status, models.Customer, models.Product]
    })
    .then(function(transactions){
        console.log(transactions);
        callback(transactions);
    })
};

controller.getById = function(id, callback){
    models.Transaction
    .findOne({
        where: {id : id},
        include: [models.Status, models.Customer, models.Product]
    })
    .then(function(transactions){
        console.log(transactions);
        callback(transactions);
    })
};

module.exports = controller;