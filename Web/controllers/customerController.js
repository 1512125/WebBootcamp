var controller = {};
var async = require('async')

var models = require('../models');

controller.getAll = function(callback){
    models.Customer
    .findAll()
    .then(function(customers){
        callback(customers);
    })
};

controller.getById = function(id, callback){
    models.Customer
    .findById()
    .then(function(customer){
        callback(customer);
    })
};

module.exports = controller;