import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React from 'react';
import { Container, Grid, Header, Segment, Checkbox } from 'semantic-ui-react';
import { excludeIngredient } from '../store';
import { strikeThrough } from '../stylingUtilities';

function GroceryList({ groceryList, getIngredients, handleExcludeIngredient }) {
  const ingredients = groceryList ? getIngredients(groceryList) : [];
  function onClick(e) {
    strikeThrough(e);
    handleExcludeIngredient(e);
  }
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
                    <Grid.Column as={Checkbox} floated="left" width={13} verticalAlign="middle" onClick={onClick}>
                      <Grid>
                        <Grid.Column label={ingredient.name} />
                        <Grid.Column label={ingredient.quantity} />
                        <Grid.Column label={ingredient.unitMeasure} />
                      </Grid>
                    </Grid.Column>
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
            })
          }
        });
      });
      console.log(ingredientList);
      return ingredientList;
    },

  };
};

const mapDispatch = (dispatch) => {
  return {
    handleExcludeIngredient(e) {
      dispatch(excludeIngredient(e));
    },
  };
};

export default connect(mapState, mapDispatch)(GroceryList);

GroceryList.propTypes = {
  groceryList: PropTypes.object.isRequired,
  getIngredients: PropTypes.func.isRequired,
  handleExcludeIngredient: PropTypes.func.isRequired,
};
