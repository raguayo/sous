/**
 * ACTION TYPES
 */
const ADD_SUGGESTED_RECIPES = 'ADD_SUGGESTED_RECIPES';

/**
 * INITIAL STATE
 */
const defaultSuggestedRecipes = [];

/**
 * ACTION CREATORS
 */
export const addSuggestedRecipes = suggestedRecipes => ({ type: ADD_SUGGESTED_RECIPES, suggestedRecipes });
/**
 * THUNK CREATORS
 */

/**
 * REDUCER
 */
export default function (state = defaultSuggestedRecipes, action) {
  switch (action.type) {
    case ADD_SUGGESTED_RECIPES:
      return action.suggestedRecipes;
    default:
      return state;
  }
}
