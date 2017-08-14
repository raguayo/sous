const User = require('./user');
const Recipe = require('./recipe');
const Ingredient = require('./ingredient');
const GroceryList = require('./groceryList');
const IngredientQuantity = require('./ingredientQuantity')
const UserRecipe = require('./user-recipe');

User.belongsToMany(Recipe, { through: 'groceryList' });
Recipe.belongsToMany(User, { through: 'groceryList' });

User.belongsToMany(Recipe, { through: 'savedRecipess' });
Recipe.belongsToMany(Recipe, { through: 'savedRecipes' });

Recipe.belongsToMany(Ingredient, { through: 'ingredientQuantity' });
Ingredient.belongsToMany(Recipe, { through: 'ingredientQuantity' });

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = { User, Recipe, Ingredient, IngredientQuantity, GroceryList, UserRecipe };
