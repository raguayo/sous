import React from 'react';
import PropTypes from 'prop-types';

const QuestionCount = (props) => {
  return (
    <div className="questionCount">
        Qeustion <span>{props.counter}</span> of <span>{props.total}</span>
      </div>
  );
}

QuestionCount.propTypes = {
  counter: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
};

export default QuestionCount;
