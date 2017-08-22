import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container, Grid, Header, Segment, Button, Icon, Input, Form } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { deleteRecipeFromList, deleteRecipesFromList, updateRecipeQuantity } from '../store/groceryListRecipes';
import { postNewRecipe } from '../store/savedRecipes';

function CurrentRecipe({ handleAddRecipe, handleDeleteRecipe, handleDeleteRecipes, groceryListRecipes, user, handleUpdateQuantity }) {
  return (
    <Container style={styles.container}>
      <Grid textAlign="center">
        <Grid.Row>
          <Header as="h1" style={styles.header}>Welcome {user.name}</Header>
        </Grid.Row>
        <Grid.Row >
          <Grid.Column width={12}>
            <Grid.Row >
              <Form onSubmit={handleAddRecipe}>
                <Input
                  name="recipeUrl"
                  style={styles.recipeInput}
                  action={{ labelPosition: 'left', icon: 'add', content: 'Add', style: { backgroundColor: '#77a95f', color: 'white' } }}
                  placeholder="Recipe url..."
                />
              </Form>
            </Grid.Row>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <Segment.Group>
        {
          groceryListRecipes.length === 0 ?
            <div>
              <Segment>
                <p style={styles.color}>Your list is currently empty, why not add a recipe from <Link to={'./history'}>your recipes</Link> or upload a recipe using our CHROME EXTENSION LINK!</p>
              </Segment>
            </div>
            :
            <div>
              <Segment>
                <p style={styles.color}>Your currently selected recipes:</p>
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
                },
                )}
              </Segment.Group>
            </div>
        }
        <Segment>
          <Link to={'./grocery-list'} className="appButton" >View Your Grocery List!</Link>
          <a
            onClick={() => handleDeleteRecipes()}
            className="appButton"
          > Clear Recipe List</a>
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
  handleUpdateQuantity: PropTypes.func.isRequired,
  groceryListRecipes: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
};

export default connect(mapState, mapDispatch)(CurrentRecipe);

const styles = {
  header: {
    maxWidth: '450',
    color: '#84643B',
    fontFamily: 'Oleo Script Swash Caps',
    fontSize: '4rem',
  },
  container: {
    padding: '5em 0em',
  },
  color: {
    color: '#84643B',
  },
  recipeInput: {
    width: '80%',
  },
};
