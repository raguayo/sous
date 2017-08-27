import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Grid, Icon, Card, Image, Form } from 'semantic-ui-react';
import { deleteRecipeFromList, updateRecipeQuantity } from '../store';

const styles = {
  row: {
    paddingBottom: '8px',
  },
  column: {
    display: 'table',
    justifyxContent: 'space-between',
  },
  title: {
    fontSize: '1.5em',
    paddingTop: '4px',
  },
  quantity: {
    width: '5rem',
  },
  trash: {
    fontSize: '1.5em',
    paddingTop: '8px',
    marginLeft: '8px',
  },
  flex: {
    display: 'flex',
  },
};

const CurrRecipeCard = ({ recipe, handleDeleteCurr, handleUpdateQuantity }) => {
  const imageSrc = recipe.imageUrl.includes('http') ? recipe.imageUrl : `https://webknox.com/recipeImages/${recipe.imageUrl}`;
  return (
    <Card style={{ padding: '1em 1em 1em 1em' }}>
      <Image
        src={imageSrc}
        width="300px"
        height="200px"
        style={{ overflow: 'auto' }}
      />
      <Card.Content style={{ paddingBottom: '40px' }}>
        <Card.Header>
          <a href={recipe.recipeUrl} style={styles.title}>
            {recipe.title}
          </a>
        </Card.Header>
        <div />
        <Card.Description>
          <div
            style={{
              float: 'right',
              display: 'flex',
              position: 'absolute',
              bottom: '8px',
              right: '8px',
            }}
          >
            <Form>
              <Form.Input
                floated="left"
                icon="add to cart"
                iconPosition="left"
                style={styles.quantity}
                placeholder={recipe.grocerylist.quantity}
                onChange={e => handleUpdateQuantity(recipe.id, e)}
              />
            </Form>
            <Icon
              style={styles.trash}
              onClick={() => handleDeleteCurr(recipe.id)}
              name="trash outline"
            />
          </div>
        </Card.Description>
      </Card.Content>
    </Card>
  );
};

const mapState = (state, ownProps) => {
  return {
    recipe: ownProps.recipe,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleDeleteCurr: id => dispatch(deleteRecipeFromList(id)),
    handleUpdateQuantity: (id, e) =>
      dispatch(updateRecipeQuantity(id, e.target.value)),
  };
};

CurrRecipeCard.propTypes = {
  recipe: PropTypes.object.isRequired,
  handleDeleteCurr: PropTypes.func.isRequired,
  handleUpdateQuantity: PropTypes.func.isRequired,
};

export default connect(mapState, mapDispatch)(CurrRecipeCard);
