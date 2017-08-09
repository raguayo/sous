import { createStore, combineReducers, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import user from './user';
import prevRecipes from './prevRecipes';

const reducer = combineReducers({ user, prevRecipes });
const middleware = applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }));
const store = createStore(reducer, middleware);

export default store;
export * from './user';
export * from './prevRecipes';
