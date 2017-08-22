import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container, Grid, Header, Segment, Button, Icon, Input, Form, Card, Image, Modal } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { textGroceryList } from '../store/groceryListRecipes';
import { postNewRecipe } from '../store/savedRecipes';
import { getIngredients, addDisplayUnits } from '../utils';

const styles = {
  container: {
    padding: '5em 0em',
  },
  recipeInput: {
    width: '80%',
  },
};

const RecipeCard = ({ groceryListRecipes, handleSendText, ingredients, excludedIngredients }) => {
    console.log('RecipeCard - props.groceryListRecipes: ', groceryListRecipes);
  return (
    <Container style={styles.container}>
      {
        groceryListRecipes && groceryListRecipes.map(recipe =>
          <Card key={recipe.id}>
            <Image src={`https://webknox.com/recipeImages/${recipe.imageUrl}`} />
            <Card.Content>
              <Card.Header>
                {recipe.title}
              </Card.Header>
              <Card.Description>
                Recipe Url:&nbsp;{ recipe.recipeUrl }
              </Card.Description>
              <Card.Meta>
                <span>
                   Number of Servings:&nbsp;{recipe.numServings}
                </span>
                <span className="date">
                   Updated {moment(recipe.updatedAt).format('MMMM Do YYYY, h:mm:ss a')}
                </span>
              </Card.Meta>
            </Card.Content>
            <Card.Content extra>
              <Modal trigger={<a><Icon name="users" />Text Recipe to a Friend!</a>} basic size="small" actions={[{ triggerClose: true }]} >
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
            </Card.Content>
          </Card>,
      )
      }
    </Container>
  );
};

const mapState = (state) => {
  // console.log('RecipeCard - groceryListRecipes: ', state.groceryListRecipes);
  return {
    groceryListRecipes: state.groceryListRecipes,
    ingredients: addDisplayUnits(getIngredients(state.groceryListRecipes)),
    excludedIngredients: state.excludedIngredients,
  };
};

const mapDispatch = (dispatch) => {
  return {
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
    handleAddRecipe: (e) => {
      e.preventDefault();
      dispatch(postNewRecipe(e.target.recipeUrl.value, true));
    },
  };
};

RecipeCard.propTypes = {
  // handleAddRecipe: PropTypes.func.isRequired,
  // handleDeleteRecipe: PropTypes.func.isRequired,
  // handleDeleteRecipes: PropTypes.func.isRequired,
  handleSendText: PropTypes.func.isRequired,
  groceryListRecipes: PropTypes.array.isRequired,
  ingredients: PropTypes.array.isRequired,
  excludedIngredients: PropTypes.array.isRequired,
};

export default connect(mapState, mapDispatch)(RecipeCard);
