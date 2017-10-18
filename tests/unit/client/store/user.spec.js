/* global describe beforeEach afterEach it */

import { expect } from 'chai';
import configureMockStore from 'redux-mock-store';
import thunkMiddleware from 'redux-thunk';
import history from '../../../../client/history';
import mockAxios from '../../../mockAdapter';
import { me, logout, getUser, removeUser } from '../../../../client/store';

const middlewares = [thunkMiddleware];
const mockStore = configureMockStore(middlewares);

describe('User:', () => {
  let store;

  const initialState = { user: {} };

  describe('action creators', () => {
    beforeEach(() => {
      store = mockStore(initialState);
    });

    afterEach(() => {
      store.clearActions();
    });

    describe('getUser', () => {
      it('returns an object with GET_USER type and user payload', () => {
        const fakeUser = { email: 'Cody' };
        const action = getUser(fakeUser);
        expect(action.type).to.be.equal('GET_USER');
        expect(action.user).to.be.deep.equal(fakeUser);
      });
    });

    describe('removeUser', () => {
      it('returns an object with REMOVE_USER type and no payload', () => {
        const action = removeUser();
        expect(action.type).to.be.equal('REMOVE_USER');
        expect(Object.keys(action).length).to.be.equal(1);
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

    describe('me', () => {
      it('eventually dispatches the GET USER action', () => {
        const fakeUser = { email: 'Cody' };
        mockAxios.onGet('/auth/me').replyOnce(200, fakeUser);
        return store.dispatch(me()).then(() => {
          const actions = store.getActions();
          expect(actions[0].type).to.be.equal('GET_USER');
          expect(actions[0].user).to.be.deep.equal(fakeUser);
        });
      });
    });

    describe('logout', () => {
      it('eventually dispatches the REMOVE_USER action', () => {
        mockAxios.onPost('/auth/logout').replyOnce(204);
        return store.dispatch(logout()).then(() => {
          const actions = store.getActions();
          expect(actions[0].type).to.be.equal('REMOVE_USER');
          expect(history.location.pathname).to.be.equal('/');
        });
      });

      it('eventually dispatches the ADD_ERROR action if receives an error', () => {
        mockAxios.onPost('/auth/logout').networkError();
        return store.dispatch(logout()).then(() => {
          const actions = store.getActions();
          expect(actions[0].type).to.be.equal('ADD_ERROR');
        });
      });
    });
  });
});
