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
    static associate({ Product, User}) {
      // define association here
      this.belongsTo(User, {foreignKey: 'checkOutUserId', as: 'IdCheckOutUser'})
      this.belongsTo(Product , {foreignKey: 'productCheckoutId', as: 'idOfProduct'})
    }
  };
  checkOut.init({
    address:{
      type:  DataTypes.STRING,
      allowNull: 
        {
          msg: 'Please enter your address'
        },
      validate: 
        {
          notEmpty: true,
          len: [5,100],
        },
    },
    zipcode: {
      type: DataTypes.NUMBER,
      allowNull: 
        {
          msg: 'Please enter your address'
        },
      validate: 
        {
          notEmpty: true,
          len: [1,100],
        },
    },
    numberPhone: {
      type: DataTypes.NUMBER,
      allowNull: 
      {
        msg: 'Please enter your numberPhone'
      },
    validate: 
      {
        notEmpty: true,
        len: [8],
      },
    },
    quantityCheckOut: DataTypes.NUMBER,
    totalMoney: DataTypes.FLOAT,
    checkoutStatus: {
      type: DataTypes.STRING,
      // values: ['success', 'fail','pending' ]
    },
  }, {
    sequelize,
    modelName: 'checkOut',
  });
  return checkOut;
};