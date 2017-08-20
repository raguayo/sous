import axios from 'axios';
import history from '../history';
import { removeRecipeFromList } from './groceryListRecipes';
import { addError } from './error';

/**
 * ACTION TYPES
 */
const GET_SAVED_RECIPES = 'GET_SAVED_RECIPES';
const REMOVE_SAVED_RECIPE = 'REMOVE_SAVED_RECIPE';
const ADD_NEW_RECIPE = 'ADD_NEW_RECIPE';
const FAVORITE_RECIPE = 'FAVORITE_RECIPE';
const TOGGLE_FAVORITE_RECIPE = 'TOGGLE_FAVORITE_RECIPE';

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
const toggleFavoriteRecipe = recipe => ({ type: TOGGLE_FAVORITE_RECIPE, recipe });
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
      .catch(addError);

export const deleteSavedRecipe = recipeId =>
  dispatch =>
    axios.delete(`/api/recipes/${recipeId}`)
      .then(res => res.data)
      .then(() => {
        dispatch(removeSavedRecipe(recipeId));
        dispatch(removeRecipeFromList(recipeId));
      })
      .catch(addError);

export const postNewRecipe = (url, inGroceryList) =>
  dispatch =>
    axios.post('/api/recipes', { url, inGroceryList })
      .then(res => res.data)
      .then((newRecipe) => {
        dispatch(addRecipe(newRecipe));
      })
      .catch(addError);

export const favoriteToggle = recipeId => dispatch =>
  axios.put(`/api/recipes/${recipeId}/favorite`)
    .then(res => res.data)
    .then((toggled) => {
      dispatch(toggleFavoriteRecipe(toggled));
    })
    .catch(addError);
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
    case TOGGLE_FAVORITE_RECIPE:
      return state.map((recipe) => {
        if (recipe.id === action.recipe.id) {
          return action.recipe;
        }
        return recipe;
      });
    default:
      return state;
  }
}
