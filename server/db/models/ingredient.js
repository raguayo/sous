const Sequelize = require('sequelize');
const db = require('../db');

const Ingredient = db.define('ingredient', {
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },
  peapodName: {
    type: Sequelize.STRING,
  },
  price: {
    type: Sequelize.INTEGER,
  },
  unitMeasure: {
    type: Sequelize.STRING,
  },
  prodId: { // as in, on peapod?
    // are we only planning to integrate with peapod, or other servies in future?
    // if so, it might be sensible to store this stuff on a separate table
    // also, is there just one default peapod-version product for each item from
    // our ingredients table?
    type: Sequelize.INTEGER,
  },
  size: {
    // as in for the unit of measure? defining the columns in sequence determines
    // the ordering of how columns are displayed. It might make sense to put
    // relevant columns close together for sake of ease of understanding?
    type: Sequelize.FLOAT,
  },
});

module.exports = Ingredient;
