'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    let date = new Date();

    return queryInterface.bulkInsert('Products', [{
      title: '1 Áo thun nữ',
      imagepathLarge: '/images/product_home/i1.jpeg',
      pricing: 200000,
      description: 'Áo dành cho con gái',
      TypeId: 1,
      createdAt: date,
      updatedAt: date
    }, {
      title: '2 Áo thun nữ',
      imagepathLarge: '/images/product_home/i1.jpeg',
      pricing: 200000,
      description: 'Áo dành cho con gái',
      TypeId: 1,
      createdAt: date,
      updatedAt: date
    }, {
      title: '3 Áo thun nữ',
      imagepathLarge: '/images/product_home/i1.jpeg',
      pricing: 200000,
      description: 'Áo dành cho con gái',
      TypeId: 1,
      createdAt: date,
      updatedAt: date
    }, {
      title: '4 Áo thun nữ',
      imagepathLarge: '/images/product_home/i1.jpeg',
      pricing: 200000,
      description: 'Áo dành cho con gái',
      TypeId: 1,
      createdAt: date,
      updatedAt: date
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Products', null, {});
  }
};
