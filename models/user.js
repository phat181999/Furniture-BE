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
    static associate() {
      // define association here
    }
  };
  User.init({

    account: {
      type: DataTypes.STRING,
      allowNull: 
        {
          msg: 'Please enter your account'
        },
      unique: true,
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
          // is: /^[0-9a-f]{64}$/i,
          // not: ["^[a-z]+$",'i']
        },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: 
        {
          msg: 'Please enter your email'
        },
      unique: true,
      validate: 
        {
          notEmpty: true,
          len: [5,100],
          isEmail: true, 
        },
    },
 
    fullname: DataTypes.STRING,
    avatar: DataTypes.STRING,
    type: DataTypes.STRING,
    phone: {
      type: DataTypes.INTEGER,
      // allowNull: 
      //   {
      //     msg: 'Please enter your phone'
      //   },
      // isNumeric: true,
      // validate: 
      //   {
      //     notEmpty: true,
      //     len: [5,100],
      //   },
    },
    fullname: DataTypes.STRING,
    address: {
      type: DataTypes.STRING,
      // allowNull: 
    
    },
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};