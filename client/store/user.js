import axios from 'axios';
import history from '../history';
import { fetchGroceryListRecipes } from './groceryListRecipes';
import { fetchSavedRecipes } from './savedRecipes';
import { addError } from './error';
import { fetchExcludedIngredients } from './excludedIngredients';

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER';
const REMOVE_USER = 'REMOVE_USER';
const UPDATE_USER_NAME = 'UPDATE_USER_NAME';
const UPDATE_USER_EMAIL = 'UPDATE_USER_EMAIL';
const UPDATE_USER_PASSWORD = 'UPDATE_USER_PASSWORD';

/**
 * INITIAL STATE
 */
const defaultUser = {};

/**
 * ACTION CREATORS
 */
export const getUser = user => ({ type: GET_USER, user });
export const removeUser = () => ({ type: REMOVE_USER });
const updateUserName = user => ({ type: UPDATE_USER_NAME, user });
const updateUserEmail = user => ({ type: UPDATE_USER_EMAIL, user });
const updateUserPassword = user => ({ type: UPDATE_USER_PASSWORD, user });

/**
 * THUNK CREATORS
 */
export const me = () =>
  dispatch =>
    axios.get('/auth/me')
      .then((res) => {
        dispatch(getUser(res.data || defaultUser));
        if (res.data) {
          dispatch(fetchGroceryListRecipes());
          dispatch(fetchSavedRecipes());
          dispatch(fetchExcludedIngredients());
        }
      })
      .catch(addError);

export const logout = () =>
  dispatch =>
    axios.post('/auth/logout')
      .then(() => {
        dispatch(removeUser());
        history.push('/');
      })
      .catch(error => dispatch(addError(error)));

export const auth = (email, password, method, username) =>
  dispatch =>
    axios.post(`/auth/${method}`, { email, password, username })
      .then((res) => {
        dispatch(getUser(res.data));
        dispatch(fetchGroceryListRecipes());
        dispatch(fetchSavedRecipes());
        dispatch(fetchExcludedIngredients());
        history.push('/recipes');
      })
      .catch(error =>
        dispatch(getUser({ error })));


export const editUserName = updatedUser =>
  dispatch =>
    axios.put(`/api/users/${updatedUser.id}`, { name: updatedUser.name })
      .then(res => res.data)
      .then((user) => {
        dispatch(updateUserName(user));
      })
      .catch(error => dispatch(addError(error)));

export const editUserEmail = updatedUser =>
  dispatch =>
    axios.put(`/api/users/${updatedUser.id}`, { email: updatedUser.email })
      .then(res => res.data)
      .then((user) => {
        dispatch(updateUserEmail(user));
      })
      .catch(error => dispatch(addError(error)));

export const editUserPassword = updatedUser =>
  dispatch =>
    axios.put(`/api/users/${updatedUser.id}`, { password: updatedUser.password })
      .then(res => res.data)
      .then((user) => {
        dispatch(updateUserPassword(user));
      })
      .catch(error => dispatch(addError(error)));

/**
 * REDUCER
 */
export default function (state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user;
    case REMOVE_USER:
      return defaultUser;
    case UPDATE_USER_NAME:
      return action.user;
    case UPDATE_USER_EMAIL:
      return action.user;
    case UPDATE_USER_PASSWORD:
      return action.user;
    default:
      return state;
  }
}
