import React from 'react';
import { Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { auth } from '../store';
import Peapod from '../../peapod/api';

// /**
//  * COMPONENT
//  */
const AuthForm = ({ name, displayName, handleSubmit, error }) => (
  <div className="login-form">
    <style>{`
      body > div,
      body > div > div,
      body > div > div > div.login-form {
        height: 100%;
      }
    `}</style>
    <Grid
      textAlign="center"
      style={{ height: '100%' }}
      verticalAlign="middle"
    >
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" color="teal" textAlign="center">
          <Image src="/Icon-Placeholder.png" />
          {
            displayName === 'Login' ? 'Log-in to your account' : 'Create an account!'
          }
        </Header>
        <Form size="large" onSubmit={handleSubmit} name={name}>
          <Segment stacked>
            {
              displayName === 'Sign Up' ?
                <Form.Input
                  name="username"
                  fluid
                  icon="id badge"
                  iconPosition="left"
                  placeholder="Name"
                /> : null
            }
            <Form.Input
              name="email"
              fluid
              icon="user"
              iconPosition="left"
              placeholder="E-mail address"
            />
            <Form.Input
              name="password"
              fluid
              icon="lock"
              iconPosition="left"
              placeholder="Password"
              type="password"
            />

            <Form.Button color="teal" fluid size="large">{displayName}</Form.Button>
            <Form.Button color="standard" size="large" as="a" href="/auth/google" >{displayName} with Google</Form.Button>
          </Segment>
        </Form>
        {
          error && error.response && <Message error>{error.response.data}</Message>
        }
        {
          displayName === 'Login' ?
            <Message>
              New to us? <Link to="/signup">Sign Up</Link>
            </Message> :
            <Message>
              Already have an account? <Link to="/login">Login</Link>
            </Message>
        }
      </Grid.Column>
    </Grid>
  </div>
)


/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = (state) => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error,
  }
}

const mapSignup = (state) => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error,
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleSubmit(evt) {
      evt.preventDefault();
      const formName = evt.target.name;
      const email = evt.target.email.value;
      const password = evt.target.password.value;
      if (evt.target.username) {
        const username = evt.target.username.value;
        dispatch(auth(email, password, formName, username));
      } else {
        dispatch(auth(email, password, formName));
      }
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm);
export const Signup = connect(mapSignup, mapDispatch)(AuthForm);

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object,
}
