const Sequelize = require('sequelize');
const db = require('../db');

const GroceryList = db.define('grocerylist', {
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 1,
  },
});

module.exports = GroceryList;
