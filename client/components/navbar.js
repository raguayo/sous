import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Menu } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { logout } from '../store/user';

function Navbar(props) {
  const user = props.currentUser
  return (
    <Menu fixed="top" size="large">
      <Container>
        <Menu.Item as='a'>Logo</Menu.Item>
        <Menu.Item as='a' active>List</Menu.Item>
        <Menu.Item as='a'>Grocery List</Menu.Item>
        <Menu.Item as='a'>Recipe History</Menu.Item>
        <Menu.Item as='a'>{user.name}</Menu.Item>
        <Menu.Menu position='right'>
          <Menu.Item className='item'>
            <Button as={Link} to={'/'}onClick={props.logout}>Log out</Button>
          </Menu.Item>
        </Menu.Menu>
      </Container>
    </Menu>
  );
}

const mapState = state => ({
  currentUser: state.user,
});

const mapDispatch = dispatch => ({
  logout: () => {
    dispatch(logout());
  },
});

export default connect(mapState, mapDispatch)(Navbar);
