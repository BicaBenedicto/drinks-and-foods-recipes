import { GET_EMAIL } from '../actions';

const INITIAL_STATE = {
  email: '',
};

function user(state = INITIAL_STATE, { type, payload }) {
  switch (type) {
  case GET_EMAIL:
    return ({
      ...state,
      email: payload,
    });
  default:
    return state;
  }
}

export default user;
