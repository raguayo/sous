import React from 'react';
import { Segment, Container, Grid, Header, Image } from 'semantic-ui-react';

const styles = {
  footer: {
    backgroundColor: '#84643B',
    verticalAlign: 'center',
  },
  logo: {
    fontFamily: 'Oleo Script Swash Caps',
    color: '#77a95f',
    fontSize: '3rem',
    margin: '0 3rem',
    fontWeight: '300',
    paddingBottom: '2.5rem',
  },
};

const Footer = () => (
  <Segment inverted vertical style={styles.footer}>
      <Grid inverted stackable>
        <Grid.Row>
          <Grid.Column width={3} style={{ paddingTop: '1.25rem' }}>
            <a href="https://github.com/raguayo/raww">
              <Image src="/images/GitHub-Logo.png" size="small" centered />
            </a>
          </Grid.Column>
          <Grid.Column width={4}>
            <a href="https://www.linkedin.com/in/william-raedy-13a161147/">
              <Image src="/images/WillyRaedy.jpeg" size="tiny" shape="circular" centered />
              <Header inverted as="h4" content="Willy Raedy" textAlign="center" />
            </a>
          </Grid.Column>
          <Grid.Column width={4}>
            <a href="https://www.linkedin.com/in/alexander-j-stauter-7239ba93/">
              <Image src="/images/AlexStauter.jpeg" size="tiny" shape="circular" centered />
              <Header inverted as="h4" content="Alex Stauter" textAlign="center" />
            </a>
          </Grid.Column>
          <Grid.Column width={4}>
            <a href="https://www.linkedin.com/in/rick-aguayo/">
              <Image src="/images/RickAguayo.jpeg" size="tiny" shape="circular" centered />
              <Header inverted as="h4" content="Rick Aguayo" textAlign="center" />
            </a>
          </Grid.Column>
        </Grid.Row>
      </Grid>
  </Segment>
);

export default Footer;
