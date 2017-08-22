import axios from 'axios';

const config = {
  baseURL: 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com',
  headers: { 'X-Mashape-Key': process.env.RECIPE_API_KEY },
};

export function calculateLeftovers(arrOfPeapodIng) {
  const extraIngArr = [];
  arrOfPeapodIng.forEach((ingObj) => {
    if (ingObj.size > ingObj.quantity) {
      const leftoverObj = {
        name: ingObj.name,
        leftoverAmount: ingObj.size - ingObj.quantity,
        unit: ingObj.unitMeasure,
      };
      extraIngArr.push(leftoverObj);
    }
  });
  return extraIngArr;
}

export function filterPeapodIng(ingredients, excludedIds) {
  return ingredients.map((ingredientObj) => {
    if (excludedIds.includes(ingredientObj.id) || !ingredientObj.prodId) return null;
    return ingredientObj;
  }).filter(ing => !!ing);
}

export function getLeftoverRecipes(leftoverArr) {
  const ingredientCSV = leftoverArr.map((leftoverObj) =>{
    return leftoverObj.name.replace(' ', '+');
  }).join('%2C');
  return axios.get(
  `/recipes/findByIngredients?fillIngredients=false&ingredients=${ingredientCSV}&limitLicense=false&number=3&ranking=1`,
  config)
  .then(res => res.data)
  .catch(console.error);
}

export function getLeftoverRecipeDetails(arrOfRecipes) {
  return Promise.all(arrOfRecipes.map((recipeObj) => {
    return axios.get(`/recipes/${recipeObj.id}/information`, config)
    .then(res => res.data)
    .then((recipeDetailsObj) => {
      recipeDetailsObj.missedIngredientCount = recipeObj.missedIngredientCount;
      recipeDetailsObj.usedIngredientCount = recipeObj.usedIngredientCount;
      return recipeDetailsObj;
    })
    .catch(console.error);
  }));
}

export function hasSufficientQuantity(leftoverIngredients, recipeObj) {
  console.log('********* New RECIPE', recipeObj.title)
  return recipeObj.extendedIngredients.every((recipeIng) => {
    const leftoverIng = leftoverIngredients.find(ing => {
      console.log('Inputs', recipeIng.name, ing.name)
      return ing.name === recipeIng.name;
      // misses garlic cloves, red onion,
    });
    console.log('Result:', leftoverIng)
    if (leftoverIng) {
      // console.log('Ing unit', leftoverIng.unitMeasure, 'Recipe unit', recipeObj.unit)
      return leftoverIng.quantity > recipeIng.amount;
    }
    // might have to convert units for this
    return true;
  });
}

export function hasSufficientQuantities(leftoverIng, recipeArr) {
  return recipeArr.filter(recipeObj => hasSufficientQuantity(leftoverIng, recipeObj));
}

// calculate leftover ingredients
// make query to api
// get results back
// filter to make sure user has enough of each ingredient
// return recipes filtered by number of favorites
