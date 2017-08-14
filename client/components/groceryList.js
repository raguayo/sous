import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Container, Grid, Header, Segment, Icon, Checkbox, Button } from 'semantic-ui-react';
import { fetchGroceryList, deleteRecipesFromList } from '../store';
import Peapod from '../../peapod/api';

class GroceryList extends Component {
  componentDidMount() {
    this.props.loadInitialData();
  }
  render() {
    const ingredients = this.props.groceryList ? Object.keys(this.props.groceryList) : [];
    return (
      <Container style={{ padding: '5em 0em' }}>
        <Header as="h2" style={styles.header} >Grocery List</Header>
        <Segment.Group>
          <Segment.Group>
            {
              ingredients.map((name) => {
                const ingredient = this.props.groceryList[name];
                return (
                  <Segment key={ingredient.id}>
                    <Grid>
                      <Grid.Column as={Checkbox} floated="left" width={13} verticalAlign="middle" label={ingredient.name} onClick={strikeThrough}> </Grid.Column>
                      <Grid.Column floated="right" width={3} textAlign="right"><Icon onClick={() => { console.log('hi') }} name="delete" /></Grid.Column>
                    </Grid>
                  </Segment>
                );
              })
            }
          </Segment.Group>
        </Segment.Group>
        <Button onClick={() => this.props.handleCartPurchase(this.props.groceryList)}>Add to Peapod Cart</Button>
      </Container>
    );
  }
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
    groceryList: state.groceryList,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(fetchGroceryList());
    },
    handleCartPurchase(groceryList) {
      const itemArr = [];
      Object.keys(groceryList).forEach((key) => {
        const gListItem = groceryList[key];
        const productId = gListItem.prodId;
        const quantToBuy = Math.ceiling(gListItem.quantity / gListItem.peapodQuantity);
        itemArr.push({ quantity: quantToBuy, productId });
      });

      Peapod.addToCart(itemArr, (err, didSucceed) => {
        if (err) throw err; // handle this error better
        if (didSucceed) {
          const newTab = window.open('https://www.peapod.com', '_blank');
          newTab.focus();
          dispatch(deleteRecipesFromList());
        }
      });
    },
  };
};

export default connect(mapState, mapDispatch)(GroceryList);

GroceryList.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  handleCartPurchase: PropTypes.func.isRequired,
  groceryList: PropTypes.object.isRequired,
};

