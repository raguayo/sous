import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React from 'react';
import { Container, Grid, Header, Segment, Checkbox, Button } from 'semantic-ui-react';
import { postNewExcluded, deleteExcludedIngredient, addItemsToPeapodCart, deleteRecipesFromList } from '../store';
import { strikeThrough } from '../stylingUtilities';
import { setDisplayUnitAndQuantity, roundOffNumber, calculateLeftovers, filterPeapodIng, getLeftoverRecipes, getLeftoverRecipeDetails } from './utilityFuncs';

function GroceryList({
  groceryList, getIngredients,
  excludedIngredients, handleExcludedIngredient,
  handleCartPurchase, handleClearList, handleLeftoverSuggestions,
  addDisplayUnits,
}) {
  const ingredients = groceryList ? addDisplayUnits(getIngredients(groceryList)) : [];
  const peapodIngredients = filterPeapodIng(ingredients, excludedIngredients);
  handleLeftoverSuggestions(peapodIngredients);
  return (
    <Container style={styles.container}>
      <Header as="h2" style={styles.header} >Grocery List</Header>
      <Segment.Group>
        <Segment>
          <p>Ingredients:</p>
        </Segment>
        <Segment.Group>
          {
            ingredients.filter(ing => !!ing.prodId).map((ingredient) => {
              return (
                <Segment key={ingredient.id}>
                  <Grid>
                    {
                      excludedIngredients.indexOf(ingredient.id) !== -1 ? (
                        <Grid.Column
                          as={Checkbox} checked floated="left" width={13} verticalAlign="middle" style={{ textDecoration: 'line-through' }} onClick={(e) => handleExcludedIngredient(e, ingredient.id)}
                          label={`${ingredient.name} ${ingredient.displayUnit} ${ingredient.displayQuantity}`}
                        >
                        </Grid.Column>
                      ) : (
                        <Grid.Column
                          as={Checkbox} floated="left" width={13} verticalAlign="middle" onClick={(e) => handleExcludedIngredient(e, ingredient.id)}
                          label={`${ingredient.name} ${ingredient.displayUnit} ${ingredient.displayQuantity}`}
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
        <Segment>
          <p>Unknown Ingredients:</p>
        </Segment>
        <Segment.Group>
          {
            ingredients.filter(ing => !ing.prodId).map((ingredient) => {
              return (
                <Segment key={ingredient.id}>
                  <Grid>
                    {
                      excludedIngredients.indexOf(ingredient.id) !== -1 ? (
                        <Grid.Column
                          as={Checkbox} checked floated="left" width={13} verticalAlign="middle" style={{ textDecoration: 'line-through' }} onClick={(e) => handleExcludedIngredient(e, ingredient.id)}
                          label={`${ingredient.name} ${ingredient.displayUnit} ${ingredient.displayQuantity}`}
                        >
                        </Grid.Column>
                      ) : (
                        <Grid.Column
                          as={Checkbox} floated="left" width={13} verticalAlign="middle" onClick={(e) => handleExcludedIngredient(e, ingredient.id)}
                          label={`${ingredient.name} ${ingredient.displayUnit} ${ingredient.displayQuantity}`}
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
        <Button onClick={() => handleCartPurchase(peapodIngredients)}>Add to Peapod Cart</Button>
        <Button onClick={() => handleClearList()}>Clear list</Button>
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
    addDisplayUnits: ingArr =>
      ingArr.map(ingObj => roundOffNumber(setDisplayUnitAndQuantity(ingObj))),
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
    handleCartPurchase(peapodItems) {
      const itemArr = peapodItems.map((ingredientObj) => {
        return {
          id: ingredientObj.id,
          productId: ingredientObj.prodId,
          coupon: null,
          quantity: Math.ceil(ingredientObj.quantity / ingredientObj.size),
        };
      });
      dispatch(addItemsToPeapodCart(itemArr));
    },
    handleClearList() {
      dispatch(deleteRecipesFromList());
    },
    handleLeftoverSuggestions(peapodIngredients) {
      const leftovers = calculateLeftovers(peapodIngredients);
      getLeftoverRecipes(leftovers)
      .then(leftoverRecipes => getLeftoverRecipeDetails(leftoverRecipes))
      .then(results => console.log(results))
      .catch(console.error);
    },
  };
};

export default connect(mapState, mapDispatch)(GroceryList);

GroceryList.propTypes = {
  handleCartPurchase: PropTypes.func.isRequired,
  groceryList: PropTypes.array.isRequired,
  addDisplayUnits: PropTypes.func.isRequired,
  excludedIngredients: PropTypes.array.isRequired,
  getIngredients: PropTypes.func.isRequired,
  handleExcludedIngredient: PropTypes.func.isRequired,
  handleClearList: PropTypes.func.isRequired,
  handleLeftoverSuggestions: PropTypes.func.isRequired,
};

