'use strict';
module.exports = (sequelize, DataTypes) => {
  var Transaction = sequelize.define('Transaction', {
    totalPricing: DataTypes.INTEGER,
    address: DataTypes.STRING,
    phonenumber: DataTypes.STRING,
  }, {});
  
  Transaction.associate = function(models) {
    Transaction.belongsTo(models.Product)
    Transaction.belongsTo(models.Customer)
    Transaction.belongsTo(models.Status)
  };
  return Transaction;
};