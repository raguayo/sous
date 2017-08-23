import React from 'react';
import { connect } from 'react-redux';
import { Container, Grid, Header, Segment, Icon, Popup, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { deleteSavedRecipe, transferSavedRecipe, favoriteToggle } from '../store/';
import RecipeCard from './RecipeCard';

function SavedRecipes({ favRecipes, prevRecipes, handleDelete, handleFavorite, handleTransfer }) {
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
                  <RecipeCard recipe={favRecipeObj} />
                </Segment>
              );
            })
          }
        </Segment.Group>
      </Segment.Group>
      <Header as="h2">All the recipes you've added:</Header>
      <Segment.Group>
        <Segment>
          <p>Previous Recipes:</p>
        </Segment>
        <Segment.Group>
          {
            prevRecipes.map((prevRecipeObj) => {
              return (
                <Segment key={prevRecipeObj.id}>
                  <RecipeCard recipe={prevRecipeObj} />
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
    favRecipes: state.savedRecipes.filter((recipeObj) => {
      return recipeObj.savedrecipe.isFavorite;
    }),
    prevRecipes: state.savedRecipes.filter(recipeObj => !recipeObj.savedrecipe.isFavorite),
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleDelete: id => dispatch(deleteSavedRecipe(id)),
    handleTransfer: id => dispatch(transferSavedRecipe(id)),
    handleFavorite: id => dispatch(favoriteToggle(id)),
  };
};

export default connect(mapState, mapDispatch)(SavedRecipes);

SavedRecipes.propTypes = {
  favRecipes: PropTypes.array.isRequired,
  prevRecipes: PropTypes.array.isRequired,
  handleDelete: PropTypes.func.isRequired,
  handleFavorite: PropTypes.func.isRequired,
  handleTransfer: PropTypes.func.isRequired,
};
