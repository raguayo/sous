import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Container, Grid, Header, Segment, Modal, Input, Form, Icon } from 'semantic-ui-react';
import { editUserName, editUserEmail, editUserPassword } from '../store';
import { SavedRecipes } from './';

const styles = {
  container: {
    padding: '5em 0em',
  },
  color: {
    color: '#84643B',
  },
  header: {
    maxWidth: '450',
    color: '#84643B',
    fontFamily: 'Oleo Script Swash Caps',
    fontSize: '2.5rem',
  },
  column: {
    width: '100%',
    padding: '5em 0em 0em 0em',
    margin: '0em 2em',
  },
};

class UserProfile extends Component {
  constructor() {
    super();
    this.state = {
      nameModalOpen: false,
      emailModalOpen: false,
      passwordModalOpen: false,
    };
  }

  handleNameModalClose = () => this.setState({ nameModalOpen: false });
  handleNameModalOpen = () => this.setState({ nameModalOpen: true });
  handleEmailModalClose = () => this.setState({ emailModalOpen: false });
  handleEmailModalOpen = () => this.setState({ emailModalOpen: true });
  handlePasswordModalClose = () => this.setState({ passwordModalOpen: false });
  handlePasswordModalOpen = () => this.setState({ passwordModalOpen: true });

  render() {
    const { user, handleNameUpdate, handleEmailUpdate, handlePasswordUpdate } = this.props;
    return (
      <Container>
        <Grid
          textAlign="left"
          style={{ height: '100%' }}
          verticalAlign="left"
        >
          <Grid.Column style={styles.column}>
            <Header as="h2" style={styles.header} verticalAlign="left">
              User Details
            </Header>
            <Form size="large" style={styles.color}>
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
                    <Modal
                      trigger={<Icon onClick={this.handleNameModalOpen} name="edit" />}
                      open={this.state.nameModalOpen}
                      onClose={this.handleNameModalClose}
                      basic size="small"
                    >
                      <Modal.Content>
                        <Form
                          size="small"
                          onSubmit={e => handleNameUpdate(e, user, this.handleNameModalClose)}
                        >
                          <Input
                            label="Edit Name:"
                            name="name"
                            action={{ style: { backgroundColor: '#77a95f', color: 'white' }, labelPosition: 'left', icon: 'add', content: 'Submit' }}
                          />
                        </Form>
                      </Modal.Content>
                    </Modal>
                  </Grid.Column>
                </Grid>
                <Grid>
                  <Grid.Column floated="left" width={13} verticalAlign="middle">
                    <Input
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
                    <Modal
                      trigger={<Icon onClick={this.handleEmailModalOpen} name="edit" />}
                      open={this.state.emailModalOpen}
                      onClose={this.handleEmailModalClose}
                      basic size="small"
                    >
                      <Modal.Content>
                        <Form
                          size="small"
                          onSubmit={e => handleEmailUpdate(e, user, this.handleEmailModalClose)}
                        >
                          <Input
                            label="Edit Email:"
                            name="email"
                            action={{ style: { backgroundColor: '#77a95f', color: 'white' }, labelPosition: 'left', icon: 'add', content: 'Submit' }}
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
                    <Modal
                      trigger={<Icon onClick={this.handlePasswordModalOpen} name="edit" />}
                      open={this.state.passwordModalOpen}
                      onClose={this.handlePasswordModalClose}
                      basic size="small"
                    >
                      <Modal.Content>
                        <Form
                          onSubmit={e => handlePasswordUpdate(e, user, this.handlePasswordModalClose)}
                          size="small"
                        >
                          <Input
                            label="Edit Password:"
                            name="password"
                            action={{ style: { backgroundColor: '#77a95f', color: 'white' }, labelPosition: 'left', icon: 'add', content: 'Submit' }}
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
}

const mapState = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleNameUpdate(e, user, handleNameModalClose) {
      const objUser = { id: user.id, name: e.target.name.value };
      dispatch(editUserName(objUser));
      handleNameModalClose();
    },
    handleEmailUpdate(e, user, handleEmailModalClose) {
      const objUser = { id: user.id, email: e.target.email.value };
      dispatch(editUserEmail(objUser));
      handleEmailModalClose();
    },
    handlePasswordUpdate(e, user, handlePasswordModalClose) {
      const objUser = { id: user.id, password: e.target.password.value };
      dispatch(editUserPassword(objUser));
      handlePasswordModalClose();
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
