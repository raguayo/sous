import React, { Component } from 'react';
import {
  Button,
  Container,
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
              <Button as={Link} to="/login" primary size="large" style={styles.button}>
                Log In
                </Button>
              <Button primary size="large" as={Link} to="/signup" style={styles.button}>
                Sign Up
                </Button>
            </div>
            <a href="#middle">Learn More</a>
          </div>
        </div>


        <Segment style={styles.topSegment} vertical id="middle">
          <Grid container stackable verticalAlign='middle'>
            <Grid.Row>
              <Grid.Column width={8}>
                <Header as="h3" style={styles.header}>YUM YUM</Header>
                <p style={styles.paragraph}>
                  Get all your food in one place!
                </p>
              </Grid.Column>
              <Grid.Column floated="right" width={6}>
                <Image
                  bordered
                  shape='rounded'
                  size="large"
                  src="/assets/images/wireframe/white-image.png"
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
        <Segment style={styles.bottomSegement} vertical>
          <Grid celled='internally' columns='equal' stackable>
            <Grid.Row textAlign='center'>
              <Grid.Column style={styles.column}>
                <Header as='h3' style={styles.header}>"What a Company"</Header>
                <p style={styles.paragraph}>That is what they all say about us</p>
              </Grid.Column>
              <Grid.Column style={styles.column}>
                <Header as='h3' style={styles.header}>"I like Eating!"</Header>
                <p style={styles.paragraph}>
                  <Image avatar src='/assets/images/avatar/large/nan.jpg' />
                  <b>Nan</b> - some dude
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
  button: {
    backgroundColor: '#b28b68',
    border: 'none',
    borderRadius: '5px',
    padding: '0.5rem 1.5rem',
    fontSize: '1.2rem',
    color: 'white',
  },
  buttons: {
    marginBottom: '1rem',
  },
};
