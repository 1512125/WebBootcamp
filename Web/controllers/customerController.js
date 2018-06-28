var controller = {};
var async = require('async')

var models = require('../models');

controller.getAll = function(callback){
    models.Customer
    .findAll({
        where: {admin: false}
    })
    .then(function(customers){
        callback(customers);
    })
};

controller.getByUserName = function(name, callback){
    models.Customer
    .findOne({
        where: {
            userLogin: name
        }
    }, {
        raw: true
    })
    .then(function(customer){
        callback(customer);
    })
};

controller.getById = function(id, callback){
    models.Customer
    .findOne({
        where: {
            id: id 
        }
    }, {
        raw: true
    })
    .then(function(customer){
        callback(customer);
    })
};

controller.findById = function(id, callback){
    models.Customer
    .findOne({
        where: {
            id: id 
        }
    }, {
        raw: true
    })
    .then(function(customer){
        callback(customer);
    })
};

controller.updateById = function(box, callback){
    models.Customer
    .update({
        name: box.name,
        //imagepath: box.imagepath,
        address: box.address,
        email: box.email,
        phonenumber: box.phonenumber,
        note: box.note,
    }, {
        where: box.id
    })
    .then(function(){
        callback();
    })
};

module.exports = controller;