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
    account: DataTypes.STRING,
    fullname: DataTypes.STRING,
    password: DataTypes.STRING,
    avatar: DataTypes.STRING,
    type: DataTypes.STRING,
    phone: DataTypes.INTEGER,
    address: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};