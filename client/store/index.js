import { createStore, combineReducers, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import user from './user';
import groceryListRecipes from './groceryListRecipes';
import savedRecipes from './savedRecipes';
import excludedIngredients from './excludedIngredients';
import error from './error';
import suggestedRecipes from './suggestedRecipes';
import suggestedRecipesDirty from './suggestedRecipeDirty';

const reducer = combineReducers({ user, groceryListRecipes, savedRecipes, excludedIngredients, error, suggestedRecipes, suggestedRecipesDirty });

const middleware = applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }));

const store = createStore(reducer, middleware);

export default store;
export * from './error';
export * from './excludedIngredients';
export * from './groceryListRecipes';
export * from './savedRecipes';
export * from './suggestedRecipes';
export * from './suggestedRecipeDirty';
export * from './user';
