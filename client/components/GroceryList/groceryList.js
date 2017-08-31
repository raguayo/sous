import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React from 'react';
import { Container, Grid, Header, Segment, Accordion, Card, Image } from 'semantic-ui-react';
import { deleteRecipesFromList, removeSuggestedRecipes, dirtySuggestedRecipes, fetchRecipeSuggestions } from '../../store';
import { getIngredients, addDisplayUnits, filterPeapodIng, aisleMaker } from '../../utils';
import { PeapodModal, Aisle, TextModal } from './';
import { EmptyList } from '../';

const styles = {
  container: {
    padding: '5em 0em',
  },
  header: {
    maxWidth: '450',
    color: '#84643B',
    fontFamily: 'Oleo Script Swash Caps',
    fontSize: '4rem',
  },
  suggestedRecipeCard: {
    position: 'absolute',
    zIndex: 1000,
    top: '40px',
    right: '40px',
  },
  textColor: {
    color: '#84643B',
    fontSize: '1.1rem',
  },
  list: {
    marginTop: '1.5em',
  },
};


class GroceryList extends React.Component {
  constructor() {
    super();
    this.state = {
      sendTextModalOpen: false,
    };
  }


  // componentDidMount() {
  //   if (!this.props.dirty) {
  //     console.log('Running suggestion');
  //     this.props.generateLeftoverSuggestions(this.props.peapodIngredients);
  //   }
  // }

  handleSendTextModalClose = () => this.setState({ sendTextModalOpen: false });
  handleSendTextModalOpen = () => this.setState({ sendTextModalOpen: true });

  render(props) {
    const { excludedIngredients, peapodIngredients, handleClearList, suggestedRecipes, handleRejectSuggestedRecipes, unknownIngredients, peapodAisles, offLineAisles, ingredients } = this.props;

    return (
      <div style={{ position: 'relative' }}>
        <Container style={styles.container}>
          <Grid textAlign="center">
            <Grid.Row>
              <Header as="h2" style={styles.header}>
                Grocery List
            </Header>
            </Grid.Row>
          </Grid>
          {peapodIngredients.length || unknownIngredients.length ?
            <div style={styles.list}>
              <Segment.Group style={{ width: '75%', margin: 'auto' }}>
                <Segment>
                  <p style={styles.textColor}>Ingredients:</p>
                </Segment>
                <Aisle aisles={peapodAisles} />
                {peapodIngredients.length ?
                  <PeapodModal peapodIngredients={peapodIngredients} /> : null
                }
                {unknownIngredients.length ?
                  <Segment>
                    <p style={styles.textColor}>The following ingredients were not found on Peapod. You may have to buy these on your own.</p>
                    <Aisle aisles={offLineAisles} />
                  </Segment>
                  : null
                }
                <button className="appButton" onClick={() => handleClearList()}>Clear list</button>
                <TextModal ingredients={ingredients} excludedIngredients={excludedIngredients} />
              </Segment.Group>
              {
                suggestedRecipes.length ?
                  <Card style={styles.suggestedRecipeCard}>
                    <Card.Content>
                      <Image floated="right" size="mini" src="https://d30y9cdsu7xlg0.cloudfront.net/png/50479-200.png" />
                      <Card.Header>
                        I noticed you have some extra ingredients. Here are some recipes that would make use of those.
                      </Card.Header>
                      <Card.Meta>
                        - Sous
                      </Card.Meta>
                    </Card.Content>
                    <Card.Content extra>
                      <Accordion
                        panels={suggestedRecipes.map((rec) => {

                          return {
                            title: rec.title,
                            content: <a href={rec.sourceUrl} target="_blank" rel='noopener noreferrer'>Recipe Link</a>,
                          };
                        })
                        }
                      />
                    </Card.Content>
                    <Card.Content>
                      <button onClick={() => handleRejectSuggestedRecipes()}>No Thanks</button>
                    </Card.Content>
                  </Card> : null
              }
            </div>
            :
            <EmptyList />
          }
        </Container>
      </div>
    );
  }
}

const mapState = (state) => {
  const ingredients = addDisplayUnits(getIngredients(state.groceryListRecipes));
  const peapodIngredients = filterPeapodIng(ingredients, state.excludedIngredients);
  const unknownIngredients = ingredients.filter(ing => !ing.prodId);
  const peapodAisles = aisleMaker(ingredients.filter(ing => !!ing.prodId));
  const offLineAisles = aisleMaker(unknownIngredients);
  return {
    ingredients,
    excludedIngredients: state.excludedIngredients,
    peapodIngredients,
    suggestedRecipes: state.suggestedRecipes,
    unknownIngredients,
    dirty: state.suggestedRecipesDirty,
    peapodAisles,
    offLineAisles,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleClearList() {
      dispatch(deleteRecipesFromList());
    },
    generateLeftoverSuggestions(peapodIngredients) {
      dispatch(fetchRecipeSuggestions(peapodIngredients));
    },
    handleRejectSuggestedRecipes() {
      dispatch(removeSuggestedRecipes());
      dispatch(dirtySuggestedRecipes());
    },
  };
};

export default connect(mapState, mapDispatch)(GroceryList);

GroceryList.propTypes = {
  excludedIngredients: PropTypes.array.isRequired,
  ingredients: PropTypes.array.isRequired,
  suggestedRecipes: PropTypes.array.isRequired,
  peapodIngredients: PropTypes.array.isRequired,
  handleClearList: PropTypes.func.isRequired,
  generateLeftoverSuggestions: PropTypes.func.isRequired,
  handleRejectSuggestedRecipes: PropTypes.func.isRequired,
  unknownIngredients: PropTypes.array.isRequired,
  dirty: PropTypes.bool.isRequired,
  peapodAisles: PropTypes.object.isRequired,
  offLineAisles: PropTypes.object.isRequired,
};
