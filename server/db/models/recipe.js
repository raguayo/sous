const Sequelize = require('sequelize');
const db = require('../db');
const Ingredient = require('./ingredient');

const Recipe = db.define('recipe', {
  title: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },
  author: {
    type: Sequelize.STRING,
    // allowNull: false,
  },
  recipeUrl: {
    type: Sequelize.STRING,
    allowNull: false,
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

// Recipe.prototype.isInUserGroceryList = function (userId) {
//   return db.models.user.findById(userId)
//     .then(user => user.getGrocerylist())
//     .then(groceryList =>
//       db.models.recipes_grocery_lists.findOne({ where: { grocerylistId: groceryList.id, recipeId: this.id }}))
//     .then(included => !!included)
//     .catch(console.error);
// };

module.exports = Recipe;
