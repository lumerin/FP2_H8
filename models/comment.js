'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Comments N - 1 Photo
      Comment.belongsTo(models.Photo, { foreignKey: "photoid"});
      // Comments N - 1 Users
      Comment.belongsTo(models.User, { foreignKey: "userid"});
    }
  };
  Comment.init({
    userid: DataTypes.INTEGER,
    photoid: DataTypes.INTEGER,
    comment: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};