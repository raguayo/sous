import React from 'react';
import { Container, Grid, Header, Image, Message, Segment, Button } from 'semantic-ui-react';

export default function CurrentRecipe() {
  return (
    <Container style={{ padding: '5em 0em' }}>
      <Header as='h2'>Your Currently Selected Recipes</Header>
      <Segment.Group>
        <Segment.Group>
          <Segment>
            <Grid>
              <Grid.Column floated='left' width={12}><p>Nested Top</p></Grid.Column>
              <Grid.Column floated='right' width={4}><p>Test</p></Grid.Column>
            </Grid>
          </Segment>
          <Segment>
            <p>Nested Middle</p>
          </Segment>
          <Segment>
            <p>Nested Bottom</p>
          </Segment>
        </Segment.Group>
        <Segment>
          <Button>View Your Grocery List!</Button>
          <Button>Clear Recipe List</Button>
        </Segment>
      </Segment.Group>
    </Container>
  );
}


