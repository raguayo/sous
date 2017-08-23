import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Container,
  Grid,
  Header,
  Segment,
  Modal,
  Input,
  Form,
  Icon,
} from 'semantic-ui-react';
import { editUserName, editUserEmail, editUserPassword } from '../store';
import { SavedRecipes } from './';

const styles = {
  container: {
    padding: '5em 0em',
  },
  header: {
    fontFamily: 'Satisfy',
  },
};

function UserProfile({ user, handleNameUpdate, handleEmailUpdate, handlePasswordUpdate }) {
  // console.log('in UserProfile rendering function');
  return (
    <Container>
      <Grid
        textAlign="left"
        style={{ height: '100%' }}
        verticalAlign="left"
      >
        <Grid.Column style={{ width: '100%', padding: '5em 0em', margin: '0em 2em' }}>
          <Header as="h2" color="rgb(119, 169, 95)" verticalAlign="left">
            User Details
          </Header>
          <Form size="large">
            <Segment stacked>
              <Grid>
                <Grid.Column floated="left" width={13} verticalAlign="middle">
                  <Form.Input
                    name="name"
                    value={user.name}
                    readOnly
                    fluid
                    icon="user"
                    iconPosition="left"
                    placeholder="Name"
                  />
                </Grid.Column>
                <Grid.Column floated="right" width={3} textAlign="left">
                  <Modal trigger={<Icon name="edit" />} basic size="small" actions={[{ triggerClose: true }]} >
                    <Modal.Content>
                      <Form onSubmit={e => handleNameUpdate(e, user)}>
                        <Input
                          label="Edit Name:"
                          name="name"
                          action={{ color: 'teal', labelPosition: 'left', icon: 'add', content: 'Submit' }}
                        />
                      </Form>
                    </Modal.Content>
                  </Modal>
                </Grid.Column>
              </Grid>
              <Grid>
                <Grid.Column floated="left" width={13} verticalAlign="middle">
                  <Form.Input
                    name="email"
                    value={user.email}
                    readOnly
                    fluid
                    icon="mail"
                    iconPosition="left"
                    placeholder="Email"
                  />
                </Grid.Column>
                <Grid.Column floated="right" width={3} textAlign="left">
                  <Modal trigger={<Icon name="edit" />} basic size="small" actions={[{ triggerClose: true }]} >
                    <Modal.Content>
                      <Form onSubmit={e => handleEmailUpdate(e, user)}>
                        <Input
                          label="Edit Email:"
                          name="email"
                          action={{ color: 'teal', labelPosition: 'left', icon: 'add', content: 'Submit' }}
                        />
                      </Form>
                    </Modal.Content>
                  </Modal>
                </Grid.Column>
              </Grid>
              <Grid>
                <Grid.Column floated="left" width={13} verticalAlign="middle">
                  <Form.Input
                    name="password"
                    value="123456"
                    readOnly
                    fluid
                    icon="lock"
                    iconPosition="left"
                    placeholder="Password"
                    type="password"
                  />
                </Grid.Column>
                <Grid.Column floated="right" width={3} textAlign="left">
                  <Modal trigger={<Icon name="edit" />} basic size="small" actions={[{ triggerClose: true }]} >
                    <Modal.Content>
                      <Form onSubmit={e => handlePasswordUpdate(e, user)}>
                        <Input
                          label="Edit Password:"
                          name="password"
                          action={{ color: 'teal', labelPosition: 'left', icon: 'add', content: 'Submit' }}
                        />
                      </Form>
                    </Modal.Content>
                  </Modal>
                </Grid.Column>
              </Grid>

            </Segment>
          </Form>
        </Grid.Column>
      </Grid>

      <SavedRecipes />

    </Container>
  );
}

const mapState = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleNameUpdate(e, user) {
      const objUser = { id: user.id, name: e.target.name.value };
      dispatch(editUserName(objUser));
    },
    handleEmailUpdate(e, user) {
      const objUser = { id: user.id, email: e.target.email.value };
      dispatch(editUserEmail(objUser));
    },
    handlePasswordUpdate(e, user) {
      const objUser = { id: user.id, password: e.target.password.value };
      dispatch(editUserPassword(objUser));
    },
  };
};

export default connect(mapState, mapDispatch)(UserProfile);

UserProfile.propTypes = {
  user: PropTypes.object.isRequired,
  handleNameUpdate: PropTypes.func.isRequired,
  handleEmailUpdate: PropTypes.func.isRequired,
  handlePasswordUpdate: PropTypes.func.isRequired,
};
