const Sequelize = require('sequelize');
const db = require('../db');

const RecipeIngredient = db.define('recipes_ingredients', {
  quantity: {
    type: Sequelize.INTEGER,
  },
});

module.exports = RecipeIngredient;
