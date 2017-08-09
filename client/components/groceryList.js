import React from 'react';
import { Container, Grid, Header, Segment, Icon, Checkbox } from 'semantic-ui-react';

export default function GroceryList() {
  return (
    <Container style={{ padding: '5em 0em' }}>
      <Header as="h2" style={styles.header} >Grocery List</Header>
      <Segment.Group>
        <Segment.Group>
          <Segment>
            <Grid>
              <Grid.Column as={Checkbox} floated="left" width={13} verticalAlign="middle" label="Nested Top" onClick={strikeThrough}> </Grid.Column>
              <Grid.Column floated="right" width={3} textAlign="right"><Icon onClick={() => { console.log('hi')}} name="delete" /></Grid.Column>
            </Grid>
          </Segment>
          <Segment>
            <Grid>
              <Grid.Column as={Checkbox} floated="left" width={13} verticalAlign="middle" label="Middle" onClick={strikeThrough}> </Grid.Column>
              <Grid.Column floated="right" width={3} textAlign="right"><Icon onClick={() => { console.log('hi') }} name="delete" /></Grid.Column>
            </Grid>
          </Segment>
          <Segment>
            <Grid>
              <Grid.Column as={Checkbox} floated="left" width={13} verticalAlign="middle" label="Low" onClick={strikeThrough}> </Grid.Column>
              <Grid.Column floated="right" width={3} textAlign="right"><Icon onClick={() => { console.log('hi') }} name="delete" /></Grid.Column>
            </Grid>
          </Segment>
        </Segment.Group>
      </Segment.Group>
    </Container>
  );
}

const styles = {
  header: {
    fontFamily: 'Satisfy',
  },
};

function strikeThrough(e) {
  const currSetting = e.target.getAttribute('style');
  if (!currSetting || currSetting === 'text-decoration: none') {
    e.target.setAttribute('style', 'text-decoration: line-through');
  } else {
    e.target.setAttribute('style', 'text-decoration: none');
  }
}
