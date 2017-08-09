const Sequelize = require('sequelize');
const db = require('../db');

const Ingredient = db.define('ingredient', {
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },
  estimatedPrice: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
  unit: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  searchTerms: {
    type: Sequelize.ARRAY(Sequelize.STRING),
  },
});

module.exports = Ingredient;