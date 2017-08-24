import React, { Component } from 'react';
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
  color: {
    color: '#84643B'
  },
  header: {
    maxWidth: '450',
    color: '#84643B',
    fontFamily: 'Oleo Script Swash Caps',
    fontSize: '2.5rem',
  },
};

class UserProfile extends Component {
  constructor() {
    super();
    this.state = {
      modalOpen: false,
    };
  }

  handleClose = () => this.setState({ modalOpen: false });
  handleOpen = () => this.setState({ modalOpen: true });

  render() {
    const { user, handleNameUpdate, handleEmailUpdate, handlePasswordUpdate } = this.props;
    return (
      <Container>
        <Grid
          textAlign="left"
          style={{ height: '100%' }}
          verticalAlign="left"
        >
          <Grid.Column style={{ width: '100%', padding: '5em 0em 0em 0em', margin: '0em 2em' }}>
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
                      trigger={<Icon onClick={this.handleOpen} name="edit" />}
                      open={this.state.modalOpen}
                      onClose={this.handleClose}
                      basic size="small"
                    >
                      <Modal.Content>
                        <Form onSubmit={e => handleNameUpdate(e, user)}>
                          <Input
                            label="Edit Name:"
                            name="name"
                            onClick={this.handleClose}
                            action={{ color: 'gray', labelPosition: 'left', icon: 'add', content: 'Submit' }}
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
                    <Modal
                      trigger={<Icon onClick={this.handleOpen} name="edit" />}
                      open={this.state.modalOpen}
                      onClose={this.handleClose}
                      basic size="small"
                    >
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
                    {/* <Modal
                      trigger={<Icon onClick={this.handleOpen} name="edit" />}
                      open={this.state.modalOpen}
                      onClose={this.handleClose}
                      basic size="small"
                    >
                      <Modal.Content>
                        <Form onSubmit={e => handlePasswordUpdate(e, user)}>
                          <Input
                            label="Edit Password:"
                            name="password"
                            action={{ color: 'teal', labelPosition: 'left', icon: 'add', content: 'Submit' }}
                          />

                        </Form>
                      </Modal.Content>
                    </Modal> */}
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
    modalOpen: false,
  };
};

const mapDispatch = (dispatch, ownProps) => {
  return {
    handleNameUpdate(e, user) {
      // console.log('ownProps: ', ownProps);
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
