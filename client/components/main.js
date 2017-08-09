import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { withRouter } from 'react-router-dom';
import Footer from './footer';
import Navbar from './navbar';

/**
 * COMPONENT
 *  The Main component is our 'picture frame' - it displays the navbar and anything
 *  else common to our entire app. The 'picture' inside the frame is the space
 *  rendered out by the component's `children`.
 */
const Main = (props) => {

  const { children, isLoggedIn } = props;

  return (
    <div>
      {isLoggedIn ?
        <Navbar /> : null }
      {children}
      <Footer />
    </div>
  );
};

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.user.id,
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, null)(Main));

/**
 * PROP TYPES
 */
Main.propTypes = {
  children: PropTypes.object,
  isLoggedIn: PropTypes.bool.isRequired,
};
