import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Container, Grid, Header, Segment, Icon, Checkbox, Button } from 'semantic-ui-react';
import { fetchGroceryList, deleteRecipesFromList, addItemsToPeapodCart } from '../store';
import { strikeThrough } from '../stylingUtilities';

function GroceryList({ groceryList, getIngredients }) {
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
                    <Grid.Column as={Checkbox} floated="left" width={13} verticalAlign="middle" onClick={strikeThrough}
                      label={`${ingredient.name}          ${ingredient.quantity}          ${ingredient.unitMeasure}`}
                    >
                    </Grid.Column>
                    <Grid.Column floated="right" width={3} textAlign="right"><Icon onClick={() => { console.log('hi') }} name="delete" /></Grid.Column>
                  </Grid>
                </Segment>
              );
            })
          }
        </Segment.Group>
        <Button onClick={() => this.props.handleCartPurchase(this.props.groceryList)}>Add to Peapod Cart</Button>
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
      groceryListRecipes.forEach(recipe => {
        const recipeQuantity = recipe.grocerylist.quantity;
        recipe.ingredients.forEach(ingredient => {
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
    handleCartPurchase(groceryList) {
      const itemArr = [];
      Object.keys(groceryList).forEach((key) => {
        const gListItem = groceryList[key];
        const productId = gListItem.prodId;
        const quantToBuy = Math.ceiling(gListItem.quantity / gListItem.peapodQuantity);
        itemArr.push({ quantity: quantToBuy, productId });
      });
      dispatch(addItemsToPeapodCart(itemArr));
    },
  };
}

export default connect(mapState, null)(GroceryList);

GroceryList.propTypes = {
  handleCartPurchase: PropTypes.func.isRequired,
  groceryList: PropTypes.object.isRequired,
  getIngredients: PropTypes.func.isRequired,
};

