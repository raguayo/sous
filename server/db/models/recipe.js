const Sequelize = require('sequelize');
const db = require('../db');
const Ingredient = require('./ingredient');
console.log('Model Recipe ran')
const Recipe = db.define('recipe', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  author: {
    type: Sequelize.STRING,
  },
  recipeUrl: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  imageUrl: {
    type: Sequelize.STRING,
  },
  siteName: {
    type: Sequelize.STRING,
  },
  tags: {
    type: Sequelize.ARRAY(Sequelize.STRING),
  },
  numServings: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
}, {
  defaultScope: {
    include: [
      { model: Ingredient },
    ],
  },
});

module.exports = Recipe;
