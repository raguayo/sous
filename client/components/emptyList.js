import React from 'react';
import { Segment } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

function EmptyList() {
  return (
    <Segment style={styles.block}>
      <p style={styles.text}>Your list is currently empty, </p>
      <p style={styles.text}>  why not add a recipe from <Link to={'./history'} style={styles.href}>your recipes</Link> </p>
      <p style={styles.text}> or upload a recipe using our CHROME EXTENSION LINK!</p>
    </Segment>
  );
}

const styles = {
  text: {
    color: '#84643B',
    fontSize: '1.2rem',
  },
  href: {
    color: '#77a95f',
  },
  block: {
    width: '75%',
    margin: 'auto',
  }
};

export default connect(null, null)(EmptyList);
