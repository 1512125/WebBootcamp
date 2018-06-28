'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    let date = new Date();

    return queryInterface.bulkInsert('Transactions', [{
      num: 15,
      totalPricing: 200000,
      address: "D2, Bình Thạnh",
      phonenumber: "0933122266",
      ProductId: 1,
      CustomerId: 1,
      StatusId: 1,
      createdAt: date,
      updatedAt: date
    }, {
      num: 15,
      totalPricing: 200000,
      address: "D2, Bình Thạnh",
      phonenumber: "0933122266",
      ProductId: 1,
      CustomerId: 1,
      StatusId: 1,
      createdAt: date,
      updatedAt: date
    }, {
      num: 15,
      totalPricing: 200000,
      address: "D2, Bình Thạnh",
      phonenumber: "0933122266",
      ProductId: 1,
      CustomerId: 1,
      StatusId: 1,
      createdAt: date,
      updatedAt: date
    }, {
      num: 15,
      totalPricing: 200000,
      address: "D2, Bình Thạnh",
      phonenumber: "0933122266",
      ProductId: 1,
      CustomerId: 1,
      StatusId: 1,
      createdAt: date,
      updatedAt: date
    }, {
      num: 15,
      totalPricing: 200000,
      address: "D2, Bình Thạnh",
      phonenumber: "0933122266",
      ProductId: 1,
      CustomerId: 1,
      StatusId: 1,
      createdAt: date,
      updatedAt: date
    }, {
      num: 15,
      totalPricing: 200000,
      address: "D2, Bình Thạnh",
      phonenumber: "0933122266",
      ProductId: 1,
      CustomerId: 1,
      StatusId: 3,
      createdAt: date,
      updatedAt: date
    }, {
      num: 15,
      totalPricing: 200000,
      address: "D2, Bình Thạnh",
      phonenumber: "0933122266",
      ProductId: 1,
      CustomerId: 1,
      StatusId: 2,
      createdAt: date,
      updatedAt: date
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Transactions', null, {});
  }
};
