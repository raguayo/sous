import axios from 'axios';

const config = {
  baseURL: 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com',
  headers: {"X-Mashape-Key": "YyZySSmshzmshUvFJgXCNd0oeM57p11ZPWNjsns9qV945YLMWs"},
}

function setDisplayUnitAndQuantity(ingObj) {
  let conversionFactor = 1;
  if (ingObj.unitMeasure === 'OZ') {
    if (ingObj.quantity < 0.5) {
      // convert to teaspoons
      ingObj.displayUnit = 'TSB';
      conversionFactor = 0.167;
    } else if (ingObj.quantity < 2) {
      // convert to tablespoons
      ingObj.displayUnit = 'TB';
      conversionFactor = 0.5;
    } else {
      ingObj.displayUnit = ingObj.unitMeasure;
    }
  } else if (ingObj.unitMeasure === 'PINT') {
    if (ingObj.quantity < 0.03125) {
      // convert to teaspoons
      ingObj.displayUnit = 'TSB';
      conversionFactor = 0.01;
    } else if (ingObj.quantity < 0.125) {
      // convert to tablespoons
      ingObj.displayUnit = 'TB';
      conversionFactor = 0.03125;
    } else if (ingObj.quantity < 1) {
      // convert to tablespoons
      ingObj.displayUnit = 'CUPS';
      conversionFactor = 0.125;
    } else {
      ingObj.displayUnit = ingObj.unitMeasure;
    }
  } else if (ingObj.unitMeasure === 'LB') {
    if (ingObj.quantity < 0.03125) {
      // convert to teaspoons
      ingObj.displayUnit = 'TSB';
      conversionFactor = 0.01;
    } else if (ingObj.quantity < 0.125) {
      // convert to tablespoons
      ingObj.displayUnit = 'TB';
      conversionFactor = 0.03125;
    } else if (ingObj.quantity < 0.25) {
      // convert to tablespoons
      ingObj.displayUnit = 'CUPS';
      conversionFactor = 0.125;
    } else {
      ingObj.displayUnit = ingObj.unitMeasure;
    }
  } else if (ingObj.unitMeasure === 'DOZ') {
    ingObj.displayUnit = 'CT';
    conversionFactor = 0.083;
  } else {
    ingObj.displayUnit = ingObj.unitMeasure;
  }
  ingObj.displayQuantity = Math.round((ingObj.quantity / conversionFactor) * 100) / 100;
  return ingObj;
}

function roundOffNumber(ingObj) {
  if (ingObj.displayUnit === 'CT' || ingObj.displayUnit === 'OZ') {
    ingObj.displayQuantity = Math.ceil(ingObj.displayQuantity);
  } else if (ingObj.displayUnit === 'TSB' || ingObj.displayUnit === 'TSB' || ingObj.unitMeasure === 'LB') {
    ingObj.displayQuantity = Math.round(ingObj.displayQuantity * 4) / 4;
  }
  return ingObj;
}

function calculateLeftovers(arrOfPeapodIng) {
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

function filterPeapodIng(ingredients, excludedIds) {
  return ingredients.map((ingredientObj) => {
    if (excludedIds.includes(ingredientObj.id) || !ingredientObj.prodId) return null;
    return ingredientObj;
  }).filter(ing => !!ing);
}

function getLeftoverRecipes(leftoverArr) {
  const ingredientCSV = leftoverArr.map((leftoverObj) =>{
    return leftoverObj.name.replace(' ', '+');
  }).join('%2C');
  return axios.get(
  `/recipes/findByIngredients?fillIngredients=false&ingredients=${ingredientCSV}&limitLicense=false&number=3&ranking=1`,
  config)
  .then(res => res.data)
  .catch(console.error);
}

function getLeftoverRecipeDetails(arrOfRecipes) {
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

module.exports = {
  setDisplayUnitAndQuantity,
  roundOffNumber,
  calculateLeftovers,
  filterPeapodIng,
  getLeftoverRecipes,
  getLeftoverRecipeDetails,
};
