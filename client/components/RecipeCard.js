import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Grid, Popup, Icon, Card, Image } from 'semantic-ui-react';
import { deleteSavedRecipe, transferSavedRecipe, favoriteToggle } from '../store';

const RecipeCard = ({ recipe, currRecipeIds, handleDelete, handleFavorite, handleTransfer }) => {
  const imageSrc = recipe.imageUrl.includes('http') ? recipe.imageUrl : `https://webknox.com/recipeImages/${recipe.imageUrl}`;
  return (
    <Grid>
      <Card fluid>
        <Card.Content>
          <Grid>
            <Grid.Column width={8}>
              <Image
                src={imageSrc}
                floated="left"
                width={300}
              />
            </Grid.Column>
            <Grid.Column width={8}>
              <Grid>
                <Grid.Column width={16}>
                  <Card.Header>
                    <a href={recipe.recipeUrl}>
                      {recipe.title}
                    </a>
                  </Card.Header>
                  <Card.Meta>
                    <span>
                      <br />
                      Serves:&nbsp;{recipe.numServings}
                    </span>
                  </Card.Meta>
                </Grid.Column>
              </Grid>
              <Grid>
                <Grid.Column width={16} textAlign="right">
                  { currRecipeIds.indexOf(recipe.id) === -1 ?
                    <Popup
                      trigger={
                        <span>
                          <Popup
                            trigger={<Icon onClick={() => handleTransfer(recipe.id)} name="shopping basket" color="black" />}
                            on="hover"
                            position="top center"
                            content="Add Recipe to Grocery Cart"
                          />
                        </span>
                      }
                      on="click"
                      content="Your recipe was added"
                      position="top center"
                      hoverable
                    /> :
                    <Popup
                      trigger={<Icon name="shopping basket" disabled />}
                      on="click"
                      content="Your recipe was added"
                      position="top center"
                    />
                  }
                  {recipe.savedrecipe.isFavorite
                    ? <Popup
                      trigger={<Icon onClick={() => handleFavorite(recipe.id)} name="star" color="yellow" />}
                      content="Unfavorite Recipe"
                      position="top center"
                      on="hover"
                    /> :
                    <Popup
                      trigger={<Icon onClick={() => handleFavorite(recipe.id)} name="empty star" />}
                      content="Favorite Recipe"
                      position="top center"
                      on="hover"
                    />
                  }
                  <Popup
                    trigger={<Icon onClick={() => handleDelete(recipe.id)} name="trash outline" />}
                    content="Delete Recipe"
                    position="top center"
                    on="hover"
                  />
                </Grid.Column>
              </Grid>
            </Grid.Column>
          </Grid>
        </Card.Content>
      </Card>
    </Grid>
  );
};

const mapState = (state, ownProps) => {
  return {
    recipe: ownProps.recipe,
    currRecipeIds: state.groceryListRecipes.map(recipe => recipe.id),
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleDelete: id => dispatch(deleteSavedRecipe(id)),
    handleTransfer: id => dispatch(transferSavedRecipe(id)),
    handleFavorite: id => dispatch(favoriteToggle(id)),
  }
};

RecipeCard.propTypes = {
  recipe: PropTypes.object.isRequired,
  handleDelete: PropTypes.func.isRequired,
  handleFavorite: PropTypes.func.isRequired,
  handleTransfer: PropTypes.func.isRequired,
  currRecipeIds: PropTypes.array.isRequired,
};

export default connect(mapState, mapDispatch)(RecipeCard);
