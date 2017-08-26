const Sequelize = require('sequelize');
const db = require('../db');
const PeapodIngredient = require('./peapodIng');

const Ingredient = db.define('ingredient', {
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },
  size: {
    type: Sequelize.FLOAT,
  },
  aisle: {
    type: Sequelize.STRING,
  },
  unitMeasure: {
    type: Sequelize.STRING,
  },
  prodId: {
    type: Sequelize.INTEGER,
  },
}, {
  defaultScope: {
    include: [
      { model: PeapodIngredient },
    ],
  },
});

module.exports = Ingredient;
