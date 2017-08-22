const Sequelize = require('sequelize');
const db = require('../db');

const PeapodIngredient = db.define('peapodIngredient', {
  name: {
    type: Sequelize.STRING,
  },
  price: {
    type: Sequelize.FLOAT,
  },
  size: {
    type: Sequelize.FLOAT,
  },
  prodId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    unique: true,
  },
});

module.exports = PeapodIngredient;

// add ingredient
// once ingredient is created
  // search that name in peapod
  // get the first 20 results
  // use j-w algo to pick best one
  // add into db
    // map the right fields
    // convert size to given quantity
