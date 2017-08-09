const Sequelize = require('sequelize');
const db = require('../db');

const UserRecipe = db.define('users_recipes', {
  isFavorite: {
    type: Sequelize.BOOLEAN,
  },
});

module.exports = UserRecipe;
