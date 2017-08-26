import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React from 'react';
import { Container, Grid, Header, Segment, Modal, Input, Form, Accordion, Card, Image, Popup, Dimmer, Loader } from 'semantic-ui-react';
import { addItemsToPeapodCart, deleteRecipesFromList, textGroceryList, addSuggestedRecipes, removeSuggestedRecipes, dirtySuggestedRecipes } from '../../store';
import { getIngredients, addDisplayUnits, calculateLeftovers, filterPeapodIng, getLeftoverRecipes, getLeftoverRecipeDetails, hasSufficientQuantities, aisleMaker } from '../../utils';
import { List } from './';
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
  textColorLineThrough: {
    textDecoration: 'line-through',
    fontSize: '1.1rem',
  },
  textColorNoLineThrough: {
    textDecoration: 'none',
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
      peapodModalOpen: false,
      sendTextModalOpen: false,
    };
  }


  // componentDidMount() {
  //   console.log('In did mount: ', this.props.dirty);
  //   if (!this.props.dirty) {
  //     console.log('Running suggestion');
  //     this.props.generateLeftoverSuggestions(this.props.peapodIngredients);
  //   }
  // }

  handlePeapodModalClose = () => this.setState({ peapodModalOpen: false });
  handlePeapodModalOpen = () => this.setState({ peapodModalOpen: true });
  handleSendTextModalClose = () => this.setState({ sendTextModalOpen: false });
  handleSendTextModalOpen = () => this.setState({ sendTextModalOpen: true });

  render(props) {
    const { excludedIngredients, peapodIngredients, handleCartPurchase, handleClearList, handleSendText, suggestedRecipes, handleRejectSuggestedRecipes, unknownIngredients, peapodAisles, offLineAisles } = this.props;
    console.log('excluded', excludedIngredients, 'peapod', peapodIngredients, 'unknown', unknownIngredients, 'Aisle1', peapodAisles, 'aisle2', offLineAisles);

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
          {peapodIngredients.length || excludedIngredients.length ?
            <div style={styles.list}>
              <Segment.Group style={{ width: '75%', margin: 'auto' }}>
                <Segment>
                  <p style={styles.textColor}>Ingredients:</p>
                </Segment>
                <Segment.Group>
                  {/* {ingredients.filter(ing => !!ing.prodId).map((ingredient) => {
                    return (
                      <Segment key={ingredient.id}>
                        <List ingredient={ingredient} />
                      </Segment>
                    );
                  })} */}
                  <Modal
                    trigger={<button onClick={this.handlePeapodModalOpen} className="appButton">Add to Peapod Cart</button>}
                    basicSize="medium"
                    open={this.state.peapodModalOpen}
                    onClose={this.handlePeapodModalClose}
                  >
                    <Modal.Content>
                      <div>
                        <Grid
                          textAlign="center"
                          style={{ height: '100%' }}
                          verticalAlign="middle"
                        >
                          <Grid.Column style={{ maxWidth: 450 }}>
                            <Header as="h2" style={{ color: '#77a95f' }} textAlign="center">
                              Enter Peapod Login Credentials
                    </Header>
                            <Form
                              size="large"
                              onSubmit={e =>
                                handleCartPurchase(peapodIngredients, e, this.handlePeapodModalClose)}
                              name={name}
                            >
                              <Segment stacked>
                                <Form.Input
                                  name="username"
                                  fluid
                                  icon="id badge"
                                  iconPosition="left"
                                  placeholder="Name"
                                />
                                <Form.Input
                                  name="password"
                                  fluid
                                  icon="lock"
                                  iconPosition="left"
                                  placeholder="Password"
                                  type="password"
                                />
                                <Popup
                                  on="click"
                                  flowing
                                  style={{height: '150px', width: '200px' }}
                                  trigger={<button className="appButton" fluid size="large"> Submit </button>}
                                >
                                  <Popup.Content>
                                    <Dimmer active inverted>
                                      <Loader inverted>Loading</Loader>
                                    </Dimmer>
                                  </Popup.Content>
                                </Popup>
                                <button className="appButton" fluid onClick={this.handlePeapodModalClose}>
                                  Cancel
                              </button>
                              </Segment>
                            </Form>
                          </Grid.Column>
                        </Grid>
                      </div>
                    </Modal.Content>
                  </Modal>
                </Segment.Group>
                {unknownIngredients.length ?
                    <Segment.Group>
                      <Segment>
                        <p style={styles.textColor}>The following ingredients were not found on Peapod. You may have to buy these on your own.</p>
                      </Segment>
                      {unknownIngredients.map((ingredient) => {
                        return (
                          <Segment key={ingredient.id}>
                            <List ingredient={ingredient} />
                          </Segment>
                        );
                      })}
                    </Segment.Group>
                  : null
                }
                <button className="appButton" onClick={() => handleClearList()}>Clear list</button>
                <Modal
                  trigger={<button onClick={this.handleSendTextModalOpen} className="appButton">Text me my list</button>}
                  basic size="small"
                  open={this.state.sendTextModalOpen}
                  onClose={this.handleSendTextModalClose}
                  actions={[{ triggerClose: true }]}
                >
                  <Modal.Content>
                    <Form onSubmit={e => handleSendText(e, ingredients, excludedIngredients, this.handleSendTextModalClose)}>
                      <Input
                        name="number"
                        action={{ style: { backgroundColor: '#77a95f', color: 'white' }, labelPosition: 'left', icon: 'add', content: 'Submit' }}
                        placeholder="input your phone number"
                      />
                    </Form>
                  </Modal.Content>
                </Modal>
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
  const peapodAisles = aisleMaker(peapodIngredients);
  const offLineAisles = aisleMaker(unknownIngredients);
  return {
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
    handleCartPurchase(peapodItems, e, handlePeapodModalClose) {
      const itemArr = peapodItems.map((ingredientObj) => {
        return {
          id: ingredientObj.id,
          productId: ingredientObj.prodId,
          coupon: null,
          quantity: Math.ceil(ingredientObj.quantity / ingredientObj.size),
        };
      });
      const peapodLoginCreds = {
        username: e.target.username.value,
        password: e.target.password.value,
      };
      dispatch(addItemsToPeapodCart(itemArr, peapodLoginCreds))
        .then(() => {
          handlePeapodModalClose();
        })
        .catch(console.error);
    },
    handleClearList() {
      dispatch(deleteRecipesFromList());
    },
    generateLeftoverSuggestions(peapodIngredients) {
      const leftovers = calculateLeftovers(peapodIngredients);
      getLeftoverRecipes(leftovers)
        .then(leftoverRecipes => getLeftoverRecipeDetails(leftoverRecipes))
        .then(results => hasSufficientQuantities(leftovers, results))
        .then((suggRecipes) => {
          console.log('Sugg rec: ', suggRecipes);
          dispatch(addSuggestedRecipes(suggRecipes));
        })
        .catch(console.error);
    },
    handleSendText(e, ingredients, excludedIds, handleSendTextClose) {
      const number = e.target.number.value;
      let ingredientArr = ingredients.filter((ingredient) => {
        if (!excludedIds.includes(ingredient.id)) return ingredient;
      });
      ingredientArr = ingredientArr.map((ingredient) => {
        return [ingredient.displayQuantity, ingredient.displayUnit, ingredient.name];
      });
      dispatch(textGroceryList(number, ingredientArr));
      handleSendTextClose();
    },
    handleRejectSuggestedRecipes() {
      dispatch(removeSuggestedRecipes());
      dispatch(dirtySuggestedRecipes());
    },
  };
};

export default connect(mapState, mapDispatch)(GroceryList);

GroceryList.propTypes = {
  handleCartPurchase: PropTypes.func.isRequired,
  excludedIngredients: PropTypes.array.isRequired,
  ingredients: PropTypes.array.isRequired,
  suggestedRecipes: PropTypes.array.isRequired,
  peapodIngredients: PropTypes.array.isRequired,
  handleClearList: PropTypes.func.isRequired,
  generateLeftoverSuggestions: PropTypes.func.isRequired,
  handleSendText: PropTypes.func.isRequired,
  handleRejectSuggestedRecipes: PropTypes.func.isRequired,
  unknownIngredients: PropTypes.array.isRequired,
  dirty: PropTypes.bool.isRequired,
  peapodAisles: PropTypes.object.isRequired,
  offLineAisles: PropTypes.object.isRequired,
};
