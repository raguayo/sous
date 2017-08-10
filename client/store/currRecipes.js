import axios from 'axios';
import history from '../history';

/**
 * ACTION TYPES
 */
const GET_CURR_RECIPES = 'GET_CURR_RECIPES';
const REMOVE_CURR_RECIPE = 'REMOVE_CURR_RECIPE';

/**
 * INITIAL STATE
 */
const defaultCurrRecipes = [];

/**
 * ACTION CREATORS
 */
const getCurrRecipes = currUserId => ({ type: GET_CURR_RECIPES, currUserId });
const removeCurrRecipe = currRecipeId => ({ type: REMOVE_CURR_RECIPE, currRecipeId });

/**
 * THUNK CREATORS
 */

export const fetchCurrRecipes = id =>
  dispatch =>
    axios.get('/api/recipes/')
      .then(res => res.data)
      .then((currRecipes) => {
        dispatch(getCurrRecipes(currRecipes));
      })
      .catch(err => console.log(err));

export const deletePrevRecipe = prevRecipeId =>
  dispatch =>
    axios.delete(`/api/recipes/${prevRecipeId}`)
      .then(res => res.data)
      .then(() => {
        dispatch(removePrevRecipe(prevRecipeId))
      })
      .catch(err => console.log(err));


/**
 * REDUCER
 */
export default function (state = defaultPrevRecipes, action) {
  switch (action.type) {
    case GET_PREV_RECIPES:
      return action.prevRecipes;
    case REMOVE_PREV_RECIPE:
      return state.filter(prevRecipe => prevRecipe.id !== action.prevRecipeId);
    default:
      return state;
  }
}
