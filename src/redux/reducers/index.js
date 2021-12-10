import { combineReducers } from 'redux';
import user from './user';
import meal from './meal';

const rootReducer = combineReducers({
  user,
  meal,
});

export default rootReducer;
