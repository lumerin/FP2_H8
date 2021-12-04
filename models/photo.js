'use strict';
const {
  Model
} = require('sequelize');
const user = require('./user');
module.exports = (sequelize, DataTypes) => {
  class Photo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // User 1 - N Photos
      Photo.belongsTo(models.User, { foreignKey: "userid" });
    }
  };
  Photo.init({
    title: DataTypes.STRING,
    caption: DataTypes.TEXT,
    poster_image_url: DataTypes.TEXT,
    userid: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Photo',
  });
  return Photo;
};