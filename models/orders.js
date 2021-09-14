'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class orders extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Product, bill }) {
      // define association here
      this.belongsTo(Product,  {foreignKey: 'listProductsID', as: 'productsList'})
      this.belongsTo(bill, {foreignKey: 'billsOrderID', as: 'orderBills'})
    }
  };
  orders.init({
    listProductsID: DataTypes.INTEGER,
    billsOrderID: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'orders',
  });
  return orders;
};