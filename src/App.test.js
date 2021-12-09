import React from 'react';
import renderWithRouter from './tests/renderWithRouter'
import App from './App';

test('Farewell, front-end', () => {
  const { getByText } = renderWithRouter(<App />);
  const linkElement = getByText(/TRYBE/i);
  expect(linkElement).toBeInTheDocument();
});
