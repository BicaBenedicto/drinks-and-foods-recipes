import { screen } from '@testing-library/react';
import React from 'react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndStore } from './renderWithRouterAndRedux';
import App from '../App';

const components = () => ({
  titleEmail: screen.getByTestId('profile-email'),
  doneBtn: screen.getByTestId('profile-done-btn'),
  favoriteBtn: screen.getByTestId('profile-favorite-btn'),
  exitBtn: screen.getByTestId('profile-logout-btn'),
});

const URL = (route) => ({ route });

describe('Testa tela de perfil', () => {
  test('Testa se o email é exibido na tela', async () => {
    renderWithRouterAndStore(<App />, URL('/perfil'));
    const { titleEmail } = components();
    expect(titleEmail).toBeInTheDocument();
  });

  test('Testa se o botão de receitas feitas é exibido na tela', async () => {
    renderWithRouterAndStore(<App />, URL('/perfil'));
    const { doneBtn } = components();
    expect(doneBtn).toBeInTheDocument();
  });

  test(
    `Testa se ao clicar no botão de receitas feitas,
     renderiza o componente "ReceitasFeitas"`,
    async () => {
      renderWithRouterAndStore(<App />, URL('/perfil'));
      const { doneBtn } = components();
      userEvent.click(doneBtn);
      const emptyMessage = screen.getByTestId('empty-message');
      expect(emptyMessage).toBeInTheDocument();
    },
  );

  test('Testa se o botão de receitas favoritas é exibido na tela', async () => {
    renderWithRouterAndStore(<App />, URL('/perfil'));
    const { favoriteBtn } = components();
    expect(favoriteBtn).toBeInTheDocument();
  });

  test(
    `Testa se ao clicar no botão de receitas favoritas,
     renderiza o componente "ReceitasFavoritas"`,
    async () => {
      renderWithRouterAndStore(<App />, URL('/perfil'));
      const { favoriteBtn } = components();
      userEvent.click(favoriteBtn);
      const emptyMessage = screen.getByTestId('message-empty');
      expect(emptyMessage).toBeInTheDocument();
    },
  );

  test('Testa se o botão de "Sair" é exibido na tela', async () => {
    renderWithRouterAndStore(<App />, URL('/perfil'));
    const { exitBtn } = components();
    expect(exitBtn).toBeInTheDocument();
  });

  test('Testa se ao clicar no botão "Sair", renderiza o componente "Login"', async () => {
    renderWithRouterAndStore(<App />, URL('/perfil'));
    const { exitBtn } = components();
    userEvent.click(exitBtn);
    const submitBtn = screen.getByTestId('login-submit-btn');
    expect(submitBtn).toBeInTheDocument();
  });
});
