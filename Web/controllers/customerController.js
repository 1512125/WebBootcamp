var controller = {};
var async = require('async')

var models = require('../models');
var bCrypt = require('bcrypt-nodejs');

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

controller.update = function(box, callback){
    console.log(box)
    models.Customer
    .update({
        note: box.note,
        ban: box.ban
    }, {
        where: {
            id: box.id
        }
    })
    .then(function(){
        callback();
    })
};

controller.updateInfo = function(id, info, callback){
    models.Customer
    .update({
        name: info.name,
        address: info.address,
        email: info.email,
        phonenumber: info.phonenumber
    }, {
        where: {
            id: id
        }
    })
    .then(function(){
        callback();
    })
};


controller.updatePassword = function(id, info, callback){
    let password = bCrypt.hashSync(info.password, bCrypt.genSaltSync(8), null);
    models.Customer
    .update({
        password: password
    }, {
        where: {
            id: id
        }
    })
    .then(function(){
        callback();
    })
};


module.exports = controller;