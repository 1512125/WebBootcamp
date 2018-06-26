'use strict';
module.exports = (sequelize, DataTypes) => {
  var Type = sequelize.define('Type', {
    Name: DataTypes.STRING
  }, {});
  Type.associate = function (models) {
    Type.hasMany(models.Product);
  };
  return Type;
};