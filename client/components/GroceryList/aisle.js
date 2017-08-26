import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React from 'react';
import { Segment } from 'semantic-ui-react';
import { List } from './';

const styles = {
  textColor: {
    color: '#84643B',
    fontSize: '1.1rem',
    textAlign: 'center',
    fontWeight: '200',
  },
}

const Aisle = ({ aisles, aisleNames }) => {
  return (
    <Segment>
      {aisleNames.map((name) => {
        return (
          <Segment>
            <p style={styles.textColor}>{name}</p>
            <Segment.Group>
              {aisles[name].map((ingredient) => {
                return (
                  <Segment key={ingredient.id}>
                    <List ingredient={ingredient} />
                  </Segment>
                );
              })}
            </Segment.Group>
          </Segment>
        );
      })
      }
    </Segment>
  );
};

const mapState = (state, ownProps) => {
  const aisleNames = Object.keys(ownProps.aisles);
  return {
    aisles: ownProps.aisles,
    aisleNames,
  };
};

export default connect(mapState, null)(Aisle);

Aisle.propTypes = {
  aisles: PropTypes.object.isRequired,
  aisleNames: PropTypes.array.isRequired,
};
