import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';
import ProviderHook from '../services/Provider';

const renderWithRouter = (component) => {
  const history = createMemoryHistory();
  return ({
    ...render(
      <ProviderHook>
        <Router history={ history }>
          {component}
        </Router>
      </ProviderHook>,
    ),
    history,
  });
};
export default renderWithRouter;
