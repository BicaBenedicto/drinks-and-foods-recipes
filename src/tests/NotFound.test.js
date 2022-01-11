import { screen } from '@testing-library/react';
import React from 'react';
import { renderWithRouterAndStore } from './renderWithRouterAndRedux';
import App from '../App';

const URL = (route) => ({ route });

describe('Testa tela de not found', () => {
  it('a página possui o texto que é para ser exibido na tela', async () => {
    renderWithRouterAndStore(<App />, URL('/explorar/bebidas/area'));
    const titleEmail = await screen.findByText('Not Found');
    expect(titleEmail).toBeInTheDocument();
  });
});
