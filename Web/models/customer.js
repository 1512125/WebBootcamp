'use strict';
var bcrypt = require("bcrypt-nodejs");

module.exports = (sequelize, DataTypes) => {
  var Customer = sequelize.define('Customer', {
    userLogin: DataTypes.STRING,
    password: DataTypes.STRING,
    name: DataTypes.STRING,
    imagepath: DataTypes.STRING,
    address: DataTypes.STRING,
    email: DataTypes.STRING,
    phonenumber: DataTypes.STRING,
    note: DataTypes.TEXT,
    admin: DataTypes.BOOLEAN,
    ban: DataTypes.BOOLEAN
  }, {})

  Customer.associate = function (models) {
    Customer.hasMany(models.Transaction);
  };
  return Customer;
};