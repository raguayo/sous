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
        <Segment
          inverted
          textAlign="center"
          style={styles.backgroundImage}
          vertical
        >

          <Container text>
            <Header
              as="h1"
              content="A la Cart"
              inverted
              style={styles.headText}
            />
            <Header
              as="h2"
              content="Sous for You!"
              inverted
              style={styles.subText}
            />
            <Button as={Link} to="/login" primary size="large" >
              Log In
              </Button>
            <Button primary size="large" as={Link} to="/signup">
              Sign Up
              </Button>
          </Container>
        </Segment>

        <Segment style={styles.topSegment} vertical>
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
  backgroundImage: {
    minHeight: 700,
    padding: '1em 0em',
    backgroundImage: "url('https://ak9.picdn.net/shutterstock/videos/4879691/thumb/1.jpg",
    backgroundSize: 'cover',
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
};
