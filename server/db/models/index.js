const User = require('./user');
const Recipe = require('./recipe');
const Ingredient = require('./ingredient');
const GroceryList = require('./grocery-list');
const RecipeIngredient = require('./recipe-ingredient');
const UserRecipe = require('./user-recipe');

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */
User.belongsTo(GroceryList);
// User.belongsTo(GroceryList, { through: 'users_groceryLists' });

User.belongsToMany(Recipe, { through: 'users_recipes' });
Recipe.belongsToMany(User, { through: 'users_recipes' });

Recipe.belongsToMany(Ingredient, { through: 'recipes_ingredients' });
Ingredient.belongsToMany(Recipe, { through: 'recipes_ingredients' });

Recipe.belongsToMany(GroceryList, { through: 'recipes_grocery_lists' });
GroceryList.belongsToMany(Recipe, { through: 'recipes_grocery_lists' });

/*
  Update schema to be more concise and descriptive:
    - The GroceryList table is not necessary - it is simply a many-to-many join
      between Users and Recipes, where the relationship is best described as
      'GroceryList', e.g.
        User.belongsToMany(Recipe, { through: 'groceryList' });
        Recipe.belongsToMany(User, { through: 'groceryList' });
      ... or something
    - Yes, I see users_recipes is also a table we want to maintain, and that
      makes sense. Users should be able to have saved recipes! But that's exactly
      what they are - 'saved recipes', so perhaps the table name should be more
      reflective of that relationship.
        User.belongsToMany(Recipe, { through: 'savedRecipes' });
        Recipe.belongsToMany(User, { through: 'savedRecipes' });
      ... or something
    - Now we should have user.getGroceryList() & user.getSavedRecipes() methods,
      and one less table! Woo! If there's extra fields you would like to include
      you can still do so (I see you guys already know how to achieve that).
    - If you wanted to be able to see past grocery lists that users have completed,
      then this schema would not work. However, the way it's currently set up also
      does not fully allow for that functionality either. So, just proceed with
      whatever you deem appropriate
*/

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User, Recipe, Ingredient, GroceryList, RecipeIngredient, UserRecipe,
};
