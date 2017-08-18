import React from 'react';
import { connect } from 'react-redux';
import { Container, Grid, Header, Image, Message, Segment, Button, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { deleteSavedRecipe } from '../store/savedRecipes';

function RecipeHistory({ favRecipes, prevRecipes, handleDelete }) {
  return (
    <Container style={styles.container}>
      <Header as="h2">Your favorite recipes:</Header>
      <Segment.Group>
        <Segment>
          <p>Favorites:</p>
        </Segment>
        <Segment.Group>
          {
            favRecipes.map((favRecipeObj) => {
              return (
                <Segment key={favRecipeObj.id}>
                  <Grid>
                    <Grid.Column floated="left" width={10} verticalAlign="middle">
                      <a href={favRecipeObj.recipeUrl} target="_blank" rel="noopener noreferrer" >{favRecipeObj.title}</a>
                    </Grid.Column>
                    <Grid.Column floated="right" width={3} textAlign="right"><Icon name="add" /><Icon name="minus circle" /><Icon name="delete" /></Grid.Column>
                  </Grid>
                </Segment>
              );
            })
          }
        </Segment.Group>
      </Segment.Group>
      <Header as="h2">All the recipes you&amp;ve added:</Header>
      <Segment.Group>
        <Segment>
          <p>Previous Recipes:</p>
        </Segment>
        <Segment.Group>
          {
            prevRecipes.map((prevRecipeObj) => {
              return (
                <Segment key={prevRecipeObj.id}>
                  <Grid>
                    <Grid.Column floated="left" width={10} verticalAlign="middle">
                      <a href={prevRecipeObj.recipeUrl} target="_blank" rel="noopener noreferrer" >{prevRecipeObj.title}</a>
                    </Grid.Column>
                    <Grid.Column floated="right" width={3} textAlign="right"><Icon name="add" /><Icon name="minus circle" /><Icon onClick={() => handleDelete(prevRecipeObj.id)} name="delete" /></Grid.Column>
                  </Grid>
                </Segment>
              );
            })
          }
        </Segment.Group>
      </Segment.Group>
    </Container>
  );
}

const styles = {
  container: {
    padding: '5em 0em',
  },
};

const mapState = (state) => {
  return {
    favRecipes: state.savedRecipes.filter(recipeObj => recipeObj.isFavorite),
    prevRecipes: state.savedRecipes.filter(recipeObj => !recipeObj.isFavorite),
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleDelete: id => dispatch(deleteSavedRecipe(id)),
  };
};

export default connect(mapState, mapDispatch)(RecipeHistory);

RecipeHistory.propTypes = {
  favRecipes: PropTypes.array.isRequired,
  prevRecipes: PropTypes.array.isRequired,
  handleDelete: PropTypes.func.isRequired,
};
