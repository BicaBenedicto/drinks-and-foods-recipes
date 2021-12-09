import { GET_EMAIL, SET_INGREDIENTE } from '../actions';

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
  case SET_INGREDIENTE:
    return ({
      ...state,
      foods: payload,
    });
  default:
    return state;
  }
}

export default user;
