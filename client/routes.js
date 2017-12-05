import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Router } from 'react-router';
import { Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import history from './history';
import { Main, Login, Signup, CurrentRecipes, Splash, SavedRecipes, GroceryList, UserProfile } from './components';
import { me, fetchGroceryListRecipes, fetchSavedRecipes, fetchExcludedIngredients } from './store';

class Routes extends Component {
  componentDidMount() {
    this.props.loadUser();
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
    isLoggedIn: !!state.user.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadUser() {
      dispatch(me());
    },
  };
};

export default connect(mapState, mapDispatch)(Routes);

Routes.propTypes = {
  loadUser: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
};
