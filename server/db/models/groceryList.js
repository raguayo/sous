const Sequelize = require('sequelize');
const db = require('../db');

const GroceryList = db.define('groceryList', {
  quantity: {
    type: Sequelize.INTEGER,
  },
});

module.exports = GroceryList;
