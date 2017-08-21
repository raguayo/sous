import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React from 'react';
import { Container, Grid, Header, Segment, Checkbox, Button, Modal, Input, Form } from 'semantic-ui-react';
import { postNewExcluded, deleteExcludedIngredient, addItemsToPeapodCart, deleteRecipesFromList, textGroceryList } from '../store';
import { strikeThrough, getIngredients, addDisplayUnits } from '../utils';

function GroceryList({ ingredients, handleExcludedIngredient, excludedIngredients, handleCartPurchase, handleClearList, handleSendText }) {
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
        <Button onClick={() => handleCartPurchase(ingredients, excludedIngredients)}>Add to Peapod Cart</Button>
        <Button onClick={() => handleClearList()}>Clear list</Button>
        <Modal trigger={<Button>Text me my list</Button>} basic size='small' actions={[{ triggerClose: true }]} >
          <Modal.Content>
            <Form onSubmit={(e) => handleSendText(e, ingredients, excludedIngredients)}>
              <Input
                name="number"
                action={{ color: 'teal', labelPosition: 'left', icon: 'add', content: 'Submit' }}
                placeholder="input your phone number"
              />
            </Form>
          </Modal.Content>
        </Modal>
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
    ingredients: addDisplayUnits(getIngredients(state.groceryListRecipes)),
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
    handleCartPurchase(ingredients, excludedIds) {
      const itemArr = ingredients.map((ingredientObj) => {
        if (excludedIds.includes(ingredientObj.id) || !ingredientObj.prodId) return null;
        return {
          id: ingredientObj.id,
          productId: ingredientObj.prodId,
          coupon: null,
          quantity: Math.ceil(ingredientObj.quantity / ingredientObj.size),
        };
      }).filter(ing => !!ing);
      dispatch(addItemsToPeapodCart(itemArr));
    },
    handleClearList() {
      dispatch(deleteRecipesFromList());
    },
    handleSendText(e, ingredients, excludedIds) {
      const number = e.target.number.value;
      let ingredientArr = ingredients.filter((ingredient) => {
        if (!excludedIds.includes(ingredient.id)) return ingredient;
      });
      ingredientArr = ingredientArr.map((ingredient) => {
        return [ingredient.displayQuantity, ingredient.displayUnit, ingredient.name];
      });
      dispatch(textGroceryList(number, ingredientArr));
    },
  };
};

export default connect(mapState, mapDispatch)(GroceryList);

GroceryList.propTypes = {
  handleCartPurchase: PropTypes.func.isRequired,
  excludedIngredients: PropTypes.array.isRequired,
  ingredients: PropTypes.array.isRequired,
  handleExcludedIngredient: PropTypes.func.isRequired,
  handleClearList: PropTypes.func.isRequired,
  handleSendText: PropTypes.func.isRequired,
};

