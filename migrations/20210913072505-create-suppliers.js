'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Suppliers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nameSuppliers: {
        type: Sequelize.STRING
      },
      addressSuppliers: {
        type: Sequelize.STRING
      },
      numberPhone: {
        type: Sequelize.INTEGER
      },
      discountMoney: {
        type: Sequelize.INTEGER
      },
      quantityItems: {
        type: Sequelize.INTEGER
      },
      totalMoneyBuy: {
        type: Sequelize.FLOAT
      },
      priceInput: {
        type: Sequelize.FLOAT
      },
      email: {
        type: Sequelize.STRING
      },
      items: {
        type: Sequelize.STRING
      },
      importer: {
        type: Sequelize.STRING
      },
      nameAdmin: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Suppliers');
  }
};