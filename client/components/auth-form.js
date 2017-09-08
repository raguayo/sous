import React from 'react';
import { Form, Grid, Header, Message } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { auth } from '../store';

const styles = {
  logo: {
    fontFamily: 'Oleo Script Swash Caps',
    color: '#77a95f',
    fontSize: '3rem',
    margin: '0 3rem',
    fontWeight: '300',
    paddingBottom: '0.5rem',
  },
  header: {
    maxWidth: '450',
    color: '#84643B',
  },
  button: {
    width: '100%',
    marginLeft: '0px',
    marginTop: '10px',
  },
  textColor: {
    color: '#84643B',
  },
};

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
      <Grid.Column style={styles.header}>
        <Header as="h2" textAlign="center" style={styles.header}>
          <p style={styles.logo}>sous</p>
          {
            displayName === 'Login' ? 'Log-in to your account' : 'Create an account!'
          }
        </Header>
        <Form size="large" onSubmit={handleSubmit} name={name}>
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
          <Form.Button as="button" className="appButton" fluid size="large" style={styles.button}>{displayName}</Form.Button>
          <Form.Button size="large" as="a" href="/auth/google" >{displayName} with Google</Form.Button>
        </Form>
        {
          error && error.response && <Message error>{error.response.data}</Message>
        }
        {
          displayName === 'Login' ?
            <Message style={styles.textColor}>
              New to us? <Link to="/signup">Sign Up</Link>
            </Message> :
            <Message style={styles.textColor}>
              Already have an account? <Link to="/login">Login</Link>
            </Message>
        }
      </Grid.Column>
    </Grid>
  </div>
);

const mapLogin = (state) => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error,
  };
};

const mapSignup = (state) => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error,
  };
};

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
    },
  };
};

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
};
