import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';

const EMAIL = 'trybe@trybe.com';
const INCORRECT_EMAIL = 'trybetrybe';
const PASSWORD = '123456';
const INCORRECT_PASSWORD = '12345';

const components = () => ({
  inputEmail: screen.getByTestId('email-input'),
  inputPassword: screen.getByTestId('password-input'),
  buttonSumbit: screen.getByTestId('login-submit-btn'),
});

describe('Tela de Login', () => {
  test(`Verfica se o botão esta desativado caso o email for inválido
  e se a senha deve tiver 6 caracteres ou menos`, () => {
    renderWithRouter(<App />);
    const { inputEmail, inputPassword, buttonSumbit } = components();
    userEvent.type(inputEmail, INCORRECT_EMAIL);
    userEvent.type(inputPassword, INCORRECT_PASSWORD);
    expect(buttonSumbit).toBeInTheDocument();
    expect(buttonSumbit.disabled).toBe(true);
  });

  test(`Verfica se o botão deve estar ativado se o email
   e a senha forem válidos`, () => {
    renderWithRouter(<App />);
    const { inputEmail, inputPassword, buttonSumbit } = components();
    userEvent.type(inputEmail, EMAIL);
    userEvent.type(inputPassword, PASSWORD);
    expect(buttonSumbit).toBeInTheDocument();
    expect(buttonSumbit.disabled).toBe(false);
  });

  test(`Após a submissão mealsToken e cocktailsToken devem estar salvos em 
  localStorage`, () => {
    renderWithRouter(<App />);
    const { inputEmail, inputPassword, buttonSumbit } = components();
    userEvent.type(inputEmail, EMAIL);
    userEvent.type(inputPassword, PASSWORD);
    userEvent.click(buttonSumbit);
    const mealsToken = localStorage.getItem('mealsToken');
    const cocktailsToken = localStorage.getItem('cocktailsToken');
    expect(mealsToken).toBe('1');
    expect(cocktailsToken).toBe('1');
  });

  test(`Verifica se após a submissão a chave user deve estar salva em 
  localStorage`, () => {
    renderWithRouter(<App />);
    const { inputEmail, inputPassword, buttonSumbit } = components();
    userEvent.type(inputEmail, EMAIL);
    userEvent.type(inputPassword, PASSWORD);
    userEvent.click(buttonSumbit);
    const user = JSON.parse(localStorage.getItem('user'));
    expect(user).toEqual({ email: EMAIL });
  });

  test('Verifica se rota muda para a tela principal de receitas de comidas', () => {
    renderWithRouter(<App />);
    const { inputEmail, inputPassword, buttonSumbit } = components();
    userEvent.type(inputEmail, EMAIL);
    userEvent.type(inputPassword, PASSWORD);
    userEvent.click(buttonSumbit);
    const pageFood = screen.getByText(/pagina de comidas/i);
    expect(pageFood).toBeInTheDocument();
  });
});
