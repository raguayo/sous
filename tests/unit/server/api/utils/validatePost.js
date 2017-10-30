export const validateRecipeProperties = (res, expect) => {
  expect(res.body).to.be.an("object");
  expect(res.body.savedRecipe).to.be.an("array");
  const recipeFromPost = res.body.savedRecipe[0];

  // expect recipe information
  expect(recipeFromPost.title).to.include("Fudgy Brownies");

  // expect savedrecipeFromPost join information
  expect(recipeFromPost.savedrecipe).to.be.an("object");
  expect(recipeFromPost.savedrecipe.isFavorite).to.equal(null);
  expect(recipeFromPost.savedrecipe.userId).to.equal(2);
  expect(recipeFromPost.savedrecipe.recipeId).to.equal(2);
};

export const validateIngredientProperties = (res, expect) => {
  const recipeFromPost = res.body.savedRecipe[0];
  expect(recipeFromPost.ingredients).to.be.an("array");
  expect(recipeFromPost.ingredients[0]).to.be.an("object");
  const ingredientFromPost = recipeFromPost.ingredients[0];

  // expect eager loading ingredient and peapodIngredient information
  expect(ingredientFromPost.name).to.equal("butter");
  expect(typeof ingredientFromPost.peapodIngredient).to.equal("object");
  expect(ingredientFromPost.peapodIngredient.name).to.equal("test");

  // expect quantity join information
  expect(ingredientFromPost.ingredientQuantity).to.be.an("object");
  expect(ingredientFromPost.ingredientQuantity.quantity).to.equal(10);
  expect(ingredientFromPost.ingredientQuantity.recipeId).to.equal(2);
  expect(ingredientFromPost.ingredientQuantity.ingredientId).to.equal(3);
};
