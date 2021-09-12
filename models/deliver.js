'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class deliver extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  deliver.init({
    name: DataTypes.STRING,
    age: DataTypes.INTEGER,
    identityCard: DataTypes.STRING,
    drivingLicense: DataTypes.STRING,
    address: DataTypes.STRING,
    numberPhone: DataTypes.INTEGER,
    avatarShiper: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'deliver',
  });
  return deliver;
};