import React from 'react';
import { Button, Container, Menu } from 'semantic-ui-react';
import { connect } from 'react-redux';

function Navbar() {
  return (
    <Menu fixed='top' size='large'>
      <Container>
        <Menu.Item as='a'>Logo</Menu.Item>
        <Menu.Item as='a' active>List</Menu.Item>
        <Menu.Item as='a'>Grocery List</Menu.Item>
        <Menu.Item as='a'>Recipe History</Menu.Item>
        <Menu.Item as='a'>User</Menu.Item>
        <Menu.Menu position='right'>
          <Menu.Item className='item'>
            <Button as='a'>Log out</Button>
          </Menu.Item>
        </Menu.Menu>
      </Container>
    </Menu>
  );
}

export default connect(null, null)(Navbar);
