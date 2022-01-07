import React from 'react';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { applyMiddleware, createStore } from 'redux';
import { render } from '@testing-library/react';

import reducer from '../redux/reducers';
import ProviderHook from '../services/Provider';

export const getStore = (initialState) => {
  if (!initialState) return createStore(reducer, applyMiddleware(thunk));
  return createStore(reducer, initialState, applyMiddleware(thunk));
};

export const renderWithRouterAndStore = (component, routeConfigs = {}, initialState) => {
  const route = routeConfigs.route || '/';
  const store = getStore(initialState);
  const history = routeConfigs.history
    || createMemoryHistory({ initialEntries: [route] });

  return {
    ...render(
      <ProviderHook>
        <Provider store={ store }>
          <Router history={ history }>{component}</Router>
        </Provider>
      </ProviderHook>,
    ),
    history,
    store,
  };
};
