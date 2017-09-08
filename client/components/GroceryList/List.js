import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Grid, Checkbox } from 'semantic-ui-react';
import { postNewExcluded, deleteExcludedIngredient } from '../../store';

const styles = {
  textColorLineThrough: {
    textDecoration: 'line-through',
    fontSize: '1.1rem',
  },
  textColorNoLineThrough: {
    textDecoration: 'none',
    fontSize: '1.1rem',
  },
};

const List = ({ ingredient, excludedIngredients, handleExcludedIngredient }) => {
  return (

    <Grid>
      {excludedIngredients.indexOf(ingredient.id) !== -1
        ? <Grid.Column
          as={Checkbox}
          checked
          floated="left"
          width={13}
          verticalAlign="middle"
          style={styles.textColorLineThrough}
          onClick={e =>
            handleExcludedIngredient(excludedIngredients, ingredient.id)}
          label={`${ingredient.displayQuantity} ${ingredient.displayUnit} ${ingredient.name}`}
        />
        : <Grid.Column
          as={Checkbox}
          floated="left"
          width={13}
          verticalAlign="middle"
          style={styles.textColorNoLineThrough}
          onClick={e =>
            handleExcludedIngredient(excludedIngredients, ingredient.id)}
          label={`${ingredient.displayQuantity} ${ingredient.displayUnit} ${ingredient.name}`}
        />
      }
    </Grid>
  );
};

const mapState = (state, ownProps) => {
  return {
    ingredient: ownProps.ingredient,
    excludedIngredients: state.excludedIngredients,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleExcludedIngredient(excludedIngredients, ingredientId) {
      if (excludedIngredients.indexOf(ingredientId) < 0) {
        dispatch(postNewExcluded(ingredientId));
      } else {
        dispatch(deleteExcludedIngredient(ingredientId));
      }
    },
  }
}

export default connect(mapState, mapDispatch)(List);

List.propTypes = {
  ingredient: PropTypes.object.isRequired,
  excludedIngredients: PropTypes.array.isRequired,
  handleExcludedIngredient: PropTypes.func.isRequired,
};
