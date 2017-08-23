/**
 * ACTION TYPES
 */
const DIRTY_SUGGESTED_RECIPES = 'DIRTY_SUGGESTED_RECIPES';

/**
 * INITIAL STATE
 */
const defaultDirty = false;

/**
 * ACTION CREATORS
 */
export const dirtySuggestedRecipes = () => ({ type: DIRTY_SUGGESTED_RECIPES });
/**
 * THUNK CREATORS
 */

/**
 * REDUCER
 */
export default function (state = defaultDirty, action) {
  switch (action.type) {
    case DIRTY_SUGGESTED_RECIPES:
      return true;
    default:
      return state;
  }
}
