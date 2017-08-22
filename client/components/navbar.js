import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../store/user';

function Navbar(props) {
  const user = props.currentUser;
  return (
    <div className="topnav">
      <Link to={'/recipes'} >Selected Recipes</Link>
      <Link to={'/grocery-list'}>Grocery List</Link>
      <Link to={'/recipes'} id="logo" >sous</Link>
      <Link to={'/history'}>My Recipes</Link>
      <Link to={'/home'}>{user.name || null}</Link>
      <Link to={'/'}onClick={props.logout}>Log out</Link>
    </div>
  );
}

const mapState = state => ({
  currentUser: state.user,
  isLoggedIn: !!state.user.id,
});

const mapDispatch = dispatch => ({
  logout: () => {
    dispatch(logout());
  },
});

Navbar.propTypes = {
  currentUser: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
};

export default connect(mapState, mapDispatch)(Navbar);

