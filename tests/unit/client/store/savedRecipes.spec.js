/* global describe beforeEach afterEach it */

import { expect } from 'chai';
import mockAxios from './mockAxios';
import configureMockStore from 'redux-mock-store';
import thunkMiddleware from 'redux-thunk';
import history from '../../../../client/history';
import {
  getSavedRecipes,
  removeSavedRecipe,
  fetchSavedRecipes,
  postNewRecipe,
} from '../../../../client/store';

const middlewares = [thunkMiddleware];
const mockStore = configureMockStore(middlewares);

describe('Saved Recipes:', () => {
  let store;

  const initialState = { savedRecipes: [] };

  describe('action creators', () => {
    beforeEach(() => {
      store = mockStore(initialState);
    });

    afterEach(() => {
      store.clearActions();
    });

    describe('getSavedRecipes', () => {
      it('returns an object with GET_SAVED_RECIPES type and recipes payload', () => {
        const fakeRecipes = [{
          id: 1,
          title: 'Sandwich',
          ingredients: [{ name: 'bread' }, { name: 'meat' }],
        }, {
          id: 2,
          title: 'Soup',
          ingredients: [{ name: 'broth' }, { name: 'vegetables' }],
        }];
        const action = getSavedRecipes(fakeRecipes);
        expect(action.type).to.be.equal('GET_SAVED_RECIPES');
        expect(action.recipes).to.be.deep.equal(fakeRecipes);
      });
    });
  });

  describe('thunk creators', () => {
    beforeEach(() => {
      store = mockStore(initialState);
    });

    afterEach(() => {
      store.clearActions();
    });

    describe('fetchSavedRecipes', () => {
      it('eventually dispatches the GET SAVED RECIPES action', () => {
        const fakeRecipes = [{
          id: 1,
          title: 'Sandwich',
          ingredients: [{ name: 'bread' }, { name: 'meat' }],
        }, {
          id: 2,
          title: 'Soup',
          ingredients: [{ name: 'broth' }, { name: 'vegetables' }],
        }];
        console.log('Fetch saved recipes', fetchSavedRecipes)
        mockAxios.onGet('/api/recipes').replyOnce(200, fakeRecipes);
        console.log('Store', store)
        return store.dispatch(fetchSavedRecipes()).then(() => {
          const actions = store.getActions();
          console.log('Actions', actions)
          expect(actions[0].type).to.be.equal('GET_SAVED_RECIPES');
          expect(actions[0].recipes).to.be.deep.equal(fakeRecipes);
        });
      });
    });
  });
});
