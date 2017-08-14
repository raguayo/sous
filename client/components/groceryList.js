import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Container, Grid, Header, Segment, Icon, Checkbox } from 'semantic-ui-react';
import { fetchGroceryList } from '../store';

class GroceryList extends Component {
  componentDidMount() {
    this.props.loadInitialData();
  }
  render() {
    // this logic can be thrown into the mapping of props
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
      </Container>
    );
  }
}

/*
for both the styles object and strikeThrough function - both of these are concerned
primarily with style and UI. I would, once again, try looking into scoped css with
webpack css-loaders. Also, the strikeThrough funciton seems reusable. It could be
abstracted into its own file, perhaps with other similar UI-related functionalities
that you can import across various components!
*/

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
    }
  }
}

export default connect(mapState, mapDispatch)(GroceryList);

GroceryList.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
};
