import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container, Grid, Header, Segment, Input, Form, Loader, Dimmer } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { deleteRecipesFromList, postNewRecipe } from '../store';
import { EmptyList } from './';
import CurrRecipeCard from './CurrRecipeCard';

const styles = {
  loader: {
    height: '5em',
  },
  recipeCol: {
    padding: '1em 1em 1em 1em',
    display: 'flex',
  },
  recipeList: {
    padding: '0.5em',
  },
  header: {
    color: '#84643B',
    fontFamily: 'Oleo Script Swash Caps',
    fontSize: '4rem',
  },
  container: {
    padding: '5em 0em',
  },
  color: {
    color: '#84643B',
  },
  recipeInput: {
    width: '80%',
  },
  topMarg: {
    paddingTop: '3em',
  },
};

class CurrentRecipe extends React.Component {
  constructor() {
    super();

    this.state = {
      displayLoader: false,
    };
  }

  displayLoader = () => this.setState({ displayLoader: true })
  hideLoader = () => this.setState({ displayLoader: false })

  render() {
    console.log(this.state.displayLoader)
    const { handleAddRecipe, handleDeleteRecipes, groceryListRecipes, user } = this.props;
    return (
      <Container style={styles.container}>
        <Grid textAlign="center">
          <Grid.Row>
            <Header as="h1" style={styles.header}>Welcome, {user.name}</Header>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={12}>
              <Grid.Row>
                <Form onSubmit={e => handleAddRecipe(e, this.displayLoader, this.hideLoader)}>
                  <Input
                    name="recipeUrl"
                    style={styles.recipeInput}
                    action={{
                      labelPosition: 'left',
                      icon: 'add',
                      content: 'Add',
                      style: { backgroundColor: '#77a95f', color: 'white' }
                    }}
                    placeholder="Recipe url..."
                  />
                </Form>
              </Grid.Row>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        {
          this.state.displayLoader ? <Segment style={styles.loader}>
              <Dimmer active inverted>
            <Loader size='mini'>
                Loading
            </Loader>
              </Dimmer>
          </Segment> : null
        }
        {groceryListRecipes.length ?
          <Segment.Group>
            <Segment>
              <p style={styles.color}>Your currently selected recipes:</p>
            </Segment>
            <Grid relaxed padded stretched>
              {
                groceryListRecipes && groceryListRecipes.map((currRecipe) => {
                  return (
                    <Grid.Column width={5} style={styles.recipeCol} key={currRecipe.id}>
                      <CurrRecipeCard recipe={currRecipe} />
                    </Grid.Column>
                  );
                },
                )}
            </Grid>
            <Segment>
              <Link to={'./grocery-list'} className="appButton">View Your Grocery List!</Link>
              <a
                onClick={() => handleDeleteRecipes()}
                className="appButton"
              > Clear Recipe List</a>
            </Segment>
          </Segment.Group> :
          <EmptyList style={styles.topMarg} />
        }
      </Container>
    );
  }
}

const mapState = (state) => {
  return {
    groceryListRecipes: state.groceryListRecipes,
    user: state.user,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleAddRecipe: (e, showLoader, hideLoader) => {
      e.preventDefault();
      showLoader();
      dispatch(postNewRecipe(e.target.recipeUrl.value, true))
      .then(() => hideLoader())
      .catch(console.error);
    },
    handleDeleteRecipes: () => {
      dispatch(deleteRecipesFromList());
    },
  };
};

CurrentRecipe.propTypes = {
  handleAddRecipe: PropTypes.func.isRequired,
  handleDeleteRecipes: PropTypes.func.isRequired,
  groceryListRecipes: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
};

export default connect(mapState, mapDispatch)(CurrentRecipe);
