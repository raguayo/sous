const Sequelize = require('sequelize');
const db = require('../db');

const GroceryList = db.define('grocerylist', {
  quantity: {
    type: Sequelize.INTEGER,
  },
});

module.exports = GroceryList;
