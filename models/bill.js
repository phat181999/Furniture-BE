'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class bill extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Product,order }) {
      // define association here
      this.belongsTo(User ,{foreignKey: 'userID', as: 'billsUser'})
      this.belongsToMany(Product, {foreignKey: 'billsOrderID', as: 'productsList', through: 'orders'})
      // this.hasOne(order, {foreignKey: 'billsOrderID', as: 'orderBills'})
    }
  };
  bill.init({
    userID: DataTypes.INTEGER,
    status: DataTypes.STRING,
    totalMoney: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'bill',
  });
  return bill;
};