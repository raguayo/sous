import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  Container,
  Grid,
  Header,
  Segment,
  Icon,
  Input,
  Form,
  Card
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import {
  deleteRecipeFromList,
  deleteRecipesFromList,
  updateRecipeQuantity
} from "../store/groceryListRecipes";
import { postNewRecipe } from "../store/savedRecipes";
import { EmptyList } from './';
import CurrRecipeCard from './CurrRecipeCard';

function CurrentRecipe({
  handleAddRecipe,
  handleDeleteRecipe,
  handleDeleteRecipes,
  groceryListRecipes,
  user,
  handleUpdateQuantity
}) {
  return (
    <Container style={styles.container}>
      <Grid textAlign="center">
        <Grid.Row>
          <Header as="h1" style={styles.header}>Welcome, {user.name}</Header>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={12}>
            <Grid.Row>
              <Form onSubmit={handleAddRecipe}>
                <Input
                  name="recipeUrl"
                  style={styles.recipeInput}
                  action={{
                    labelPosition: "left",
                    icon: "add",
                    content: "Add",
                    style: { backgroundColor: "#77a95f", color: "white" }
                  }}
                  placeholder="Recipe url..."
                />
              </Form>
            </Grid.Row>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      {groceryListRecipes.length ?
        <Segment.Group>
          <Segment>
            <p style={styles.color}>Your currently selected recipes:</p>
          </Segment>
              <Grid relaxed padded>
                {
                  groceryListRecipes && groceryListRecipes.map((currRecipe) => {
                    return (
                      <Grid.Column width={8} style={styles.recipeCol}>
                         <CurrRecipeCard recipe={currRecipe} isCurrRecipe="true" />
                      </Grid.Column>
                    );
                  },
                  )}
              </Grid>
          <Segment>
            <Link to={'./grocery-list'} className="appButton" >View Your Grocery List!</Link>
            <a
              onClick={() => handleDeleteRecipes()}
              className="appButton"
            > Clear Recipe List</a>
          </Segment>
        </Segment.Group> :
          <EmptyList style={styles.topMarg}/>
      }
    </Container>
  );
}

const mapState = state => {
  return {
    groceryListRecipes: state.groceryListRecipes,
    user: state.user
  };
};

const mapDispatch = dispatch => {
  return {
    handleAddRecipe: e => {
      e.preventDefault();
      dispatch(postNewRecipe(e.target.recipeUrl.value, true));
    },
    handleDeleteRecipe: id => dispatch(deleteRecipeFromList(id)),
    handleDeleteRecipes: () => {
      dispatch(deleteRecipesFromList());
    },
    handleUpdateQuantity: (recipeId, e) => {
      dispatch(updateRecipeQuantity(recipeId, e.target.value));
    }
  };
};

CurrentRecipe.propTypes = {
  handleAddRecipe: PropTypes.func.isRequired,
  handleDeleteRecipe: PropTypes.func.isRequired,
  handleDeleteRecipes: PropTypes.func.isRequired,
  handleUpdateQuantity: PropTypes.func.isRequired,
  groceryListRecipes: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired
};

export default connect(mapState, mapDispatch)(CurrentRecipe);

const styles = {
  recipeCol: {
    padding: '2em 1.6em 2em 2em'
  },
  recipeList: {
    padding: '0.5em',
  },
  header: {
    maxWidth: "450",
    color: "#84643B",
    fontFamily: "Oleo Script Swash Caps",
    fontSize: "4rem"
  },
  container: {
    padding: "5em 0em"
  },
  color: {
    color: "#84643B"
  },
  recipeInput: {
    width: '80%',
  },
  topMarg: {
    paddingTop: '3em',
  }
};
