var controller = {};
var async = require('async')

var models = require('../models');

var order = 'DESC'

function getOrder(){
	if (order == 'DESC') {
		order = 'ASC'
	} else {
		order = 'DESC'
	}
	return order
}

controller.getAll = function(callback){
    models.Product
    .findAll({
        order: [['title', getOrder()]]
    })
    .then(function(products){
        callback(products);
    })
};

controller.getById = function(id, callback){
    models.Product
    .findOne({ 
        where: {id: id},
        order: [['name', getOrder()]]
    })
    .then(function(product){
        callback(product);
    });
};

 controller.getAllWithType = function(id, callback){
    models.Product
    .findOne({ 
        where: {TypeId: id}
    })
    .then(function(product){
        callback(product);
    });
};

controller.update = function(box, callback) {
    models.Type
    .update({
        title: box.title,
        imagepathLarge: box.image,
        pricing: box.price,
        description: box.desc,
        TypeId: box.type,
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
        title: box.title,
        imagepathLarge: box.image,
        pricing: box.price,
        description: box.desc,
        TypeId: box.type,
        createdAt: new Date(),
        updatedAt: new Date()
    })
    .then(function() {
        callback()
    })
}

controller.search = function(s, callback){
    models.Product
    .findAll({
        where: {
            title: {$ilike: '%' + s + '%'}
        }
    })
    .then(function(products){
        callback(products);
    })
};

module.exports = controller;