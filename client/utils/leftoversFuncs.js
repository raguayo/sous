import axios from 'axios';
import distance from 'jaro-winkler';
import Promise from "bluebird";

const config = {
  baseURL: 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com',
  headers: { 'X-Mashape-Key': 'SjmxUwQ53Amshw9OrrnFyEH3LZugp1093xZjsn7ofvJdBK3dXW' },
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
  const ingredientCSV = leftoverArr.map((leftoverObj) => {
    return leftoverObj.name.replace(' ', '+');
  }).join('%2C');
  return axios.get(
    `/recipes/findByIngredients?fillIngredients=false&ingredients=${ingredientCSV}&limitLicense=false&number=10&ranking=2`,
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

function convertRecipeUnit(recipeIng, targetUnit) {
  const formattedIngName = recipeIng.name.replace(' ', '+');
  return axios.get(
    `/recipes/convert?ingredientName=${formattedIngName}&sourceAmount=${recipeIng.amount}&sourceUnit=${recipeIng.unit}&targetUnit=${targetUnit}'`,
    config)
    .then(res => res.data)
    .catch(console.error);
}

export function hasSufficientQuantity(leftoverIngredients, recipeObj) {
  // return Promise.all an array of bools and boolPromises
  // .then(return arrOfBools.every(bool => bool))
  // .catch(return false)
  const arrOfBoolsAndBoolPromises = [];
  recipeObj.extendedIngredients.forEach((recipeIng) => {
    const leftoverIng = leftoverIngredients.find((ing) => {
      return isTheSameIngredient(ing.name, recipeIng.name);
    });
    if (leftoverIng) {
      if (leftoverIng.unit !== recipeIng.unit) {
        const boolPromise = convertRecipeUnit(recipeIng, leftoverIng.unit)
          .then((result) => {
            console.log('After Conversion: LO: ', leftoverIng.leftoverAmount, leftoverIng.unit, ' REC: ', result.targetAmount, result.targetUnit);
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

export function hasSufficientQuantities(leftoverIng, recipeArr) {
  return Promise.filter(recipeArr, recipeObj => hasSufficientQuantity(leftoverIng, recipeObj));
}

// calculate leftover ingredients
// make query to api
// get results back
// filter to make sure user has enough of each ingredient
// return recipes filtered by number of favorites
