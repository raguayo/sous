import React from 'react';
import { Segment, Header, Image } from 'semantic-ui-react';

const styles = {
  photo: {
    marginRight: '0.5em',
  },
  madeBy: {
    marginRight: '1em',
    marginBottom: '0em',
    fontFamily: 'Roboto-Slab',
  },
  footer: {
    backgroundColor: '#0c0c0c',
    verticalAlign: 'center',
  },
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0em 2em',
  },
  photoContainer: {
    display: 'flex',
    alignItems: 'center',
  },
};

const Footer = () => (
  <Segment inverted vertical style={styles.footer}>
    <div style={styles.container}>
      <a href="https://github.com/raguayo/raww" target="_blank" rel="noopener noreferrer">
        <Image src="http://git-class.gr/images/GitHub_Logo.png" size="small" centered />
      </a>
      <div style={styles.photoContainer}>
        <Header inverted as="h2" content="Made By: " textAlign="left" style={styles.madeBy} />
        <a href="https://www.linkedin.com/in/william-raedy-13a161147/" style={styles.photo} target="_blank" rel="noopener noreferrer">
          <Image src="/images/WillyRaedy.jpg" size="tiny" shape="circular" centered />
        </a>
        <a href="https://www.linkedin.com/in/alexander-j-stauter-7239ba93/" style={styles.photo} target="_blank" rel="noopener noreferrer">
          <Image src="/images/AlexStauter.jpeg" size="tiny" shape="circular" centered />
        </a>
        <a href="https://www.linkedin.com/in/rick-aguayo/" style={styles.photo} target="_blank" rel="noopener noreferrer">
          <Image src="/images/RickAguayo.jpeg" size="tiny" shape="circular" centered />
        </a>
      </div>
    </div>
  </Segment>
);

export default Footer;
