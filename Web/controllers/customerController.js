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

module.exports = controller;