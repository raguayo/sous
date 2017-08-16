import axios from 'axios';

const GET_EXCLUDED_INGREDIENTS = 'GET_EXCLUDED_INGREDIENTS';
const REMOVE_EXCLUDED_INGREDIENT = 'REMOVE_EXCLUDED_INGREDIENT';
const CLEAR_LIST = 'CLEAR_LIST';
const ADD_EXCLUDED_INGREDIENT = 'ADD_EXCLUDED_INGREDIENT';

const defaultExcluded = [];

const getExcludedIngredients = ingredients => ({ type: GET_EXCLUDED_INGREDIENTS, ingredients });
const removeExcludedIngredient = ingredientId => ({ type: REMOVE_EXCLUDED_INGREDIENT, ingredientId });
const clearList = () => ({ type: CLEAR_LIST });
const addExcludedIngredient = ingredient => ({ type: ADD_EXCLUDED_INGREDIENT, ingredient });

export const fetchExcludedIngredients = () => dispatch =>
  axios.get('/api/grocery-list/excluded')
    .then(res => res.data)
    .then((ingredients) => {
      const excluded = [];
      ingredients.forEach((ingredient) => {
        const { id, name } = ingredient;
        excluded.push({ id, name });
      })
      dispatch(getExcludedIngredients(excluded));
    })
    .catch(err => console.log(err));

export const deleteExcludedIngredient = excludedId => dispatch =>
  axios.delete(`/api/grocery-list/excluded${excludedId}`)
    .then(res => res.data)
    .then(() => {
      dispatch(removeExcludedIngredient(excludedId));
    })
    .catch(err => console.log(err));

export const deleteExcludedIngredients = () => dispatch =>
  axios.delete('/api/grocery-list/excluded')
    .then(res => res.data)
    .then(() => {
      dispatch(clearList());
    })
    .catch(err => console.err(err));

export const postNewExcluded = ingredient => dispatch =>
  axios.post('/api/grocery-list/excluded', ingredient)
    .then(res => res.data)
    .then((excluded) => {
      dispatch(addExcludedIngredient(excluded));
    })
    .catch(err => console.log(err));

export default function (state = defaultExcluded, action) {
  switch (action.type) {
    case GET_EXCLUDED_INGREDIENTS:
      return action.ingredientIds;
    case REMOVE_EXCLUDED_INGREDIENT:
      return state.filter(ingredientId => ingredientId !== action.ingredientId);
    case CLEAR_LIST:
      return defaultExcluded;
    case ADD_EXCLUDED_INGREDIENT:
      return [action.excluded, ...state];
    default:
      return state;
  }
}
