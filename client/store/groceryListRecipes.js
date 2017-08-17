import axios from 'axios'
import history from 'history'

/**
 * ACTION TYPES
 */
const GET_LIST_RECIPES = 'GET_LIST_RECIPES';
const REMOVE_RECIPE_FROM_LIST = 'REMOVE_RECIPE_FROM_LIST';
const CLEAR_LIST = 'CLEAR_LIST';
const UPDATE_RECIPES_TOTAL = 'UPDATE_RECIPES_TOTAL';
/**
 * INITIAL STATE
 */
const defaultRecipes = [];

/**
 * ACTION CREATORS
 */
const getListRecipes = recipes => ({ type: GET_LIST_RECIPES, recipes });
export const removeRecipeFromList = recipeId => ({ type: REMOVE_RECIPE_FROM_LIST, recipeId });
const clearList = () => ({ type: CLEAR_LIST });
const updateRecipesTotal = (newQuantityObj, recipeId) => ({ type: UPDATE_RECIPES_TOTAL, newQuantityObj, recipeId });


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

export const updateRecipeQuantity = (recipeId, quantity) =>
  dispatch =>
    axios.put(`/api/grocery-list/recipes/${recipeId}`, { quantity })
      .then(res => res.data)
      .then((updatedQuantityObj) => {
        dispatch(updateRecipesTotal(updatedQuantityObj, recipeId));
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
    case UPDATE_RECIPES_TOTAL:
      return state.map((recipe) => {
        if (recipe.id === action.recipeId) {
          recipe.grocerylist = action.newQuantityObj;
        }
        return recipe;
      });

    case CLEAR_LIST:
      return [];
    default:
      return state;
  }
}
