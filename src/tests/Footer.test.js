import React from 'react';
import { screen, cleanup, fireEvent } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import renderWithRedux from './renderWithRedux';
import { renderWithRouterAndStore } from './renderWithRouterAndRedux';
import App from '../App';
import Explorar from '../pages/Explorar';
import ExplorarComidasArea from '../pages/ExplorarComidasArea';
import Perfil from '../pages/Perfil';
import fetchMock from './mocks/fetch';

const GET_BY = {
  drinksIcon: () => screen.queryByTestId('drinks-bottom-btn', 'img'),
  exploreIcon: () => screen.queryByTestId('explore-bottom-btn', 'img'),
  foodsIcon: () => screen.queryByTestId('food-bottom-btn', 'img'),
  footer: () => screen.queryByTestId('footer'),
};

const TEST_PAGE = {
  footerTest: (bool = true) => {
    const { footer } = GET_BY;
    if (!bool) return expect(footer()).not.toBeInTheDocument();
    return expect(footer()).toBeInTheDocument();
  },
  drinksTest: (bool = true) => {
    const { drinksIcon } = GET_BY;
    if (!bool) return expect(drinksIcon()).not.toBeInTheDocument();
    return expect(drinksIcon()).toBeInTheDocument();
  },
  exploreTest: (bool = true) => {
    const { exploreIcon } = GET_BY;
    if (!bool) return expect(exploreIcon()).not.toBeInTheDocument();
    return expect(exploreIcon()).toBeInTheDocument();
  },
  foodsTest: (bool = true) => {
    const { foodsIcon } = GET_BY;
    if (!bool) return expect(foodsIcon()).not.toBeInTheDocument();
    return expect(foodsIcon()).toBeInTheDocument();
  },
};

const URL_ROUTE = (route) => ({ route });

describe('Teste do footer na tela de', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch')
      .mockImplementation(fetchMock);
  });
  afterEach(cleanup);

  it('o componente teste não aparece na tela de login', async () => {
    renderWithRouter(<App />);
    const { footerTest, drinksTest, exploreTest, foodsTest } = TEST_PAGE;
    footerTest(false);
    drinksTest(false);
    exploreTest(false);
    foodsTest(false);
  });

  it('o componente footer aparece na página de comidas', () => {
    renderWithRouterAndStore(<App />, URL_ROUTE('/comidas'));
    const { footerTest, drinksTest, exploreTest, foodsTest } = TEST_PAGE;
    footerTest();
    drinksTest();
    exploreTest();
    foodsTest();
  });

  it('o componente footer não aparece na página de comida detalhadas', () => {
    renderWithRouterAndStore(<App />, URL_ROUTE('/comidas/52977'));
    const { footerTest, drinksTest, exploreTest, foodsTest } = TEST_PAGE;
    footerTest(false);
    drinksTest(false);
    exploreTest(false);
    foodsTest(false);
  });

  it('o componente footer não aparece na página de comida em progesso', () => {
    renderWithRouterAndStore(<App />, URL_ROUTE('/comidas/52977/in-progress'));
    const { footerTest, drinksTest, exploreTest, foodsTest } = TEST_PAGE;
    footerTest(false);
    drinksTest(false);
    exploreTest(false);
    foodsTest(false);
  });

  it('o componente footer aparece na página de bebidas', () => {
    renderWithRouterAndStore(<App />, URL_ROUTE('/bebidas'));
    const { footerTest, drinksTest, exploreTest, foodsTest } = TEST_PAGE;
    footerTest();
    drinksTest();
    exploreTest();
    foodsTest();
  });

  it('o componente footer não aparece na página de Bebidas detalhadas', () => {
    renderWithRouterAndStore(<App />, URL_ROUTE('/bebidas/52977'));
    const { footerTest, drinksTest, exploreTest, foodsTest } = TEST_PAGE;
    footerTest(false);
    drinksTest(false);
    exploreTest(false);
    foodsTest(false);
  });

  it('o componente footer não aparece na página de Bebida em progesso', () => {
    renderWithRouterAndStore(<App />, '/bebidas/52977/in-progress');
    const { footerTest, drinksTest, exploreTest, foodsTest } = TEST_PAGE;
    footerTest(false);
    drinksTest(false);
    exploreTest(false);
    foodsTest(false);
  });

  it('o componente footer aparece na página de explorar', () => {
    renderWithRouter(<Explorar />);
    const { footerTest, drinksTest, exploreTest, foodsTest } = TEST_PAGE;
    footerTest();
    drinksTest();
    exploreTest();
    foodsTest();
  });

  it('o componente footer aparece na página de explorar comidas', () => {
    renderWithRouterAndStore(<App />, URL_ROUTE('/explorar/comidas'));

    const { footerTest, drinksTest, exploreTest, foodsTest } = TEST_PAGE;
    footerTest();
    drinksTest();
    exploreTest();
    foodsTest();
  });

  it('o componente footer aparece na página de explorar Bebidas', () => {
    renderWithRouterAndStore(<App />, URL_ROUTE('/explorar/bebidas'));
    const { footerTest, drinksTest, exploreTest, foodsTest } = TEST_PAGE;
    footerTest();
    drinksTest();
    exploreTest();
    foodsTest();
  });

  it('o componente footer aparece na página de explorar origem', () => {
    renderWithRedux(<ExplorarComidasArea />);
    const { footerTest, drinksTest, exploreTest, foodsTest } = TEST_PAGE;
    footerTest();
    drinksTest();
    exploreTest();
    foodsTest();
  });

  it('o componente footer aparece na página de perfil', () => {
    renderWithRedux(<Perfil />);
    const { footerTest, drinksTest, exploreTest, foodsTest } = TEST_PAGE;
    footerTest();
    drinksTest();
    exploreTest();
    foodsTest();
  });

  it('o componente footer aparece na página de receitas favoritas', () => {
    renderWithRouterAndStore(<App />, URL_ROUTE('/receitas-favoritas'));
    const { footerTest, drinksTest, exploreTest, foodsTest } = TEST_PAGE;
    footerTest(false);
    drinksTest(false);
    exploreTest(false);
    foodsTest(false);
  });

  it('o componente footer aparece na página de receitas feitas', () => {
    renderWithRouterAndStore(<App />, URL_ROUTE('/receitas-feitas'));
    const { footerTest, drinksTest, exploreTest, foodsTest } = TEST_PAGE;
    footerTest(false);
    drinksTest(false);
    exploreTest(false);
    foodsTest(false);
  });

  it('o componente footer redireciona para os lugares corretos', () => {
    const { history } = renderWithRouterAndStore(<App />, URL_ROUTE('/comidas'));
    const { footerTest, drinksTest, exploreTest, foodsTest } = TEST_PAGE;

    footerTest();
    drinksTest();
    exploreTest();
    foodsTest();

    const { drinksIcon, foodsIcon, exploreIcon } = GET_BY;

    let localActual = history.location.pathname;

    expect(localActual).toBe('/comidas');

    fireEvent.click(drinksIcon());

    localActual = history.location.pathname;

    expect(localActual).toBe('/bebidas');

    fireEvent.click(exploreIcon());

    localActual = history.location.pathname;

    expect(localActual).toBe('/explorar');

    fireEvent.click(foodsIcon());

    localActual = history.location.pathname;

    expect(localActual).toBe('/comidas');
  });
});
