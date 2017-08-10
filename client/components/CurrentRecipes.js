import React from 'react';
import { Container, Grid, Header, Segment, Button, Icon, Input } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

export default function CurrentRecipe(props) {
  console.log('props: ', props);
  return (
    <Container style={{ padding: '5em 0em' }}>
      <Grid textAlign="center">
        <Grid.Row>
          <Header as='h2'>Welcome [Insert Name]</Header>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={12}>
            <Grid.Row className="add-recipe-url-wrapper">
              <Input
                className="add-recipe-url-bar"
                action={{ color: 'teal', labelPosition: 'left', icon: 'add', content: 'Add Recipe' }}
                actionPosition='right'
                placeholder='Recipe url...'
              />
            </Grid.Row>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <Segment.Group>
          <Segment>
            <p>Your currently selected recipes:</p>
          </Segment>
        <Segment.Group>
          <Segment>
            <Grid>
              <Grid.Column floated='left' width={13} verticalAlign="middle"><p>Nested Top</p></Grid.Column>
              <Grid.Column floated='right' width={3} textAlign="right"><Icon onClick={() => {console.log('hi')}} name="delete" /></Grid.Column>
            </Grid>
          </Segment>
          <Segment>
            <Grid>
              <Grid.Column floated='left' width={13} verticalAlign="middle"><p>Nested Middle</p></Grid.Column>
              <Grid.Column floated='right' width={3} textAlign="right"><Icon onClick={() => {console.log('hi')}} name="delete" /></Grid.Column>
            </Grid>
          </Segment>
          <Segment>
            <Grid>
              <Grid.Column floated='left' width={13} verticalAlign="middle"><p>Nested Bottom</p></Grid.Column>
              <Grid.Column floated='right' width={3} textAlign="right"><Icon onClick={() => {console.log('hi')}} name="delete" /></Grid.Column>
            </Grid>
          </Segment>
        </Segment.Group>
        <Segment>
          <Button as={Link} to={'./grocery-list'}>View Your Grocery List!</Button>
          <Button>Clear Recipe List</Button>
        </Segment>
      </Segment.Group>
    </Container>
  );
}
