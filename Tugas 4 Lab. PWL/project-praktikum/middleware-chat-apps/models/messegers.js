'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class messegers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  messegers.init({
    from_id: DataTypes.INTEGER,
    messeges: DataTypes.TEXT,
    submited_at: DataTypes.DATE,
    to_user_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'messegers',
  });
  return messegers;
};