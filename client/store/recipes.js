import axios from 'axios';
import history from '../history';

/**
 * ACTION TYPES
 */
const GET_RECIPES = 'GET_RECIPES';
const REMOVE_PREV_RECIPE = 'REMOVE_PREV_RECIPE';
const ADD_NEW_RECIPE = 'ADD_NEW_RECIPE';
const REMOVE_RECIPE_FROM_LIST = 'REMOVE_RECIPE_FROM_LIST';
const CLEAR_LIST = 'CLEAR_LIST';

/**
 * INITIAL STATE
 */
const defaultRecipes = [];

/**
 * ACTION CREATORS
 */
const getRecipes = recipes => ({ type: GET_RECIPES, recipes });
const removePrevRecipe = prevRecipeId => ({ type: REMOVE_PREV_RECIPE, prevRecipeId });
const addRecipe = newRecipe => ({ type: ADD_NEW_RECIPE, newRecipe });
const removeRecipeFromList = recipeId => ({ type: REMOVE_RECIPE_FROM_LIST, recipeId });
const clearList = () => ({ type: CLEAR_LIST });

/**
 * THUNK CREATORS
 */

export const fetchRecipes = () =>
  dispatch =>
    axios.get('/api/recipes')
      .then(res => res.data)
      .then((recipes) => {
        dispatch(getRecipes(recipes));
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
      .then((newRecipe) => {
        dispatch(addRecipe(newRecipe));
      })
      .catch(console.error);

export const deleteRecipeFromList = recipeId =>
  dispatch =>
    axios.delete(`/api/grocery-list/recipes/${recipeId}`)
      .then(res => res.data)
      .then(() => {
        dispatch(removeRecipeFromList(recipeId));
      })
      .catch(err => console.log(err));

export const deleteRecipesFromList = () =>
  dispatch =>
    axios.delete('/api/grocery-list/recipes')
      .then((res) => {
        return res.data;
      })
      .then(() => {
        dispatch(clearList());
      })
      .catch(err => console.error(err));


/**
 * REDUCER
 */
export default function (state = defaultRecipes, action) {
  switch (action.type) {
    case GET_RECIPES:
      return action.recipes;
    case REMOVE_PREV_RECIPE:
      return state.filter(prevRecipe => prevRecipe.id !== action.prevRecipeId);
    case ADD_NEW_RECIPE:
      return [action.newRecipe, ...state];
    case REMOVE_RECIPE_FROM_LIST:
      return state.map((recipe) => {
        if (recipe.id === action.recipeId) recipe.inGroceryList = false;
        return recipe;
      });
    case CLEAR_LIST:
      return state.map((recipe) => {
        recipe.inGroceryList = false;
        return recipe;
      });
    default:
      return state;
  }
}
