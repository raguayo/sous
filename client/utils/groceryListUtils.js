export function getIngredients(groceryListRecipes) {
  const ingredientList = [];
  groceryListRecipes.forEach((recipe) => {
    const recipeQuantity = recipe.grocerylist.quantity;
    recipe.ingredients.forEach((ingredient) => {
      const foundIng = ingredientList.find(obj => obj.id === ingredient.id);
      if (foundIng) {
        foundIng.quantity += ingredient.ingredientQuantity.quantity * recipeQuantity;
      } else {
        const { id, name, unitMeasure } = ingredient;
        const quantity = ingredient.ingredientQuantity.quantity * recipeQuantity;
        const prodId = ingredient.peapodIngredient ? ingredient.peapodIngredient.prodId : null;
        const size = ingredient.peapodIngredient ? ingredient.peapodIngredient.size : null;
        const aisle = ingredient.aisle ? ingredient.aisle : null;
        ingredientList.push({
          name,
          aisle,
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

export function aisleMaker(ingredients) {
  const groceryStore = {};
  ingredients.forEach((ingredient) => {
    let aisleName;
    if (!ingredient.aisle) {
      ingredient.aisle = 'Other';
    } else if (ingredient.aisle.includes(';')) {
      aisleName = ingredient.aisle.replace(';', ' ');
    } else if (ingredient.aisle === '?') {
      aisleName = 'Other';
    } else {
      aisleName = ingredient.aisle;
    }
    if (groceryStore[aisleName]) {
      groceryStore[aisleName].push(ingredient);
    } else if (!aisleName) {
      groceryStore.other = [];
      groceryStore.other.push(ingredient);
    } else {
      groceryStore[aisleName] = [];
      groceryStore[aisleName].push(ingredient);
    }
  });
  return groceryStore;
}
