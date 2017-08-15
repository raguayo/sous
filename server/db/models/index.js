const User = require('./user');
const Recipe = require('./recipe');
const Ingredient = require('./ingredient');
const GroceryList = require('./groceryList');
const IngredientQuantity = require('./ingredientQuantity');
const SavedRecipe = require('./savedRecipe');

Recipe.belongsToMany(User, { through: 'grocerylist', as: 'groceryListUsers' });
User.belongsToMany(Recipe, { through: 'grocerylist', as: 'groceryListRecipes' });

Recipe.belongsToMany(User, { through: 'savedrecipe', as: 'savedRecipesUsers' });
User.belongsToMany(Recipe, { through: 'savedrecipe', as: 'savedRecipes' });

Recipe.belongsToMany(Ingredient, { through: 'ingredientQuantity' });
Ingredient.belongsToMany(Recipe, { through: 'ingredientQuantity' });

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = { User, Recipe, Ingredient, IngredientQuantity, GroceryList, SavedRecipe };
