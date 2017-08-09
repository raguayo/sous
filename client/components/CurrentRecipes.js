import React from 'react';
import { Container, Grid, Header, Image, Message, Segment } from 'semantic-ui-react';

export default function CurrentRecipe() {
  return (
    <Container style={{ padding: '5em 0em' }}>
      <Header as='h2'>Your Currently Selected Recipes</Header>
      <Segment.Group>
        <Segment>
          <p>Your currently selected recipes:</p>
        </Segment>
        <Segment.Group>
          <Segment>
            <p>Nested Top</p>
          </Segment>
          <Segment>
            <p>Nested Middle</p>
          </Segment>
          <Segment>
            <p>Nested Bottom</p>
          </Segment>
        </Segment.Group>
        <Segment>
          <p>Clear Recipe List</p>
        </Segment>
      </Segment.Group>
    </Container>
  );
}
