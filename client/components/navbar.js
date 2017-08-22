import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../store/user';

const styles = {
  logo: {
    fontFamily: 'Oleo Script Swash Caps',
    color: '#77a95f',
    fontSize: '2rem',
    margin: '0 1.75rem',
    fontWeight: '200',
    paddingBottom: '0.25rem',
  },
};

function Navbar(props) {
  const user = props.currentUser;
  return (
    <div>
      <div className="topnav" id="myTopnav">
        <Link to={'/recipes'} >Recipes</Link>
        <Link to={'/grocery-list'}>Grocery List</Link>
        <Link to={'/recipes'} style={styles.logo}>sous</Link>
        <Link to={'/user-profile'}>Profile</Link>
        <Link to={'/'}onClick={props.logout}>Log out</Link>
      </div>
      <div style={styles.logo}>
        {user.name ? `Welcome ${user.name}` : null}
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
  currentUser: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
};

export default connect(mapState, mapDispatch)(Navbar);
