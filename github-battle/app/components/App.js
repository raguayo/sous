import React from 'react';
import Popular from './Popular';
import Nav from './Nav';
import Home from './Home';
import Battle from './Battle';
import {BrowserRouter , Route, Switch} from 'react-router-dom';
 const Router = BrowserRouter;
// const Route = ReactRouter.Route;


// state
// lifecycle events(hooks)
// UI via render()
export default class App extends React.Component {
  render() {
    return (
      <Router>
        <div className="container">
          <Nav />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/battle' component={Battle} />
            <Route path='/popular' component={Popular} />
            <Route render={() => <p>Page Not Found!</p>} />
          </Switch>
        </div>
      </Router>
    );
  }
}
