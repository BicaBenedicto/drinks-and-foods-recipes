import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { composeWithDevTools } from 'redux-devtools-extension';
import { render } from '@testing-library/react';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../redux/reducers';

const renderWithRedux = (
  component,
  { initialState, store = createStore(
    rootReducer, composeWithDevTools(
      applyMiddleware(thunk),
    ),
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
