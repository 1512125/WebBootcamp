var controller = {};
var async = require('async')

var models = require('../models');

controller.getAll = function(callback){
    models.Type
    .findAll()
    .then(function(types){
        callback(types);
    })
};

controller.update = function(box, callback) {
    models.Type
    .update({
        Name: box.Name,
        updatedAt: new Date()
    }, {
        where: {
            id: box.id
        }
    })
    .then(function(){
        callback();
    })
}

controller.delete = function(box, callback) {
    models.Type
    .destroy({
        where: {
            id: box.id
        }
    })
    .then(function(){
        callback()
    })
}

controller.insert = function(box, callback) {
    models.Type
    .create({
        Name: box.Name,
        createdAt: new Date(),
        updatedAt: new Date()
    })
    .then(function() {
        callback()
    })
}

module.exports = controller;