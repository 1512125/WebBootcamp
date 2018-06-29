'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    let date = new Date();

    return queryInterface.bulkInsert('Customers', [{
      userLogin: 'loc123457',
      password: 'abc123456',
      name: 'Trần Phước Lộc',
      imagepath: '/images/abc.jpg',
      address: '24/D Bình Thạnh, Tp.HCM',
      email: 'phuocloc97@gmail.com',
      phonenumber: '0933266013',
      note: 'Account người dùng',
      admin: false,
      ban: false,
      createdAt: date,
      updatedAt: date
    }, {
      userLogin: 'loc123458',
      password: 'abc123456',
      name: 'Trần Phước Lộc',
      imagepath: '/images/abc.jpg',
      address: '24/D Bình Thạnh, Tp.HCM',
      email: 'phuocloc97@gmail.com',
      phonenumber: '0933266013',
      note: 'Account người dùng',
      admin: false,
      ban: false,
      createdAt: date,
      updatedAt: date
    }, {
      userLogin: 'loc123459',
      password: 'abc123456',
      name: 'Trần Phước Lộc',
      imagepath: '/images/abc.jpg',
      address: '24/D Bình Thạnh, Tp.HCM',
      email: 'phuocloc97@gmail.com',
      phonenumber: '0933266013',
      note: 'Account người dùng',
      admin: false,
      ban: false,
      createdAt: date,
      updatedAt: date
    }, {
      userLogin: 'loc123450',
      password: 'abc123456',
      name: 'Trần Phước Lộc',
      imagepath: '/images/abc.jpg',
      address: '24/D Bình Thạnh, Tp.HCM',
      email: 'phuocloc97@gmail.com',
      phonenumber: '0933266013',
      note: 'Account người dùng',
      admin: false,
      ban: false,
      createdAt: date,
      updatedAt: date
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Customers', null, {});
  }
};