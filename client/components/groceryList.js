import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Container, Grid, Header, Segment, Icon, Checkbox } from 'semantic-ui-react';
import { fetchGroceryList } from '../store';
import { strikeThrough } from '../stylingUtilities';

class GroceryList extends Component {
  componentDidMount() {
    this.props.loadInitialData();
  }
  render() {
    const { ingredients } = this.props;
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
      </Container>
    );
  }
}

const styles = {
  header: {
    fontFamily: 'Satisfy',
  },
};

const mapState = (state) => {
  return {
    groceryList: state.groceryList,
    ingredients: state.groceryList ? Object.keys(state.groceryList) : [],
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(fetchGroceryList());
    },
  };
};

export default connect(mapState, mapDispatch)(GroceryList);

GroceryList.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  ingredients: PropTypes.array.isRequired,
  groceryList: PropTypes.object.isRequired,
};
