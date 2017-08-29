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

const mapState = (state) => {
  return {
    ingredients: state.ingredients,
    excludedIngredients: state.excludedIngredients,
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleSendText(e, ingredients, excludedIds, handleClose) {
      const number = e.target.number.value;
      let ingredientArr = ingredients.filter((ingredient) => {
        if (!excludedIds.includes(ingredient.id)) return ingredient;
      });
      ingredientArr = ingredientArr.map((ingredient) => {
        return [ingredient.displayQuantity, ingredient.displayUnit, ingredient.name];
      });
      dispatch(textGroceryList(number, ingredientArr));
      handleClose();
    },
  };
};

export default connect(mapState, mapDispatch)(TextModal);

TextModal.propTypes = {
  ingredients: PropTypes.array.isRequired,
  excludedIngredients: PropTypes.array.isRequired,
  handleSendText: PropTypes.func.isRequired,
}
