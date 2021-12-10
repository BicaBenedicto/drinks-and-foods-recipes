import { SET_CATEGORIES, SET_MEALS } from '../actions';

const INITIAL_STATE = {
  list: [],
  categories: [],
};

function meal(state = INITIAL_STATE, { type, payload }) {
  switch (type) {
  case SET_CATEGORIES:
    return ({
      ...state,
      categories: payload,
    });
  case SET_MEALS:
    return ({
      ...state,
      list: payload,
    });
  default:
    return state;
  }
}

export default meal;
