import React from 'react';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import rootReducer from '../redux/reducers';

const renderWithRedux = (
  component,
  { initialState, store = createStore(
    combineReducers({ rootReducer }),
    initialState,
  ) } = {},
) => ({
  ...render(<Provider store={ store }>{component}</Provider>),
  store,
});

export default renderWithRedux;
