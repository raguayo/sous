import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Grid, Icon, Card, Image, Form } from 'semantic-ui-react';
import { deleteRecipeFromList, updateRecipeQuantity } from '../store';

const CurrRecipeCard = ({ recipe, handleDeleteCurr, handleUpdateQuantity }) => {
  const imageSrc = recipe.imageUrl.includes('http') ? recipe.imageUrl : `https://webknox.com/recipeImages/${recipe.imageUrl}`;
  return (
    <Grid>
      <Card>
        <Card.Content>
          <Grid.Row style={styles.row}>
            <Grid.Column width={8} style={styles.column}>
              <a href={recipe.recipeUrl} style={styles.title}>
                {recipe.title}
              </a>
              <div style={styles.flex}>
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
                  floated="right"
                  style={styles.trash}
                  onClick={() => handleDeleteCurr(recipe.id)}
                  name="trash outline"
                />
              </div>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Image
                src={imageSrc}
                floated="left"
                width="100%"
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column />
            <Grid.Column floated="right" />
          </Grid.Row>
        </Card.Content>
      </Card>
    </Grid>
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

const styles = {
  row: {
    paddingBottom: '8px',
  },
  column: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: '1.5em',
    paddingTop: '8px',
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
