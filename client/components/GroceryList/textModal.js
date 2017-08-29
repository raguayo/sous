import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React from 'react';
import { Modal, Form, Input } from 'semantic-ui-react';
import { textGroceryList } from '../../store';

class TextModal extends React.Component {
  constructor() {
    super();
    this.state = {
      modalOpen: false,
    };
  }

  handleClose = () => this.setState({ modalOpen: false });
  handleOpen = () => this.setState({ modalOpen: true });

  render(props) {
    const { ingredients, excludedIngredients, handleSendText } = this.props;
    return (
      <Modal
        trigger={<button onClick={this.handleOpen} className="appButton">Text me my list</button>}
        basic size="small"
        open={this.state.modalOpen}
        onClose={this.handleClose}
        actions={[{ triggerClose: true }]}
      >
        <Modal.Content>
          <Form onSubmit={e => handleSendText(e, ingredients, excludedIngredients, this.handleClose)}>
            <Input
              name="number"
              action={{ style: { backgroundColor: '#77a95f', color: 'white' }, labelPosition: 'left', icon: 'add', content: 'Submit' }}
              placeholder="input your phone number"
            />
          </Form>
        </Modal.Content>
      </Modal>
    )
  }
}

const mapState = (state, ownProps) => {
  return {
    ingredients: ownProps.ingredients,
    excludedIngredients: ownProps.excludedIngredients,
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleSendText(e, ingredients, excludedIds, handleClose) {
      let number = e.target.number.value;
      number = number.toString();
      let ingredientArr = ingredients.filter((ingredient) => {
        if (!excludedIds.includes(ingredient.id)) return ingredient;
      });
      ingredientArr = ingredientArr.map((ingredient) => {
        return [ingredient.displayQuantity, ingredient.displayUnit, ingredient.name];
      });
      if (number.length === 10) {
        dispatch(textGroceryList(+number, ingredientArr));
        handleClose();
      } else if (number.length === 9) {
        '1'.concat(number)
        dispatch(textGroceryList(+number, ingredientArr));
        handleClose();
      } else {
        console.log('invalid number');
      }
    },
  };
};

export default connect(mapState, mapDispatch)(TextModal);

TextModal.propTypes = {
  ingredients: PropTypes.array.isRequired,
  excludedIngredients: PropTypes.array.isRequired,
  handleSendText: PropTypes.func.isRequired,
}
