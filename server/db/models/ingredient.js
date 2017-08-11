const Sequelize = require('sequelize');
const db = require('../db');

const Ingredient = db.define('ingredient', {
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },
  price: {
    type: Sequelize.INTEGER,
  },
  unitMeasure: {
    type: Sequelize.STRING,
  },
  prodId: {
    type: Sequelize.INTEGER,
  },
  size: {
    type: Sequelize.STRING,
  }
});

module.exports = Ingredient;
