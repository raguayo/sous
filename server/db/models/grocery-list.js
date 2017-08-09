const Sequelize = require('sequelize');
const Recipe = require('./recipe');
const db = require('../db');

const GroceryList = db.define('grocery_list', {
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },
}, {
  defaultScope: {
    include: [
      { model: Recipe },
    ],
  },
});

module.exports = GroceryList;
