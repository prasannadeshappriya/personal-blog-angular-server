'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CONFIG extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  CONFIG.init({
    CONFIG_NAME: DataTypes.STRING,
    CONFIG_VALUE: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'CONFIG',
  });
  return CONFIG;
};