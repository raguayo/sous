const Promise = require("bluebird");
const peapodModule = require("../../peapod/mapToPeapod");
const {
  Ingredient,
  IngredientQuantity,
} = require("../db/models");

const findOrCreateIngredientsAndAssociations = async (req, next, ingredients, recipe) => {
  try {
    const ingredientIds = [];
    for (let i = 0; i < ingredients.length; i++) {
      const ingredient = ingredients[i];
      if (ingredient.unit === "") ingredient.unit = "piece";
      const [createdIngredient, ingIsCreated] = await Ingredient.findOrCreate({
        where: {
          name: ingredient.name
        },
        defaults: {
          unitMeasure: ingredient.unit,
          aisle: ingredient.aisle
        }
      });
      if (ingIsCreated) {
        const peapodIngredient = await peapodModule.mapToPeapod(createdIngredient);
        if (peapodIngredient instanceof Error) throw peapodIngredient;
        await createdIngredient.setPeapodIngredient(peapodIngredient[0]);
      }
      ingredientIds.push(createdIngredient.id);
      // todo: change this to hook to aggregate repeated ingredients
      await IngredientQuantity.findOrCreate({
        where: {
          recipeId: recipe.id,
          ingredientId: createdIngredient.id
        },
        defaults: {
          quantity: ingredient.amount
        }
      });
      await recipe.addIngredients(ingredientIds);
    }
  } catch (err) {
    console.error(err);
    // return error to be handled in the route
    return err;
  }
};

module.exports = findOrCreateIngredientsAndAssociations;
