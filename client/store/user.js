import axios from 'axios';
import history from '../history';
import { fetchGroceryListRecipes } from './groceryListRecipes';
import { fetchSavedRecipes } from './savedRecipes';
import { addError } from './error';

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER';
const REMOVE_USER = 'REMOVE_USER';

/**
 * INITIAL STATE
 */
const defaultUser = {};

/**
 * ACTION CREATORS
 */
const getUser = user => ({type: GET_USER, user})
const removeUser = () => ({type: REMOVE_USER})

/**
 * THUNK CREATORS
 */
export const me = () =>
  dispatch =>
    axios.get('/auth/me')
      .then(res =>
        dispatch(getUser(res.data || defaultUser)))
      .catch(addError)

export const auth = (email, password, method, username) =>
  dispatch =>
    axios.post(`/auth/${method}`, { email, password, username })
      .then(res => {
        dispatch(getUser(res.data));
        dispatch(fetchGroceryListRecipes());
        dispatch(fetchSavedRecipes());
        history.push('/recipes');
      })
      .catch(error =>
        dispatch(getUser({error})));

export const logout = () =>
  dispatch =>
    axios.post('/auth/logout')
      .then(res => {
        dispatch(removeUser())
        history.push('/')
      })
      .catch(addError);

/**
 * REDUCER
 */
export default function (state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user;
    case REMOVE_USER:
      return defaultUser;
    default:
      return state;
  }
}
