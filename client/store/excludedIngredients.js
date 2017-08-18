import axios from 'axios';

const GET_EXCLUDED_INGREDIENTS = 'GET_EXCLUDED_INGREDIENTS';
const REMOVE_EXCLUDED_INGREDIENT = 'REMOVE_EXCLUDED_INGREDIENT';
const CLEAR_LIST = 'CLEAR_LIST';
const ADD_EXCLUDED_INGREDIENT = 'ADD_EXCLUDED_INGREDIENT';

const defaultExcluded = [];

const getExcludedIngredients = excludedIds => ({ type: GET_EXCLUDED_INGREDIENTS, excludedIds });
const removeExcludedIngredient = ingredientId => ({ type: REMOVE_EXCLUDED_INGREDIENT, ingredientId });
const clearExcludedIngredients = () => ({ type: CLEAR_LIST });
const addExcludedIngredient = ingredientId => ({ type: ADD_EXCLUDED_INGREDIENT, ingredientId });

export const fetchExcludedIngredients = () => dispatch =>
  axios.get('/api/grocery-list/excluded')
    .then(res => res.data)
    .then((ingredients) => {
      const excludedIds = [];
      ingredients.forEach((ingredient) => {
        const { id } = ingredient;
        excludedIds.push(id);
      })
      dispatch(getExcludedIngredients(excludedIds));
    })
    .catch(err => console.log(err));

export const deleteExcludedIngredient = excludedId => dispatch =>
  axios.delete(`/api/grocery-list/excluded/${excludedId}`)
    .then(res => res.data)
    .then(() => {
      dispatch(removeExcludedIngredient(excludedId));
    })
    .catch(err => console.log(err));

export const deleteExcludedIngredients = () => dispatch =>
  axios.delete('/api/grocery-list/excluded')
    .then(res => res.data)
    .then(() => {
      dispatch(clearExcludedIngredients());
    })
    .catch(err => console.log(err));

export const postNewExcluded = ingredientId => dispatch =>
  axios.post('/api/grocery-list/excluded', { ingredientId })
    .then(res => res.data)
    .then((excludedId) => {
      dispatch(addExcludedIngredient(excludedId));
    })
    .catch(err => console.log(err));

export default function (state = defaultExcluded, action) {
  switch (action.type) {
    case GET_EXCLUDED_INGREDIENTS:
      return action.excludedIds;
    case REMOVE_EXCLUDED_INGREDIENT:
      return state.filter(ingredientId => ingredientId !== action.ingredientId);
    case CLEAR_LIST:
      return defaultExcluded;
    case ADD_EXCLUDED_INGREDIENT:
      return [action.ingredientId, ...state];
    default:
      return state;
  }
}
