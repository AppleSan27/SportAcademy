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
    static associate({User}) {
      this.belongsToMany(User, {
        through:"Schedule",
        key:"pair_id"
      })
    }
  };
  Pair.init({
    trainer_id: DataTypes.INTEGER,
    sport_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Pair',
  });
  return Pair;
};