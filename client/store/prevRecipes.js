import axios from 'axios';
import history from '../history';

/**
 * ACTION TYPES
 */
const GET_PREV_RECIPES = 'GET_PREV_RECIPES';
const REMOVE_PREV_RECIPE = 'REMOVE_PREV_RECIPE';
const ADD_NEW_RECIPE = 'ADD_NEW_RECIPE';

/**
 * INITIAL STATE
 */
const defaultPrevRecipes = [];

/**
 * ACTION CREATORS
 */
const getPrevRecipes = prevRecipes => ({ type: GET_PREV_RECIPES, prevRecipes });
const removePrevRecipe = prevRecipeId => ({ type: REMOVE_PREV_RECIPE, prevRecipeId });
const addRecipe = newRecipe => ({ type: ADD_NEW_RECIPE, newRecipe });

/**
 * THUNK CREATORS
 */

export const fetchPrevRecipes = () =>
  dispatch =>
    axios.get('/api/recipes')
      .then(res => res.data)
      .then((prevRecipes) => {
        dispatch(getPrevRecipes(prevRecipes));
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

export const postNewRecipe = url =>
  dispatch =>
    axios.post('/api/recipes', { url })
      .then(res => res.data)
      .then(newRecipe => {
        dispatch(addRecipe(newRecipe))
      })
      .catch(console.error);

/**
 * REDUCER
 */
export default function (state = defaultPrevRecipes, action) {
  switch (action.type) {
    case GET_PREV_RECIPES:
      return action.prevRecipes;
    case REMOVE_PREV_RECIPE:
      return state.filter(prevRecipe => prevRecipe.id !== action.prevRecipeId);
    case ADD_NEW_RECIPE:
      return [action.newRecipe, ...state];
    default:
      return state;
  }
}
