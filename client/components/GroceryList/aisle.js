import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React from 'react';
import { Segment } from 'semantic-ui-react';
import { List } from './';

const styles = {
  textColor: {
    color: '#84643B',
    fontSize: '1.2rem',
    textAlign: 'center',
    fontWeight: '300',
    margin: 'auto',
  },
};

const Aisle = ({ aisles, aisleNames }) => {
  return (
    <Segment>
      {aisleNames.map((name) => {
        return (
          <Segment.Group >
            <p style={styles.textColor}>{name}</p>
            {aisles[name].map((ingredient) => {
              return (
                <Segment key={ingredient.id}>
                  <List ingredient={ingredient} />
                </Segment>
              );
            })}
          </Segment.Group>
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
