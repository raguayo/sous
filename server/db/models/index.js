const User = require('./user');
const Recipe = require('./recipe');
const PeapodIngredient = require('./peapodIng');
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

Ingredient.belongsToMany(User, { through: 'excludedingredient', as: 'excludedIngredientUsers' });
User.belongsToMany(Ingredient, { through: 'excludedingredient', as: 'excludedIngredients' });

Ingredient.belongsTo(PeapodIngredient);

module.exports = { User, Recipe, Ingredient, IngredientQuantity, GroceryList, SavedRecipe, PeapodIngredient };
