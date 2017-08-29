import React from 'react';
import { Segment } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

function EmptyList() {
  return (
    <div style={styles.list}>
      <Segment style={styles.block}>
        <p style={styles.text}>Your list is currently empty, </p>
        <p style={styles.text}>  why not add a recipe from <Link to={'./history'} style={styles.href}>your recipes</Link> </p>
        <p style={styles.text}> or upload a recipe using our <a href="https://chrome.google.com/webstore/detail/sous/ldjfidlbdfdheleohdigdmknpmgbcjgd/related?hl=en-US&gl=US" target="_blank" rel="noopener noreferrer" style={styles.href}>chrome extension!</a></p>
      </Segment>
    </div>
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
  },
  list: {
    marginTop: '1.5em',
  }
};

export default connect(null, null)(EmptyList);
