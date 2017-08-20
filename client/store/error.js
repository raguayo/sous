const REMOVE_ERROR = 'REMOVE_ERROR';
const ADD_ERROR = 'ADD_ERROR';

const defaultError = null;

export const removeError = () => ({ type: REMOVE_ERROR });
export const addError = error => ({ type: ADD_ERROR, error });

export default function (state = defaultError, action) {
  switch (action.type) {
    case REMOVE_ERROR:
      return null;
    case ADD_ERROR:
      return action.error;
    default:
      return state;
  }
}
