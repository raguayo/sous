import { createStore, combineReducers, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import user from './user';
import groceryListRecipes from './groceryListRecipes';
import savedRecipes from './savedRecipes';
import groceryList from './groceryList';


const reducer = combineReducers({ user, groceryListRecipes, savedRecipes, groceryList });

const middleware = applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }));

const store = createStore(reducer, middleware);

export default store;
export * from './user';
export * from './savedRecipes';
export * from './groceryListRecipes';
export * from './groceryList';

