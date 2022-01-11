import React from 'react';
import { screen, cleanup, fireEvent } from '@testing-library/react';
import { renderWithRouterAndStore } from './renderWithRouterAndRedux';
import App from '../App';
import fetchMock from './mocks/fetch';

const URL_MOCK = 'https://www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata';

const mockFetch = () => {
  jest.spyOn(global, 'fetch')
    .mockImplementation(() => fetchMock(URL_MOCK));
};

const FIND_ITEMS = {
  cardImg: '0-card-img',
  cardRecipe: '0-recipe-card',
  finishButton: 'finish-recipe-btn',
  receitasFeitas: '/receitas-feitas',
  comidaName: 'Spicy Arrabiata Penne',
};

const URL_ROUTE = (route) => ({ route });

describe('Testes de favorito e página de receitas favoritas', () => {
  beforeEach(mockFetch);

  afterEach(() => {
    cleanup();
  });

  beforeAll(() => {
    localStorage.clear();
  });

  it('a receita de comida é encerrada ao clicar no botão de finalizar', async () => {
    const { history } = renderWithRouterAndStore(<App />,
      URL_ROUTE('/comidas/15997/in-progress'));
    const finishButton = await screen.findByTestId(FIND_ITEMS.finishButton);
    expect(finishButton).toBeInTheDocument();

    const userIcon = await screen.findAllByTestId('item-list-li');
    userIcon.forEach((item) => fireEvent.click(item));

    expect(finishButton).toBeInTheDocument();

    fireEvent.click(finishButton);
    const { pathname } = history.location;

    expect(pathname).toBe(FIND_ITEMS.receitasFeitas);
  });

  it('a receita de comida mostra ao ir na pagina de receitas feitas', async () => {
    renderWithRouterAndStore(<App />, URL_ROUTE(FIND_ITEMS.receitasFeitas));

    const bebida = screen.getByText(FIND_ITEMS.comidaName);

    expect(bebida).toBeInTheDocument();
  });

  it('a receita de comida mostra ao ir na pagina de receitas feitas', async () => {
    renderWithRouterAndStore(<App />, URL_ROUTE(FIND_ITEMS.receitasFeitas));

    const comida = await screen.findByText(FIND_ITEMS.comidaName);

    expect(comida).toBeInTheDocument();

    const filterAll = screen.getByText('All');
    const filterDrinks = screen.getByText('Drinks');
    const filterFoods = screen.getByText('Foods');

    expect(filterAll).toBeInTheDocument();
    expect(filterFoods).toBeInTheDocument();
    expect(filterDrinks).toBeInTheDocument();

    fireEvent.click(filterDrinks);

    expect(comida).not.toBeInTheDocument();

    fireEvent.click(filterAll);

    const comida2 = await screen.findByText(FIND_ITEMS.comidaName);

    expect(comida2).toBeInTheDocument();
  });
});
