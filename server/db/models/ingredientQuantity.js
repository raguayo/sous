const Sequelize = require('sequelize');
const db = require('../db');

const IngredientQuantity = db.define('ingredientQuantity', {
  quantity: {
    type: Sequelize.INTEGER,
  },
});

module.exports = IngredientQuantity;
