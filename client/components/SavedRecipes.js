import React from 'react';
import { connect } from 'react-redux';
import { Container, Grid, Header, Segment } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { deleteSavedRecipe, transferSavedRecipe, favoriteToggle } from '../store/';
import RecipeCard from './RecipeCard';

const styles = {
  container: {
    padding: '5em 0em',
  },
  color: {
    color: '#84643B',
  },
  header: {
    maxWidth: '450',
    color: '#84643B',
    fontFamily: 'Oleo Script Swash Caps',
    fontSize: '2.5rem',
  },
};

function SavedRecipes({ favRecipes, prevRecipes }) {
  return (
    <Container style={styles.container}>
      <Grid>
        <Grid.Column width={8}>
          <Header as="h2" style={styles.header}>Your favorite recipes:</Header>
          <Segment.Group>
            <Segment>
              <p style={styles.color}>Favorites:</p>
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
        </Grid.Column>
        <Grid.Column width={8}>
          <Header as="h2" style={styles.header}>All the recipes you've added:</Header>
          <Segment.Group>
            <Segment>
              <p style={styles.color}>Previous Recipes:</p>
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
        </Grid.Column>
      </Grid>
    </Container>
  );
}

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
};
