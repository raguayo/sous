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
              Sign In
              </Button>
          </Container>
        </Segment>

        <Segment style={{ padding: '8em 0em' }} vertical>
          <Grid container stackable verticalAlign='middle'>
            <Grid.Row>
              <Grid.Column width={8}>
                <Header as="h3" style={{ fontSize: '2em' }}>YUM YUM</Header>
                <p style={{ fontSize: '1.33em' }}>
                  Get all your food in one place!
                </p>
              </Grid.Column>
              <Grid.Column floated="right" width={6}>
                <Image
                  bordered
                  rounded
                  size="large"
                  src="/assets/images/wireframe/white-image.png"
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
        <Segment style={{ padding: '0em' }} vertical>
          <Grid celled='internally' columns='equal' stackable>
            <Grid.Row textAlign='center'>
              <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
                <Header as='h3' style={{ fontSize: '2em' }}>"What a Company"</Header>
                <p style={{ fontSize: '1.33em' }}>That is what they all say about us</p>
              </Grid.Column>
              <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
                <Header as='h3' style={{ fontSize: '2em' }}>"I like Eating!"</Header>
                <p style={{ fontSize: '1.33em' }}>
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
