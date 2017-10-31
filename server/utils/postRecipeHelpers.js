import { mapToPeapod } from "../../peapod/mapToPeapod";

const {
  Ingredient,
  IngredientQuantity,
} = require("../db/models");

const Promise = require("bluebird");

export const findOrCreateIngredientsAndAssociations = async (req, next, ingredients, recipe) => {
  const ingredientIds = [];
  await Promise.each(req.recipe.extendedIngredients, async (ingredient) => {
    try {
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
        const peapodIngredient = await mapToPeapod(createdIngredient);
        await createdIngredient.setPeapodIngredient(peapodIngredient[0]);
      }
      ingredientIds.push(createdIngredient.id);
      await IngredientQuantity.create({
        recipeId: recipe.id,
        ingredientId: createdIngredient.id,
        quantity: ingredient.amount
      });
      await recipe.addIngredients(ingredientIds);
    } catch (err) {
      next(err);
    }
  });
};
