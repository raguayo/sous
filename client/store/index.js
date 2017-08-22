import { createStore, combineReducers, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import user from './user';
import groceryListRecipes from './groceryListRecipes';
import savedRecipes from './savedRecipes';
// import groceryList from './groceryList';
import excludedIngredients from './excludedIngredients';
import error from './error';
import suggestedRecipes from './suggestedRecipes';

const reducer = combineReducers({ user, groceryListRecipes, savedRecipes, excludedIngredients, error, suggestedRecipes });

const middleware = applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }));

const store = createStore(reducer, middleware);

export default store;
export * from './user';
export * from './savedRecipes';
export * from './groceryListRecipes';
export * from './groceryList';
export * from './excludedIngredients';
export * from './error';
export * from './suggestedRecipes';
