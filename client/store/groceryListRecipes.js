import axios from 'axios';
import history from '../history';

/**
 * ACTION TYPES
 */
const GET_LIST_RECIPES = 'GET_LIST_RECIPES';
const REMOVE_RECIPE_FROM_HISTORY = 'REMOVE_RECIPE_FROM_HISTORY';
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
const getListRecipes = recipes => ({ type: GET_LIST_RECIPES, recipes });
const removeRecipeFromList = recipeId => ({ type: REMOVE_RECIPE_FROM_LIST, recipeId });
const clearList = () => ({ type: CLEAR_LIST });

/**
 * THUNK CREATORS
 */

export const fetchGroceryListRecipes = () =>
  dispatch =>
    axios.get('/api/grocery-list/recipes')
      .then(res => res.data)
      .then((recipes) => {
        dispatch(getListRecipes(recipes));
      })
      .catch(err => console.log(err));

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

export const addItemsToPeapodCart = itemsArr =>
  dispatch =>
    axios.post('/api/peapod/', { items: itemsArr })
      .then(() => {
        const newTab = window.open('https://www.peapod.com', '_blank');
        newTab.focus();
        dispatch(deleteRecipesFromList());
      })
      .catch(err => console.error(err));

/**
 * REDUCER
 */
export default function (state = defaultRecipes, action) {
  switch (action.type) {
    case GET_LIST_RECIPES:
      return action.recipes;
    case REMOVE_RECIPE_FROM_LIST:
      return state.filter(recipe => recipe.id !== action.recipeId);
    case CLEAR_LIST:
      return [];
    default:
      return state;
  }
}
