'use strict';
module.exports = (sequelize, DataTypes) => {
  var Product = sequelize.define('Product', {
    title: DataTypes.STRING,
    imagepathLarge: DataTypes.STRING,
    pricing: DataTypes.INTEGER,
    description: DataTypes.TEXT,
    admin: DataTypes.BOOLEAN
  }, {})

  Product.associate = function(models) {
    Product.belongsTo(models.Type)
    Product.hasMany(models.Transaction)
  }
  return Product;
}