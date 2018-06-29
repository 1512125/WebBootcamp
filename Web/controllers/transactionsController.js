var controller = {};
var async = require('async')

var models = require('../models');

controller.getAllStatus = function(callback){
    models.Status
    .findAll()
    .then(function(status){
        callback(status);
    })
};

controller.getAll = function(callback){
    models.Transaction
    .findAll({
        include: [models.Status, models.Customer, models.Product]
    })
    .then(function(transactions){
        callback(transactions);
    })
};

controller.getAllWithStatus = function(id, callback){
    models.Transaction
    .findAll({
        where: {
            StatusId: id
        },
        include: [models.Status, models.Customer, models.Product]
    })
    .then(function(transactions){
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