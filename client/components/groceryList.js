import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Container, Grid, Header, Segment, Icon, Checkbox, Button } from 'semantic-ui-react';
import { fetchGroceryList, peapodGroceryList } from '../store';
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
        <Button onClick={}>Add to Peapod Cart</Button>
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
  }
}

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(fetchGroceryList());
    },
    handleCartPurchase() {
      function handleAddToCartResponse(err, didSucceed) {
        if (err) throw err; // handle this error better
        if (didSucceed) {
          // open new tab a shift focus
          window.open()
          dispatch(peapodGroceryList());
        }
      }
      // create item Arr
      let itemArr = [];
      Object.keys(groceryList).forEach(key => {
        const itemObj = {};
        const gListItem = groceryList[key];
        itemObj.productId = gListItem.prodId;
        itemObj.quantity = gListItem.peapodQuantity;
        itemArr.push(itemObj);
      });
      // buy on peapod
      Peapod.addToCart(itemArr, handleAddToCartResponse)
    }
  }
}

export default connect(mapState, mapDispatch)(GroceryList);

GroceryList.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
};

