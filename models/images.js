'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Images extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Product}) {
      // define association here
      this.belongsTo(Product, {foreignKey: 'imagesProductID', as: 'idImagesProduct'})
    }
  };
  Images.init({
    picture: DataTypes.STRING,
    imagesProductID: {
      type: DataTypes.INTEGER,
      references: {
        model: "Product",
        key: "id"
      }
    },
  }, {
    sequelize,
    modelName: 'Images',
  });
  return Images;
};