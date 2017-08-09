import React from 'react';
import { Container, Grid, Header, Image, Message, Segment, Button, Icon } from 'semantic-ui-react';

export default function History() {
  return (
    <Container style={{ padding: '5em 0em' }}>
      <Header as='h2'>Your favorite recipes:</Header>
      <Segment.Group>
        <Segment>
          <p>Favorites:</p>
        </Segment>
        <Segment.Group>
          <Segment>
            <Grid>
              <Grid.Column floated='left' width={10} verticalAlign="middle"><p>Nested Top</p></Grid.Column>
              <Grid.Column floated='right' width={3} textAlign="right"><Icon name="add" /><Icon name="minus circle"></Icon><Icon name="delete" /></Grid.Column>
            </Grid>
          </Segment>
          <Segment>
            <Grid>
              <Grid.Column floated='left' width={13} verticalAlign="middle"><p>Nested Middle</p></Grid.Column>
              <Grid.Column floated='right' width={3} textAlign="right"><Icon name="add" /><Icon name="minus circle"></Icon><Icon name="delete" /></Grid.Column>
            </Grid>
          </Segment>
          <Segment>
            <Grid>
              <Grid.Column floated='left' width={13} verticalAlign="middle"><p>Nested Bottom</p></Grid.Column>
              <Grid.Column floated='right' width={3} textAlign="right"><Icon name="add" /><Icon name="minus circle"></Icon><Icon name="delete" /></Grid.Column>
            </Grid>
          </Segment>
        </Segment.Group>
      </Segment.Group>
      <Header as='h2'>All the recipes you've added:</Header>
      <Segment.Group>
        <Segment>
          <p>Previous Recipes:</p>
        </Segment>
        <Segment.Group>
          <Segment>
            <Grid>
              <Grid.Column floated='left' width={10} verticalAlign="middle"><p>Nested Top</p></Grid.Column>
              <Grid.Column floated='right' width={3} textAlign="right"><Icon name="add" /><Icon name="favorite"></Icon><Icon name="delete" /></Grid.Column>
            </Grid>
          </Segment>
          <Segment>
            <Grid>
              <Grid.Column floated='left' width={13} verticalAlign="middle"><p>Nested Middle</p></Grid.Column>
              <Grid.Column floated='right' width={3} textAlign="right"><Icon name="add" /><Icon name="favorite"></Icon><Icon name="delete" /></Grid.Column>
            </Grid>
          </Segment>
          <Segment>
            <Grid>
              <Grid.Column floated='left' width={13} verticalAlign="middle"><p>Nested Bottom</p></Grid.Column>
              <Grid.Column floated='right' width={3} textAlign="right"><Icon name="add" /><Icon name="favorite"></Icon><Icon name="delete" /></Grid.Column>
            </Grid>
          </Segment>
        </Segment.Group>
      </Segment.Group>
    </Container>
  );
}
