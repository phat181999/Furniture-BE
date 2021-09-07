'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('checkOuts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      checkOutUserId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id'
        }
      },
      productCheckoutId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'products',
          key : 'id'
        }
      },
      address: {
        type: Sequelize.STRING
      },
      zipcode: {
        type: Sequelize.INTEGER
      },
      numberPhone: {
        type: Sequelize.INTEGER
      },
      checkoutStatus: {
        type: Sequelize.STRING,
        // values: ['success', 'fail', 'pending'],
        defaultValue: 'pending'
      },
      quantityCheckOut: {
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
    await queryInterface.dropTable('checkOuts');
  }
};