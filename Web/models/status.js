'use strict';
module.exports = (sequelize, DataTypes) => {
  var Status = sequelize.define('Status', {
    statusName: DataTypes.STRING
  }, {});
  Status.associate = function (models) {
    Status.hasMany(models.Transaction);
  };
  return Status;
};