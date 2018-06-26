'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    let date = new Date();

    return queryInterface.bulkInsert('Statuses', [{
      statusName: "Vừa đặt hàng",
      createdAt: date,
      updatedAt: date
    }, {
      statusName: "Đang sản xuất",
      createdAt: date,
      updatedAt: date
    }, {
      statusName: "Đang giao hàng",
      createdAt: date,
      updatedAt: date
    }, {
      statusName: "Đã hoàn thành",
      createdAt: date,
      updatedAt: date
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Statuses', null, {});
  }
};
