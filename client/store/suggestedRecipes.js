import axios from 'axios';
import { addError } from './error';

/**
 * ACTION TYPES
 */
const ADD_SUGGESTED_RECIPES = 'ADD_SUGGESTED_RECIPES';
const REMOVE_SUGGESTED_RECIPES = 'REMOVE_SUGGESTED_RECIPES';

/**
 * INITIAL STATE
 */
const defaultSuggestedRecipes = [];

/**
 * ACTION CREATORS
 */
export const addSuggestedRecipes = suggestedRecipes => ({ type: ADD_SUGGESTED_RECIPES, suggestedRecipes });
export const removeSuggestedRecipes = () => ({ type: REMOVE_SUGGESTED_RECIPES });

/**
 * THUNK CREATORS
 */
export const fetchRecipeSuggestions = () =>
  dispatch =>
    axios.get('/api/grocery-list/suggestions')
    .then(res => res.data)
    .then(suggRecipes => dispatch(addSuggestedRecipes(suggRecipes)))
    .catch(addError);

/**
 * REDUCER
 */
export default function (state = defaultSuggestedRecipes, action) {
  switch (action.type) {
    case ADD_SUGGESTED_RECIPES:
      return action.suggestedRecipes;
    case REMOVE_SUGGESTED_RECIPES:
      return [];
    default:
      return state;
  }
}
