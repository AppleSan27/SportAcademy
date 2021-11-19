'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Schedule extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Pair, User}) {
      this.belongsTo(User, {foreignKey: "user_id"});
      this.belongsTo(Pair, {foreignKey: "pair_id"})
    }
  };
  Schedule.init({
    date: DataTypes.DATE,
    user_id: DataTypes.INTEGER,
    pair_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Schedule',
  });
  return Schedule;
};