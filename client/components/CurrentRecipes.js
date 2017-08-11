import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container, Grid, Header, Segment, Button, Icon, Input, Form } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { postNewRecipe } from '../store/prevRecipes';
import { deleteCurrRecipe, deleteCurrRecipes } from '../store/currRecipes';

function CurrentRecipe({ handleAddRecipe, handleDeleteRecipe, handleDeleteRecipes, currRecipes, user }) {
  return (
    <Container style={{ padding: '5em 0em' }}>
      <Grid textAlign="center">
        <Grid.Row>
          <Header as="h2">Welcome {user.name}</Header>
        </Grid.Row>
        <Grid.Row >
          <Grid.Column width={12}>
            <Grid.Row className="add-recipe-url-wrapper">
              <Form onSubmit={handleAddRecipe}>
                <Input
                  name="recipeUrl"
                  className="add-recipe-url-bar"
                  action={{ color: 'teal', labelPosition: 'left', icon: 'add', content: 'Add Recipe' }}
                  actionPosition="right"
                  placeholder="Recipe url..."
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
          {currRecipes && currRecipes.map((currRecipe) => {
            return (
              <Segment key={currRecipes.id}>
                <Grid>
                   <Grid.Column floated="left" width={10} verticalAlign="middle">
                    <a href={currRecipe.recipeUrl} target="_blank" rel="noopener noreferrer" >{currRecipe.title}</a>
                  </Grid.Column>
                  <Grid.Column floated="right" width={3} textAlign="right"><Icon onClick={() => handleDeleteRecipe(currRecipe.id)} name="delete" /></Grid.Column>
                </Grid>
              </Segment>
            );
          })}
        </Segment.Group>
        <Segment>
          <Button as={Link} to={'./grocery-list'}>View Your Grocery List!</Button>
          <Button onClick={() => handleDeleteRecipes()}>Clear Recipe List</Button>
        </Segment>
      </Segment.Group>
    </Container>
  );
}

const mapState = (state) => {
  return {
    currRecipes: state.currRecipes,
    user: state.user,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleAddRecipe: (e) => {
      e.preventDefault();
      dispatch(postNewRecipe(e.target.recipeUrl.value));
    },
    handleDeleteRecipe: id => dispatch(deleteCurrRecipe(id)),
    handleDeleteRecipes: () => {
      dispatch(deleteCurrRecipes());
    },
  };
};

CurrentRecipe.propTypes = {
  handleAddRecipe: PropTypes.func.isRequired,
  handleDeleteRecipe: PropTypes.func.isRequired,
  handleDeleteRecipes: PropTypes.func.isRequired,
  currRecipes: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
};

export default connect(mapState, mapDispatch)(CurrentRecipe);
