const Sequelize = require('sequelize');
const db = require('../db');

const Ingredient = db.define('ingredient', {
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },
  peapodName: {
    type: Sequelize.STRING,
  },
  price: {
    type: Sequelize.INTEGER,
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

module.exports = Ingredient;
