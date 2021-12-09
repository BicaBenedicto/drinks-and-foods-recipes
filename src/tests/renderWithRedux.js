import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import { createStore } from 'redux';
import rootReducer from '../redux/reducers';

const renderWithRedux = (
  component,
  { initialState, store = createStore(
    rootReducer,
    initialState,
  ) } = {},
) => ({
  ...render(
    <BrowserRouter>
      <Provider store={ store }>
        {component}
      </Provider>
    </BrowserRouter>,
  ),
  store,
});

export default renderWithRedux;
