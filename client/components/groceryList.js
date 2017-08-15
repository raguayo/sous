import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Container, Grid, Header, Segment, Icon, Checkbox } from 'semantic-ui-react';
import { fetchGroceryList } from '../store';

function GroceryList({ groceryList, getIngredients }) {
  const ingredients = groceryList ? getIngredients(groceryList) : [];
  return (
    <Container style={{ padding: '5em 0em' }}>
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
      </Segment.Group>
    </Container>
  );
}

const styles = {
  header: {
    fontFamily: 'Satisfy',
  },
};

function strikeThrough(e) {
  const currSetting = e.target.getAttribute('style');
  if (!currSetting || currSetting === 'text-decoration: none') {
    e.target.setAttribute('style', 'text-decoration: line-through');
  } else {
    e.target.setAttribute('style', 'text-decoration: none');
  }
}

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

// const mapDispatch = (dispatch) => {
//   return {
//     loadInitialData() {
//       dispatch(fetchGroceryList());
//     }
//   }
// }

export default connect(mapState, null)(GroceryList);

GroceryList.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
};
