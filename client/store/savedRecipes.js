import axios from 'axios';
import history from '../history';
import { removeRecipeFromList } from './groceryListRecipes';

/**
 * ACTION TYPES
 */
const GET_SAVED_RECIPES = 'GET_SAVED_RECIPES';
const REMOVE_SAVED_RECIPE = 'REMOVE_SAVED_RECIPE';
const ADD_NEW_RECIPE = 'ADD_NEW_RECIPE';

/**
 * INITIAL STATE
 */
const defaultRecipes = [];

/**
 * ACTION CREATORS
 */
const getSavedRecipes = recipes => ({ type: GET_SAVED_RECIPES, recipes });
const removeSavedRecipe = recipeId => ({ type: REMOVE_SAVED_RECIPE, recipeId });
const addRecipe = newRecipe => ({ type: ADD_NEW_RECIPE, newRecipe });

/**
 * THUNK CREATORS
 */

export const fetchSavedRecipes = () =>
  dispatch =>
    axios.get('/api/recipes')
      .then(res => res.data)
      .then((recipes) => {
        dispatch(getSavedRecipes(recipes));
      })
      .catch(err => console.log(err));

export const deleteSavedRecipe = recipeId =>
  dispatch =>
    axios.delete(`/api/recipes/${recipeId}`)
      .then(res => res.data)
      .then(() => {
        dispatch(removeSavedRecipe(recipeId));
        dispatch(removeRecipeFromList(recipeId));
      })
      .catch(err => console.log(err));

export const postNewRecipe = (url, inGroceryList) =>
  dispatch =>
    axios.post('/api/recipes', { url, inGroceryList })
      .then(res => res.data)
      .then((newRecipe) => {
        dispatch(addRecipe(newRecipe));
      })
      .catch(console.error);


/**
 * REDUCER
 */
export default function (state = defaultRecipes, action) {
  switch (action.type) {
    case GET_SAVED_RECIPES:
      return action.recipes;
    case REMOVE_SAVED_RECIPE:
      return state.filter(recipe => recipe.id !== action.recipeId);
    case ADD_NEW_RECIPE:
      return [action.newRecipe, ...state];
    default:
      return state;
  }
}
