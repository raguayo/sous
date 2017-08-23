import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../store/user';

const active = (location, pathName) => {
  if (location.pathname === pathName) {
    return 'active';
  }
  return '';
};

function Navbar(props) {
  return (
    <div>
      <div className="topnav" id="myTopnav">
        <Link to={'/recipes'} className={active(props.location, '/recipes')}>Recipes</Link>
        <Link to={'/grocery-list'} className={active(props.location, '/grocery-list')}>Grocery List</Link>
        <Link to={'/recipes'} id="logo">sous</Link>
        <Link to={'/user-profile'} className={active(props.location, '/user-profile')}>Profile</Link>
        <Link to={'/'} onClick={props.logout}>Log out</Link>
      </div>
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
  logout: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
};

export default connect(mapState, mapDispatch)(Navbar);
