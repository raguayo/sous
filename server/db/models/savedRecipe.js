const Sequelize = require('sequelize');
const db = require('../db');

const SavedRecipe = db.define('savedRecipe', {
  isFavorite: {
    type: Sequelize.BOOLEAN,
  },
});

module.exports = SavedRecipe;
