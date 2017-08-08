
import 'babel-polyfill'; // for redux-saga
import React from 'react';
import ReactDOM from 'react-dom';
import {
  Switch,
  Route,
  BrowserRouter,
  Link,
} from 'react-router-dom';

import {
  createStore,
  applyMiddleware,
  compose
} from 'redux';

import reducer from './reducer';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas';
// components
import Layout from './components/layout';
import { HomeContainer } from './components/home';
import { DetailContainer } from './components/detail';
import { AddContainer } from './components/add';
// app css
import '../public/css/style.css';

// Filestack API requires to set a key
filepicker.setKey("A3P8Lop2hT8KKQ1PiX84Hz");

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  reducer,
  compose(
    applyMiddleware(sagaMiddleware),
    window.devToolsExtension ? window.devToolsExtension() : f => f // connect to redux devtools
  )
);
sagaMiddleware.run(rootSaga);


// add provider as first component and connect the store to it
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <nav className="navbar navbar-white navbar-fixed-top">
          <div className="container p-y-1">
            <div className="navbar-header">
              <button
                type="button"
                className="navbar-toggle collapsed"
                data-toggle="collapse"
                data-target="#navbar"
                aria-expanded="false"
                aria-controls="navbar"
              >
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar" />
                <span className="icon-bar" />
                <span className="icon-bar" />
              </button>
              <p className="navbar-brand title"><Link to="/">Photostack</Link></p>
            </div>
            <div id="navbar" className="collapse navbar-collapse">
              <ul className="nav navbar-nav navbar-right">
                <li><Link to="/add">Upload</Link></li>
                <li><a href="/redux-saga.html" target="_blank">Blog</a></li>
              </ul>
            </div>
          </div>
        </nav>
        <div className="container m-t-3">
          <Switch>
            <Route exact path="/" component={HomeContainer} />
            <Route exact path="/detail/:id" component={DetailContainer} />
            <Route exact path="/add" component={AddContainer} />
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  </Provider>,
  document.getElementById('app')
);
