import { SET_CATEGORIES, SET_MEALS, SET_MEAL_OR_DRINK } from '../actions';

const INITIAL_STATE = {
  item: {},
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
  case SET_MEAL_OR_DRINK:
    return ({
      ...state,
      item: payload,
    });
  default:
    return state;
  }
}

export default meal;
