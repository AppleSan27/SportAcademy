'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Sport extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({User}) {
      this.belongsToMany(User, {
        through: "Pairs",
        key:"sport_id"
      })
    }
  };
  Sport.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Sport',
  });
  return Sport;
};