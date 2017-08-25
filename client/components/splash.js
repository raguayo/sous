import React from 'react';
import { Grid, Header, Image, Segment, List, Container } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

export default function Splash() {
  return (
    <div>
      <div className="header-container">
        <div className="header-content slide-up-fade-in">
          <h1 id='greeting'>meet sous,</h1>
          <h2>Your personal recipe assistant.</h2>

          <div className="buttons" style={styles.buttons}>
            <Link to="/login" primary size="large" className="splashButton">
              Log In
                </Link>
            <Link to="/signup" primary size="large" className="splashButton">
              Sign Up
                </Link>
          </div>
          <div>
            <a href="#middle" style={style.learnMore} >Learn More</a>
          </div>
        </div>
      </div>


      <Segment style={styles.topSegment} vertical id="middle">
        <Grid container stackable verticalAlign="middle">
          <Grid.Row>
            <Grid.Column width={5} floated='left'>
              <Header
                as='h2'
                image='https://image.flaticon.com/icons/svg/287/287000.svg'
                content='Flexible'
                style={styles.header}
              />
              <p style={styles.paragraph}>
                Save recipes from any website.
                </p>
            </Grid.Column>
            <Grid.Column width={6}>
              <Header
                as='h2'
                image='https://d30y9cdsu7xlg0.cloudfront.net/png/48259-200.png'
                content='Simple'
                style={styles.header}
              />
              <p style={styles.paragraph}>
                Combines all your recipes into a single shopping list.
                </p>
            </Grid.Column>
            <Grid.Column width={5} floated='right'>
              <Header
                as='h2'
                image='https://d30y9cdsu7xlg0.cloudfront.net/png/371306-200.png'
                content='Automatic'
                style={styles.header}
              />
              <p style={styles.paragraph}>
                Purchase your shopping list on Peapod with the touch of a button.
                </p>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
      <Container textAlign="center" style={styles.divider}>
        <hr style={{ float: "left" }} width="30%" />Here's How It Works<hr style={{ float: "right" }} width="30%" />
      </Container>
      <Segment style={styles.bottomSegement} vertical>
        <Grid celled="internally" columns="equal" stackable>
          <Grid.Row textAlign="center">
            <Grid.Column style={styles.column}>
              <Header
                as='h2'
                content='Create Your Shopping List'
                style={styles.header}
              />
              <Container textAlign='left' style={styles.container}>
                <List size="huge">
                  <List.Item>
                    <Image src="https://d30y9cdsu7xlg0.cloudfront.net/png/82540-200.png" size='mini' />
                    <List.Content verticalAlign='center'>
                      Find a recipe on your favorite site or food blog
                      </List.Content>
                  </List.Item>
                  <List.Item>
                    <Image src="https://maxcdn.icons8.com/Share/icon/win10/User_Interface//add1600.png" size='mini' />
                    <List.Content verticalAlign='center'>
                      Click the chrome extension icon to add it to your profile
                      </List.Content>
                  </List.Item>
                  <List.Item>
                    <Image src="https://d30y9cdsu7xlg0.cloudfront.net/png/166411-200.png" size='mini' />
                    <List.Content verticalAlign='center'>
                      Pick which recipes you want to add to your shopping list
                      </List.Content>
                  </List.Item>
                </List>
                <p style={styles.paragraph}>
                  That's it! Sous will take care of the rest
                  </p>
              </Container>
            </Grid.Column>
            <Grid.Column style={styles.column}>
              <Header
                as='h2'
                content='Get Your Ingredients'
                style={styles.header}
              />
              <Container textAlign='left' style={styles.container}>
                <List size="huge">
                  <List.Item>
                    <Image src="https://maxcdn.icons8.com/Share/icon/dotty/Shopping//shopping_cart1600.png" size='mini' />
                    <List.Content verticalAlign='center'>
                      Sous will create a Peapod cart for you with the click of a button
                      </List.Content>
                  </List.Item>
                  <List.Item>
                    <Image src="https://d30y9cdsu7xlg0.cloudfront.net/png/371306-200.png" size='mini' />
                    <List.Content verticalAlign='center'>
                      Prefer to browse? Sous will display your list in a collapsible sidebar
                      </List.Content>
                  </List.Item>
                  <List.Item>
                    <Image src="https://image.freepik.com/free-icon/hand-with-a-mobile-phone_318-38051.jpg" size='mini' />
                    <List.Content verticalAlign='center'>
                      Headed to the store? Sous will text you your shopping list
                      </List.Content>
                  </List.Item>
                </List>
                <p style={styles.paragraph}>
                  It's completely up to you!
                  </p>
              </Container>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    </div>
  );
}

let styles = {
  divider: {
    width: '100%',
    textAlign: 'center',
    paddingBottom: '2em',
    fontSize: '2em',
    color: '#946e4f',
  },
  container: {
    padding: '0 5em',
  },
  column: {
    paddingBottom: '5em',
  },
  bottomSegement: {
    padding: '0em',
  },
  header: {
    fontSize: '2em',
    color: '#946e4f',
    fontFamily: 'Roboto Slab',
  },
  paragraph: {
    fontSize: '1.33em',
    textAlign: 'center',
  },
  topSegment: {
    padding: '5em 0em',
    borderBottom: 'none',
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
  learnMore: {
    color: '#77a95f',
    position: 'relative',
    right: '7px',
  },
};
