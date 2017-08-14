const Sequelize = require('sequelize');
const db = require('../db');

const RecipeGroceryList = db.define('recipes_grocery_lists', {
  quantity: {
    type: Sequelize.INTEGER,
  },
});

module.exports = RecipeGroceryList;
