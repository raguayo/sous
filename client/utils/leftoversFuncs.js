import axios from 'axios';
import distance from 'jaro-winkler';
import Promise from 'bluebird';

export function filterPeapodIng(ingredients, excludedIds) {
  return ingredients.map((ingredientObj) => {
    if (excludedIds.includes(ingredientObj.id) || !ingredientObj.prodId) return null;
    return ingredientObj;
  }).filter(ing => !!ing);
}
