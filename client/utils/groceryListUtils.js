export function getIngredients(groceryListRecipes) {
  const ingredientList = [];
  groceryListRecipes.forEach((recipe) => {
    const recipeQuantity = recipe.grocerylist.quantity;
    recipe.ingredients.forEach((ingredient) => {
      const foundIng = ingredientList.find(obj => obj.id === ingredient.id)
      if (foundIng) {
        foundIng.quantity += ingredient.ingredientQuantity.quantity * recipeQuantity;
      } else {
        const { id, name, prodId, size, unitMeasure } = ingredient;
        const quantity = ingredient.ingredientQuantity.quantity * recipeQuantity;
        ingredientList.push({
          name,
          id,
          prodId,
          unitMeasure,
          size,
          quantity,
        });
      }
    });
  });
  return ingredientList;
}

