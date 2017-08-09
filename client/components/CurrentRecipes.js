import React from 'react';
import { Container, Grid, Header, Image, Message, Segment } from 'semantic-ui-react';

export default function CurrentRecipe() {
  return (
    <Container style={{ padding: '5em 0em' }}>
      <Header as='h2'>Attached Content</Header>
      <Segment.Group>
        <Segment>
          <p>Top</p>
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
          <p>Middle</p>
        </Segment>
        <Segment.Group horizontal>
          <Segment>
            <p>Top</p>
          </Segment>
          <Segment>
            <p>Middle</p>
          </Segment>
          <Segment>
            <p>Bottom</p>
          </Segment>
        </Segment.Group>
        <Segment>
          <p>Bottom</p>
        </Segment>
      </Segment.Group>
    </Container>
  );
}
