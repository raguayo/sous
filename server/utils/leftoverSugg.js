const axios = require('axios');
const distance = require('jaro-winkler');
const Promise = require('bluebird');

const config = {
  baseURL: 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com',
  headers: { 'X-Mashape-Key': process.env.RECIPE_API_KEY },
};

function convertRecipeUnit(recipeIng, targetUnit) {
  const formattedIngName = recipeIng.name.replace(' ', '+');
  return axios.get(
    `/recipes/convert?ingredientName=${formattedIngName}&sourceAmount=${recipeIng.amount}&sourceUnit=${recipeIng.unit}&targetUnit=${targetUnit}'`,
    config)
    .then(res => res.data)
    .catch(console.error);
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

function getLeftoverRecipes(leftoverArr) {
  const ingredientCSV = leftoverArr.map((leftoverObj) => {
    return leftoverObj.name.replace(' ', '+');
  }).join('%2C');
  return axios.get(
    `/recipes/findByIngredients?fillIngredients=false&ingredients=${ingredientCSV}&limitLicense=false&number=10&ranking=2`,
    config)
    .then((res) => {
      console.log('API calls remaining: ', res.headers['x-ratelimit-requests-remaining'])
      return res.data
    })
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

function isTheSameIngredient(name1, name2) {
  const name1Arr = name1.split(' ');
  const name2Arr = name2.split(' ');
  let rating = 0;
  name1Arr.forEach((firstIngNameWord) => {
    let anyMatches = false;
    name2Arr.forEach((secondIngNameWord) => {
      const wordSimilarityScore = distance(firstIngNameWord, secondIngNameWord);
      if (wordSimilarityScore > 0.87) {
        rating += wordSimilarityScore;
        anyMatches = true;
      }
    });
    if (!anyMatches) rating -= 0.5;
  });
  return rating > 0.5;
}

function hasSufficientQuantity(leftoverIngredients, recipeObj) {
  const arrOfBoolsAndBoolPromises = [];
  recipeObj.extendedIngredients.forEach((recipeIng) => {
    const leftoverIng = leftoverIngredients.find((ing) => {
      return isTheSameIngredient(ing.name, recipeIng.name);
    });
    if (leftoverIng) {
      if (leftoverIng.unit !== recipeIng.unit) {
        const boolPromise = convertRecipeUnit(recipeIng, leftoverIng.unit)
          .then((result) => {
            if (leftoverIng.leftoverAmount < result.targetAmount) throw new Error('psuedo false result');
            else return true;
          })
          .catch((err) => {
            console.error(err)
            throw err;
          });

        arrOfBoolsAndBoolPromises.push(boolPromise);
      } else {
        const bool = leftoverIng.leftoverAmount > recipeIng.amount;
        arrOfBoolsAndBoolPromises.push(bool);
      }
    } else {
      arrOfBoolsAndBoolPromises.push(true);
    }
  });
  return Promise.all(arrOfBoolsAndBoolPromises)
    .then(bools => bools.every(bool => bool))
    .catch(() => false);
}

function hasSufficientQuantities(leftoverIng, recipeArr) {
  return Promise.filter(recipeArr, recipeObj => hasSufficientQuantity(leftoverIng, recipeObj));
}

module.exports = function findRecipeSuggestions(peapodIngredients) {
  const leftovers = calculateLeftovers(peapodIngredients);
  return getLeftoverRecipes(leftovers)
    .then(leftoverRecipes => getLeftoverRecipeDetails(leftoverRecipes))
    .then(results => hasSufficientQuantities(leftovers, results));
    // catch error when called by GList Component
};
