import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React from 'react';
import { Modal, Grid, Form, Segment, Popup, Dimmer, Loader, Header } from 'semantic-ui-react';
import { addItemsToPeapodCart } from '../../store';

class PurchaseModal extends React.Component {
  constructor() {
    super();
    this.state = {
      modalOpen: false,
    };
  }

  handlePeapodModalClose = () => this.setState({ modalOpen: false });
  handlePeapodModalOpen = () => this.setState({ modalOpen: true });

  render() {
    const { peapodIngredients, handleCartPurchase } = this.props;
    return (
      <Modal
        trigger={<button onClick={this.handlePeapodModalOpen} className="appButton">Add to Peapod Cart</button>}
        basicSize="medium"
        open={this.state.modalOpen}
        onClose={this.handlePeapodModalClose}
      >
        <Modal.Content>
          <div>
            <Grid
              textAlign="center"
              style={{ height: '100%' }}
              verticalAlign="middle"
            >
              <Grid.Column style={{ maxWidth: 450 }}>
                <Header as="h2" style={{ color: '#77a95f' }} textAlign="center">
                  Enter Peapod Login Credentials
                </Header>
                <Form
                  size="large"
                  onSubmit={e =>
                    handleCartPurchase(peapodIngredients, e, this.handlePeapodModalClose)}
                  name={name}
                >
                  <Segment stacked>
                    <Form.Input
                      name="username"
                      fluid
                      icon="id badge"
                      iconPosition="left"
                      placeholder="Name"
                    />
                    <Form.Input
                      name="password"
                      fluid
                      icon="lock"
                      iconPosition="left"
                      placeholder="Password"
                      type="password"
                    />
                    <Popup
                      on="click"
                      flowing
                      style={{ height: '150px', width: '200px' }}
                      trigger={<button className="appButton" fluid size="large"> Submit </button>}
                    >
                      <Popup.Content>
                        <Dimmer active inverted>
                          <Loader inverted>Loading</Loader>
                        </Dimmer>
                      </Popup.Content>
                    </Popup>
                    <button className="appButton" fluid onClick={this.handlePeapodModalClose}>
                      Cancel
                    </button>
                  </Segment>
                </Form>
              </Grid.Column>
            </Grid>
          </div>
        </Modal.Content>
      </Modal>
    );
  }
}

const mapState = (state, ownProps) => {
  return {
    peapodIngredients: ownProps.peapodIngredients,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleCartPurchase(peapodItems, e, handlePeapodModalClose) {
      const itemArr = peapodItems.map((ingredientObj) => {
        return {
          id: ingredientObj.id,
          productId: ingredientObj.prodId,
          coupon: null,
          quantity: Math.ceil(ingredientObj.quantity / ingredientObj.size),
        };
      });
      const peapodLoginCreds = {
        username: e.target.username.value,
        password: e.target.password.value,
      };
      dispatch(addItemsToPeapodCart(itemArr, peapodLoginCreds))
        .then(() => {
          handlePeapodModalClose();
        })
        .catch(console.error);
    },
  };
};

export default connect(mapState, mapDispatch)(PurchaseModal);

PurchaseModal.propTypes = {
  peapodIngredients: PropTypes.array.isRequired,
  handleCartPurchase: PropTypes.func.isRequired,
};
