import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Grid, Popup, Icon, Card, Image } from "semantic-ui-react";
import {
  deleteSavedRecipe,
  transferSavedRecipe,
  favoriteToggle
} from "../store/";
import { getIngredients, addDisplayUnits } from "../utils";

const RecipeCard = ({
  recipe,
  handleDelete,
  handleFavorite,
  handleTransfer
}) => {
  return (
    <Grid>
      <Card style={ { width: '50%' } } fluid>
        <Card.Content>
          <Grid>
            <Grid.Column width={8}>
              <Image
                src={`https://webknox.com/recipeImages/${recipe.imageUrl}`}
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
                  <Popup
                    trigger={
                      <Icon
                        onClick={() => handleTransfer(recipe.id)}
                        name="add"
                      />
                    }
                    on="click"
                    content="Recipe added to your grocery list"
                    position="top center"
                  />
                  {recipe.savedrecipe.isFavorite
                    ? <Icon
                        onClick={() => handleFavorite(recipe.id)}
                        name="star"
                        color="yellow"
                      />
                    : <Icon
                        onClick={() => handleFavorite(recipe.id)}
                        name="empty star"
                      />}
                  <Icon onClick={() => handleDelete(recipe.id)} name="delete" />
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
    recipe: ownProps.recipe
  };
};

const mapDispatch = dispatch => {
  return {
    handleDelete: id => dispatch(deleteSavedRecipe(id)),
    handleTransfer: id => dispatch(transferSavedRecipe(id)),
    handleFavorite: id => dispatch(favoriteToggle(id))
  };
};

RecipeCard.propTypes = {
  recipe: PropTypes.object.isRequired,
  handleDelete: PropTypes.func.isRequired,
  handleFavorite: PropTypes.func.isRequired,
  handleTransfer: PropTypes.func.isRequired
};

export default connect(mapState, mapDispatch)(RecipeCard);
