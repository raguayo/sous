import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Grid, Icon, Card, Image, Form } from "semantic-ui-react";
import { deleteRecipeFromList, updateRecipeQuantity } from "../store/";

const CurrRecipeCard = ({ recipe, handleDeleteCurr, handleUpdateQuantity }) => {
  return (
    <Grid>
      <Card style={{ width: "50%" }} fluid>
        <Card.Content>
          <Grid.Row style={{ paddingBottom: "8px" }}>
            <Grid.Column width={8} style={{display: "flex", justifyContent: "space-between"}}>
              <a href={recipe.recipeUrl} style={{ fontSize: "2em", paddingTop: "8px" }}>
                {recipe.title}
              </a>
                <div style={{display: "flex"}}>
              <Form>
                <Form.Input
                  floated="left"
                  icon="add to cart"
                  iconPosition="left"
                  style={{width: "5rem"}}
                  placeholder={recipe.grocerylist.quantity}
                  onChange={e => handleUpdateQuantity(recipe.id, e)}
                />
              </Form>
              <Icon
                floated="right"
                style={{fontSize: "1.5em", paddingTop: "8px", marginLeft: "8px"}}
                onClick={() => handleDeleteCurr(recipe.id)}
                name="trash outline"
              />
              </div>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Image
                src={`https://webknox.com/recipeImages/${recipe.imageUrl}`}
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
    recipe: ownProps.recipe
  };
};

const mapDispatch = dispatch => {
  return {
    handleDeleteCurr: id => dispatch(deleteRecipeFromList(id)),
    handleUpdateQuantity: (id, e) =>
      dispatch(updateRecipeQuantity(id, e.target.value))
  };
};

CurrRecipeCard.propTypes = {
  recipe: PropTypes.object.isRequired,
  handleDeleteCurr: PropTypes.func.isRequired,
  handleUpdateQuantity: PropTypes.func.isRequired
};

export default connect(mapState, mapDispatch)(CurrRecipeCard);
