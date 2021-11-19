'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pair extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({User, Schedule,Sport}) {
      this.belongsToMany(User, {
        through:"Schedules",
        foreignKey:"pair_id",
        as:"manyPair"
      })
      this.hasMany(Schedule, {foreignKey: "pair_id", as: "treiner"})
      this.belongsTo(Sport, {foreignKey: "sport_id", as:"onePair"})
      this.belongsTo(User, {foreignKey: "user_id", as:"oneUser"})
    }
  };
  Pair.init({
    user_id: DataTypes.INTEGER,
    sport_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Pair',
  });
  return Pair;
};