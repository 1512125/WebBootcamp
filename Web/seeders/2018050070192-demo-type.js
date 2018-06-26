'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    let date = new Date();

    return queryInterface.bulkInsert('Types', [{
      Name: 'Áo thun nữ',
      createdAt: date,
      updatedAt: date
    }, {
      Name: 'Áo thun nam',
      createdAt: date,
      updatedAt: date
    }, {
      Name: 'Áo thun cặp',
      createdAt: date,
      updatedAt: date
    }, {
      Name: 'Áo thun nhóm',
      createdAt: date,
      updatedAt: date
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Types', null, {});
  }
};
