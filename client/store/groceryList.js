import axios from 'axios';

/**
 * ACTION TYPES
 */
const GET_GROCERY_LIST = 'GET_GROCERY_LIST';
const REMOVE_FROM_LIST = 'REMOVE_FROM_LIST';

/**
 * ACTION CREATORS
 */

const getGroceryList = groceryList => ({
  type: GET_GROCERY_LIST, groceryList,
});
const removeFromList = ingredientId => ({
  type: REMOVE_FROM_LIST, ingredientId,
});

/**
 * THUNK CREATORS
 */

export const fetchGroceryList = () => (dispatch) => {
  axios.get('/api/grocery-list/ingredients')
    .then(res => res.data)
    .then((groceryList) => {
      dispatch(getGroceryList(groceryList));
    })
    .catch(err => console.log(err));
};

export const removeIngredientFromList = ingredientId => (dispatch) =>
  axios.delete(`/api/grocery-list/ingredients/${ingredientId}`)
    .then(res => res.data)
    .then(() => {
      dispatch(removeFromList(ingredientId))
    })
    .catch(err => console.log(err));

export const peapodGroceryList = () => dispatch =>
  true;

/**
 * REDUCER
 */

export default function (state = {}, action) {
  switch (action.type) {
    case GET_GROCERY_LIST:
      return action.groceryList;

    default:
      return state;
  }
}
