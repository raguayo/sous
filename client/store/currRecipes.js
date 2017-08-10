import axios from 'axios';
import history from '../history';

/**
 * ACTION TYPES
 */
const GET_CURR_RECIPES = 'GET_CURR_RECIPES';
const REMOVE_CURR_RECIPE = 'REMOVE_CURR_RECIPE';
const REMOVE_CURR_RECIPES = 'REMOVE_CURR_RECIPES';

/**
 * INITIAL STATE
 */
const defaultCurrRecipes = [];

/**
 * ACTION CREATORS
 */
const getCurrRecipes = currRecipes => ({ type: GET_CURR_RECIPES, currRecipes });
const removeCurrRecipe = currRecipeId => ({ type: REMOVE_CURR_RECIPE, currRecipeId });
const removeCurrRecipes = () => ({ type: REMOVE_CURR_RECIPES });

/**
 * THUNK CREATORS
 */

 // get grocery list off user and then return the recipes on the grocery list
export const fetchCurrRecipes = () =>
  dispatch =>
    axios.get('/api/grocery-list/recipes')
      .then(res => res.data)
      .then((currRecipes) => {
        dispatch(getCurrRecipes(currRecipes));
      })
      .catch(err => console.log(err));

export const deleteCurrRecipe = currRecipeId =>
  dispatch =>
    axios.delete(`/api/grocery-list/recipes/${currRecipeId}`)
      .then(res => res.data)
      .then(() => {
        dispatch(removeCurrRecipe(currRecipeId));
      })
      .catch(err => console.log(err));

export const deleteCurrRecipes = () =>
  dispatch =>
    axios.delete('/api/grocery-list/recipes')
      .then((res) => {
        return res.data;
      })
      .then(() => {
        dispatch(removeCurrRecipes());
      })
      .catch(err => console.error(err));

/**
 * REDUCER
 */
export default function (state = defaultCurrRecipes, action) {
  switch (action.type) {
    case GET_CURR_RECIPES:
      return action.currRecipes;
    case REMOVE_CURR_RECIPE:
      return state.filter(currRecipe => currRecipe.id !== action.currRecipeId);
    case REMOVE_CURR_RECIPES:
      return [];
    default:
      return state;
  }
}
