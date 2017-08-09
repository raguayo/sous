const Sequelize = require('sequelize');
const db = require('../db');
const Ingredient = require('./ingredient');

const Recipe = db.define('recipe', {
  title: {
    type: Sequelize.STRING,
    unique: true,
    // allowNull: false,
  },
  author: {
    type: Sequelize.STRING,
    // allowNull: false,
  },
  recipeUrl: {
    type: Sequelize.STRING,
    // allowNull: false,
    // validate: {
    //   isUrl: true,
    // },
  },
  imageUrl: {
    type: Sequelize.STRING,
  },
  siteName: {
    type: Sequelize.STRING,
    // allowNull: false,
  },
  tags: {
    type: Sequelize.ARRAY(Sequelize.STRING),
  },
  isFavorite: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
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
