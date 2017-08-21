const Sequelize = require('sequelize');
const db = require('../db');

const Ingredient = db.define('ingredient', {
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },
  size: {
    type: Sequelize.FLOAT,
  },
  unitMeasure: {
    type: Sequelize.STRING,
  },
  prodId: {
    type: Sequelize.INTEGER,
  },
});

Ingredient.prototype.mapToPeapod = () => {

}

module.exports = Ingredient;
