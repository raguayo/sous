import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container, Grid, Header, Segment, Button, Icon, Input, Form } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { postNewRecipe, deleteRecipeFromList, deleteRecipesFromList, updateRecipeQuantity } from '../store/groceryListRecipes';

function CurrentRecipe({ handleAddRecipe, handleDeleteRecipe, handleDeleteRecipes, groceryListRecipes, user, handleUpdateQuantity }) {
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
          {groceryListRecipes && groceryListRecipes.map((currRecipe) => {
            return (
              <Segment key={currRecipe.id}>
                <Grid>
                  <Grid.Column floated="left" width={2}>
                    <Form>
                      <Form.Input placeholder={currRecipe.grocerylist.quantity} onChange={(e) => handleUpdateQuantity(currRecipe.id, e)} />
                    </Form>
                  </Grid.Column>
                  <Grid.Column floated="left" width={10} verticalAlign="middle">
                    <a href={currRecipe.recipeUrl} target="_blank" rel="noopener noreferrer">{currRecipe.title}</a>
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
    groceryListRecipes: state.groceryListRecipes,
    user: state.user,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleAddRecipe: (e) => {
      e.preventDefault();
      dispatch(postNewRecipe(e.target.recipeUrl.value, true));
    },
    handleDeleteRecipe: id => dispatch(deleteRecipeFromList(id)),
    handleDeleteRecipes: () => {
      dispatch(deleteRecipesFromList());
    },
    handleUpdateQuantity: (recipeId, e) => {
      dispatch(updateRecipeQuantity(recipeId, e.target.value));
    },
  };
};

CurrentRecipe.propTypes = {
  handleAddRecipe: PropTypes.func.isRequired,
  handleDeleteRecipe: PropTypes.func.isRequired,
  handleDeleteRecipes: PropTypes.func.isRequired,
  groceryListRecipes: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
  handleUpdateQuantity: PropTypes.array.isRequired,
};

export default connect(mapState, mapDispatch)(CurrentRecipe);
