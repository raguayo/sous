const Sequelize = require('sequelize');
const db = require('../db');

const PeapodIngredient = db.define('peapodIngredient', {
  name: {
    type: Sequelize.STRING,
  },
  price: {
    type: Sequelize.FLOAT,
  },
  size: {
    type: Sequelize.FLOAT,
  },
  prodId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    unique: true,
  },
});

module.exports = PeapodIngredient;
