import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Router } from 'react-router';
import { Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import history from './history';
import { Main, Login, Signup, CurrentRecipes, Splash, SavedRecipes, GroceryList, UserProfile } from './components';
import { me, fetchGroceryListRecipes, fetchSavedRecipes, fetchExcludedIngredients } from './store';

class Routes extends Component {
  componentWillMount() {
    this.props.loadInitialData();
  }

  render() {
    const { isLoggedIn } = this.props;

    return (
      <Router history={history}>
        <Main>
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
            {
              isLoggedIn &&
                <Switch>
                  <Route path="/recipes" component={CurrentRecipes} />
                  <Route path="/grocery-list" component={GroceryList} />
                  <Route path="/history" component={SavedRecipes} />
                  <Route path="/user-profile" component={UserProfile} />
                  <Route path="/" component={CurrentRecipes} />
                </Switch>
            }
            <Route path="/" component={Splash} />
          </Switch>
        </Main>
      </Router>
    )
  }
}

const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id,
  }
}

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(me());
      dispatch(fetchGroceryListRecipes());
      dispatch(fetchSavedRecipes());
      dispatch(fetchExcludedIngredients());
    },
  };
};

export default connect(mapState, mapDispatch)(Routes);

Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
};
