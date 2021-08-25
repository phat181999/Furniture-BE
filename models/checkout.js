'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class checkOut extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ carts, User}) {
      // define association here
      this.belongsTo(User, {foreignKey: 'checkOutUserId', as: 'IdCheckOutUser'})
      this.belongsTo(carts , {foreignKey: 'checkOutCartId', as: 'IdCheckOutCart'})
    }
  };
  checkOut.init({
    address: DataTypes.STRING,
    zipcode: DataTypes.NUMBER,
    numberPhone: DataTypes.NUMBER,
    totalMoney: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'checkOut',
  });
  return checkOut;
};