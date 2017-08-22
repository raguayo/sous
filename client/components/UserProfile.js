import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Container,
  Grid,
  Header,
  Segment,
  Checkbox,
  Button,
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
    <Container style={styles.container}>
      <div>
        <Grid
          textAlign="center"
          style={{ height: '100%' }}
          verticalAlign="middle"
        >
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as="h2" color="teal" textAlign="center">
              User Details
            </Header>
            <Form size="large">
              <Segment stacked>
                <Grid>
                  <Grid.Column floated="left" width={13} verticalAlign="middle">
                    <Form.Input
                      name="name"
                      value={user.name}
                      editable="false"
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
                            label="Name:"
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
                      editable="false"
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
                            label="Email:"
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
                      value={user.password}
                      editable="false"
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
                            label="Password:"
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
      </div>
      <div>
        <SavedRecipes />
      </div>
    </Container>
  );
}

const mapState = (state) => {
  // console.log('UserProfile - state.user: ', state.user);
  return {
    user: state.user,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleNameUpdate(e, user) {
      // console.log('handleNameUpdate = e.target.name.value: ', e.target.name.value);
      const objUser = { id: user.id, name: e.target.name.value };
      dispatch(editUserName(objUser));
    },
    handleEmailUpdate(e, user) {
      // console.log('handleNameUpdate = e.target.email.value: ', e.target.email.value);
      const objUser = { id: user.id, email: e.target.email.value };
      console.log('objUser: ', objUser);
      dispatch(editUserEmail(objUser));
    },
    handlePasswordUpdate(e, user) {
      // console.log('handleNameUpdate = e.target.password.value: ', e.target.password.value);
      const objUser = { id: user.id, password: e.target.password.value };
      dispatch(editUserPassword(objUser));
    },
  };
};

export default connect(mapState, mapDispatch)(UserProfile);

UserProfile.propTypes = {
  user: PropTypes.object.isRequired,
  // ingredients: PropTypes.array.isRequired,
  handleNameUpdate: PropTypes.func.isRequired,
  handleEmailUpdate: PropTypes.func.isRequired,
  handlePasswordUpdate: PropTypes.func.isRequired,
};
