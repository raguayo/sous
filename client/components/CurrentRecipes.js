import React from 'react';
import { connect } from 'react-redux';
import { Container, Grid, Header, Segment, Button, Icon, Input, Form } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { postNewRecipe } from '../store/prevRecipes';

function CurrentRecipe({ handleAddRecipe }) {
  return (
    <Container style={{ padding: '5em 0em' }}>
      <Grid textAlign="center">
        <Grid.Row>
          <Header as='h2'>Welcome [Insert Name]</Header>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={12}>
            <Grid.Row className="add-recipe-url-wrapper">
              <Form onSubmit={handleAddRecipe}>
                <Input
                  name="recipeUrl"
                  className="add-recipe-url-bar"
                  action={{ color: 'teal', labelPosition: 'left', icon: 'add', content: 'Add Recipe' }}
                  actionPosition='right'
                  placeholder='Recipe url...'
                />
              </Form>
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

const mapState = null;

const mapDispatch = (dispatch) => {
  return {
    handleAddRecipe: (e) => {
      e.preventDefault();
      dispatch(postNewRecipe(e.target.recipeUrl.value))
    },
  }
}

export default connect(mapState, mapDispatch)(CurrentRecipe);
