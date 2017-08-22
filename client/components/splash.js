import React, { Component } from 'react';
import {
  Grid,
  Header,
  Image,
  Segment,
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';

export default class Splash extends Component {
  state = {}

  render() {
    return (
      <div>
        <div className="header-container">
          <div className="header-content slide-up-fade-in">
            <h1>meet sous,</h1>
            <h2>Your personal recipe manager.</h2>

            <div className="buttons" style={styles.buttons}>
              <Link to="/login" primary size="large" className="splashButton">
                Log In
                </Link>
              <Link to="/signup" primary size="large" className="splashButton">
                Sign Up
                </Link>
            </div>
            <a href="#middle" style={{ color: '#77a95f' }} >Learn More</a>
          </div>
        </div>


        <Segment style={styles.topSegment} vertical id="middle">
          <Grid container stackable verticalAlign="middle">
            <Grid.Row>
              <Grid.Column width={8}>
                <Header as="h3" style={styles.header}>Step 1:</Header>
                <p style={styles.paragraph}>
                  Find a recipe from any website.
                </p>
              </Grid.Column>
              <Grid.Column floated="right" width={6}>
                <Image
                  bordered
                  shape="rounded"
                  size="large"
                  src="/assets/images/wireframe/white-image.png"
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
        <Segment style={styles.bottomSegement} vertical>
          <Grid celled="internally" columns="equal" stackable>
            <Grid.Row textAlign="center">
              <Grid.Column style={styles.column}>
                <Header as="h3" style={styles.header}>Step 2:</Header>
                <p style={styles.paragraph}>Add to your list through our Chrome Extension "link Here" </p>
              </Grid.Column>
              <Grid.Column style={styles.column}>
                <Header as="h3" style={styles.header}>Step 3:</Header>
                <p style={styles.paragraph}>Shop!
                </p>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      </div>
    );
  }
}

let styles = {
  column: {
    paddingBottom: '5em',
    paddingTop: '5em',
  },
  bottomSegement: {
    padding: '0em',
  },
  header: {
    fontSize: '2em',
    color: '#946e4f',
  },
  paragraph: {
    fontSize: '1.33em',
  },
  topSegment: {
    padding: '8em 0em',
  },
  headText: {
    color: '#CC1100',
    fontFamily: 'Livory',
    fontSize: '6em',
    fontWeight: 'normal',
    marginBottom: 0,
    marginTop: '3em',
  },
  subText: {
    color: '#CC1100',
    fontFamily: 'sans-serif',
    fontSize: '3em',
    fontWeight: 'normal',
  },
  buttons: {
    marginBottom: '1rem',
  },
};
