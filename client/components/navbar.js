import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../store/user';

const styles = {
  logo: {
    fontFamily: 'Oleo Script Swash Caps',
    color: '#77a95f',
    fontSize: '3rem',
    margin: '0 3rem',
    fontWeight: '300',
    paddingBottom: '0.5rem',
  },
};

function Navbar(props) {
  const user = props.currentUser;
  return (
    <div className="topnav" id="myTopnav">
      <Link to={'/recipes'} >Recipes</Link>
      <Link to={'/grocery-list'}>Grocery List</Link>
      <Link to={'/recipes'} style={styles.logo}>sous</Link>
      <Link to={'/user-profile'}>Profile</Link>
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
