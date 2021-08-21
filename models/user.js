'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) =>
{
  class User extends Model
  {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Product, TypeProduct, carts })
    {
      // define association here
      this.hasMany(Product, { foreignKey: 'adminProductId', as: 'idAdminProduct' })
      this.hasMany(TypeProduct, { foreignKey: 'adminTypeProductId', as: 'idAdminTypeProduct' })
      this.hasMany(carts, { foreignKey: 'userId', as: 'idUserCart' })
    }
  };
  User.init({

    account: {
      type: DataTypes.STRING,
      allowNull: 
        {
          msg: 'Please enter your account'
        },
      validate: 
        {
          notEmpty: true,
          len: [5,100],
        },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: 
        {
          msg: 'Please enter your account'
        },
      validate: 
        {
          notEmpty: true,
          len: [5,100],
        },
    },
 
    fullname: DataTypes.STRING,

    avatar: DataTypes.STRING,
    type: DataTypes.STRING,
    phone: {
      type: DataTypes.INTEGER,
      allowNull: 
        {
          msg: 'Please enter your phone'
        },
      validate: 
        {
          notEmpty: true,
          len: [5,100],
        },
    },
    address: {
      type: DataTypes.STRING,
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
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};