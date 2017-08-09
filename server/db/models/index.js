const User = require('./user');
const Recipe = require('./recipe');
const Ingredient = require('./ingredient');
const GroceryList = require('./grocery-list');

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */
User.belongsTo(GroceryList);
User.belongsTo(GroceryList, { through: 'users_groceryLists' });
User.belongsToMany(Recipe, { through: 'users_recipes' });
Recipe.belongsToMany(Ingredient, { through: 'recipes_ingredients' });
Recipe.belongsToMany(GroceryList, { through: 'recipes_grocery_lists' });

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User, Recipe, Ingredient, GroceryList,
};
