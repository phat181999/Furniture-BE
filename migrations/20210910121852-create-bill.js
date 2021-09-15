'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('bills', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userID: {
        type: Sequelize.INTEGER,
        references:{
          model: 'users',
          key: 'id'
        }
      },
      status: {
        type: Sequelize.STRING,
        defaultValue: "PENDING",
      },
      numberPhone: {
        type: Sequelize.STRING,
      },
      addresss: {
        type: Sequelize.STRING,
      },
      zipcode: {
        type: Sequelize.INTEGER
      },
      totalMoney: {
        type: Sequelize.FLOAT
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
    await queryInterface.dropTable('bills');
  }
};