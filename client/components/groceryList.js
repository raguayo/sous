import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React from 'react';
import { Container, Grid, Header, Segment, Checkbox } from 'semantic-ui-react';
import { postNewExcluded, deleteExcludedIngredient } from '../store';
import { strikeThrough } from '../stylingUtilities';

function GroceryList({ groceryList, getIngredients, handleExcludedIngredient, excludedIngredients }) {
  const ingredients = groceryList ? getIngredients(groceryList) : [];

  return (
    <Container style={styles.container}>
      <Header as="h2" style={styles.header} >Grocery List</Header>
      <Segment.Group>
        <Segment.Group>
          {
            ingredients.map((ingredient) => {
              return (
                <Segment key={ingredient.id}>
                  <Grid>
                    {
                      excludedIngredients.indexOf(ingredient.id) !== -1 ? (
                        <Grid.Column
                          as={Checkbox} checked floated="left" width={13} verticalAlign="middle" style={{ textDecoration: 'line-through' }} onClick={(e) => handleExcludedIngredient(e, ingredient.id)}
                          label={`${ingredient.name} ${ingredient.unitSize} ${ingredient.quantity}`}
                        >
                        </Grid.Column>
                      ) : (
                        <Grid.Column
                          as={Checkbox} floated="left" width={13} verticalAlign="middle" onClick={(e) => handleExcludedIngredient(e, ingredient.id)}
                          label={`${ingredient.name} ${ingredient.unitSize} ${ingredient.quantity}`}
                        >
                        </Grid.Column>
                        )
                    }
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
  header: {
    fontFamily: 'Satisfy',
  },
};

const mapState = (state) => {
  return {
    groceryList: state.groceryListRecipes,
    getIngredients: (groceryListRecipes) => {
      const ingredientList = [];
      groceryListRecipes.forEach((recipe) => {
        const recipeQuantity = recipe.grocerylist.quantity;
        recipe.ingredients.forEach((ingredient) => {
          const foundIng = ingredientList.find(obj => obj.id === ingredient.id)
          if (foundIng) {
            foundIng.quantity += ingredient.ingredientQuantity.quantity * recipeQuantity;
          } else {
            const { id, name, prodId, size, unitMeasure } = ingredient;
            const quantity = ingredient.ingredientQuantity.quantity * recipeQuantity;
            ingredientList.push({
              name,
              id,
              prodId,
              unitMeasure,
              size,
              quantity,
            });
          }
        });
      });
      return ingredientList;
    },
    excludedIngredients: state.excludedIngredients,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleExcludedIngredient(e, excludedId) {
      if (strikeThrough(e)) {
        dispatch(postNewExcluded(excludedId));
      } else {
        dispatch(deleteExcludedIngredient(excludedId));
      }
    },
  };
};

export default connect(mapState, mapDispatch)(GroceryList);

GroceryList.propTypes = {
  groceryList: PropTypes.object.isRequired,
  getIngredients: PropTypes.func.isRequired,
  handleExcludedIngredient: PropTypes.func.isRequired,
};
