import React from 'react';
import userEvent from '@testing-library/user-event';
import { cleanup, screen } from '@testing-library/react';
import App from '../App';
import fetchMock from './mocks/fetch';
import { renderWithRouterAndStore } from './renderWithRouterAndRedux';

const SEARCH = 'a';
const FOOD = 'Arrabiata';
const BRIE = 'Brie';
const buttonTop = () => (screen.getByTestId('search-top-btn'));

const components = () => ({
  ingredient: screen.getByTestId('ingredient-search-radio'),
  nameSearch: screen.getByTestId('name-search-radio'),
  firstLetter: screen.getByTestId('first-letter-search-radio'),
  buttonSearch: screen.getByTestId('exec-search-btn'),
  inputSearch: screen.getByTestId('search-input'),
});

const url = (route) => ({ route });

describe('Header Search Bar', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch')
      .mockImplementation(fetchMock);
  });
  afterEach(cleanup);

  test(`Deve existir os data-testids tanto da barra de busca quanto de todos os 
  radio-buttons.`, () => {
    renderWithRouterAndStore(<App />, url('/comidas'));

    userEvent.click(buttonTop());
    const {
      inputSearch,
      firstLetter,
      buttonSearch,
      nameSearch,
      ingredient } = components();
    expect(inputSearch).toBeInTheDocument();
    expect(firstLetter).toBeInTheDocument();
    expect(buttonSearch).toBeInTheDocument();
    expect(nameSearch).toBeInTheDocument();
    expect(ingredient).toBeInTheDocument();
  });

  test(`Redirecione para a tela de detalhes da receita caso apenas uma receita
   seja encontrada, com o ID da mesma na URL`, async () => {
    renderWithRouterAndStore(<App />, url('/comidas'));
    buttonTop();
    userEvent.click(buttonTop());
    const {
      inputSearch,
      buttonSearch,
      nameSearch,
    } = components();
    userEvent.type(inputSearch, FOOD);
    userEvent.click(nameSearch);
    userEvent.click(buttonSearch);
    const titleRecipe = await screen.findByText('Spicy Arrabiata Penne');
    expect(titleRecipe).toBeInTheDocument();
  });

  test('Pesquisa por ingrediente', async () => {
    renderWithRouterAndStore(<App />, url('/comidas'));
    buttonTop();
    userEvent.click(buttonTop());
    const {
      inputSearch,
      buttonSearch,
      ingredient,
    } = components();
    userEvent.type(inputSearch, BRIE);
    userEvent.click(ingredient);
    userEvent.click(buttonSearch);
    const resultFood = await screen.findByText('Corba');
    expect(resultFood).toBeInTheDocument();
  });

  test('Pesquisa por ingrediente', async () => {
    renderWithRouterAndStore(<App />, url('/comidas'));
    buttonTop();
    userEvent.click(buttonTop());
    const {
      inputSearch,
      buttonSearch,
      firstLetter,
    } = components();
    userEvent.type(inputSearch, SEARCH);
    userEvent.click(firstLetter);
    userEvent.click(buttonSearch);
    const resultFood = await screen.findByText('Corba');
    expect(resultFood).toBeInTheDocument();
  });
});
