import React from 'react';
import { screen, cleanup } from '@testing-library/react';
import { renderWithRouterAndStore } from './renderWithRouterAndRedux';
import App from '../App';
import fetchMock from './mocks/fetch';

const URL_MOCK = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list';

const URL_ROUTE = (route) => ({ route });

const FIND_ITEMS = {
  cardImg: '0-card-img',
  cardRecipe: '0-ingredient-card',
  cardName: '0-card-name',
  explorarIngredientes: '/explorar/comidas/ingredientes',
};

describe('Testes de favorito e página de receitas favoritas', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch')
      .mockImplementation(() => fetchMock(URL_MOCK));
  });

  afterEach(() => {
    cleanup();
  });

  beforeAll(() => {
    localStorage.clear();
  });

  it('a receita de comida é encerrada ao clicar no botão de finalizar', async () => {
    renderWithRouterAndStore(<App />,
      URL_ROUTE(FIND_ITEMS.explorarIngredientes));
    const cardIngredient = await screen.findByTestId(FIND_ITEMS.cardRecipe);
    expect(cardIngredient).toBeInTheDocument();

    const cardImg = await screen.findByTestId(FIND_ITEMS.cardImg);
    expect(cardImg).toBeInTheDocument();

    const cardName = await screen.findByTestId(FIND_ITEMS.cardName);
    expect(cardName).toBeInTheDocument();
  });
});
