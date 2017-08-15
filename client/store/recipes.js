import axios from 'axios';
import history from '../history';

/**
 * ACTION TYPES
 */
const GET_RECIPES = 'GET_RECIPES';
const REMOVE_RECIPE_FROM_HISTORY = 'REMOVE_RECIPE_FROM_HISTORY';
const ADD_NEW_RECIPE = 'ADD_NEW_RECIPE';
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
const getRecipes = recipes => ({ type: GET_RECIPES, recipes });
const removeRecipeFromHistory = recipeId => ({ type: REMOVE_RECIPE_FROM_HISTORY, recipeId });
const addRecipe = newRecipe => ({ type: ADD_NEW_RECIPE, newRecipe });
const removeRecipeFromList = recipeId => ({ type: REMOVE_RECIPE_FROM_LIST, recipeId });
const clearList = () => ({ type: CLEAR_LIST });
const updateRecipesTotal = updatedRecipe => ({ type: UPDATE_RECIPES_TOTAL, updatedRecipe });

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

export const deleteRecipeFromHistory = recipeId =>
  dispatch =>
    axios.delete(`/api/recipes/${recipeId}`)
      .then(res => res.data)
      .then(() => {
        dispatch(removeRecipeFromHistory(recipeId));
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

export const updateRecipeQuantity = (recipeId, quantity) =>
  dispatch =>
    axios.put(`/api/grocery-list/recipes/${recipeId}`, quantity)
      .then(res => res.data)
      .then((updatedRecipe) => {
        dispatch(updateRecipesTotal(updatedRecipe));
      })
      .then(err => console.error(err));


/**
 * REDUCER
 */
export default function (state = defaultRecipes, action) {
  switch (action.type) {
    case GET_RECIPES:
      return action.recipes;
    case REMOVE_RECIPE_FROM_HISTORY:
      return state.filter(recipe => recipe.id !== action.recipeId);
    case ADD_NEW_RECIPE:
      return [action.newRecipe, ...state];
    case REMOVE_RECIPE_FROM_LIST:
      return state.map((recipe) => {
        if (recipe.id === action.recipeId) recipe.inGroceryList = false;
        return recipe;
      });
    case UPDATE_RECIPES_TOTAL:
      return state.map((recipe) => {
        if (recipe.id === action.updatedRecipe.id) {
          recipe.quantity = action.updatedRecipe.quantity;
        }
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
