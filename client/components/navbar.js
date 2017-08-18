import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Button, Container, Menu } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { logout } from '../store/user';

function Navbar(props) {
  const user = props.currentUser;
  return (
    <Menu fixed="top" size="large">
      <Container>
        <Menu.Item as={Link} to={'/recipes'}>Logo</Menu.Item>
        <Menu.Item as={Link} to={'/recipes'} >Selected Recipes</Menu.Item>
        <Menu.Item as={Link} to={'/grocery-list'}>Grocery List</Menu.Item>
        <Menu.Item as={Link} to={'/history'}>My Recipes</Menu.Item>
        <Menu.Item as={Link} to={'/home'}>{user.name}</Menu.Item>
        <Menu.Menu position="right">
          <Menu.Item className="item">
            <Button as={Link} to={'/'}onClick={props.logout}>Log out</Button>
          </Menu.Item>
        </Menu.Menu>
      </Container>
    </Menu>
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
