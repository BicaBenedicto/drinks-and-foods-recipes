import React from 'react';
import { screen, cleanup } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import renderWithRedux from './renderWithRedux';
import { renderWithRouterAndStore } from './renderWithRouterAndRedux';
import App from '../App';
import Comidas from '../pages/Comidas';
import Bebidas from '../pages/Bebidas';
import Explorar from '../pages/Explorar';
import ExplorarComidasArea from '../pages/ExplorarComidasArea';
import Perfil from '../pages/Perfil';
import ReceitasFavoritas from '../pages/ReceitasFavoritas';
import ReceitasFeitas from '../pages/ReceitasFeitas';
import fetchMock from './mocks/fetch';

const GET_BY = {
  header: (pageTitle = '') => screen.queryByRole('heading', {
    level: 1,
    name: pageTitle,
  }, '.header-page-title'),
  profileIcon: () => screen.queryByTestId('profile-top-btn', 'img'),
  searchIcon: () => screen.queryByTestId('search-top-btn', 'img'),
};

const TEST_PAGE = {
  headerTest: (pageTitle, bool = true) => {
    const { header } = GET_BY;
    if (!bool) return expect(header(pageTitle)).not.toBeInTheDocument();
    return expect(header(pageTitle)).toBeInTheDocument();
  },
  profileIconTest: (bool = true) => {
    const { profileIcon } = GET_BY;
    if (!bool) return expect(profileIcon()).not.toBeInTheDocument();
    return expect(profileIcon()).toBeInTheDocument();
  },
  searchIconTest: (bool = true) => {
    const { searchIcon } = GET_BY;
    if (!bool) return expect(searchIcon()).not.toBeInTheDocument();
    return expect(searchIcon()).toBeInTheDocument();
  },
};

const mockFetch = () => {
  jest.spyOn(global, 'fetch')
    .mockImplementation(fetchMock);
};

describe('Teste do Header na tela de', () => {
  beforeEach(mockFetch);
  afterEach(cleanup);
  it('o componente teste não aparece na tela de login', () => {
    renderWithRouter(<App />);
    const { headerTest, searchIconTest, profileIconTest } = TEST_PAGE;
    headerTest('', false);
    searchIconTest(false);
    profileIconTest(false);
  });

  it('o componente header aparece na página de comidas', () => {
    renderWithRedux(<Comidas />);
    const { headerTest, profileIconTest, searchIconTest } = TEST_PAGE;
    headerTest('Comidas');
    profileIconTest();
    searchIconTest();
  });

  it('o componente header não aparece na página de comida detalhadas', () => {
    renderWithRouterAndStore(<App />, '/comidas/31232');
    const { headerTest, profileIconTest, searchIconTest } = TEST_PAGE;
    headerTest('Comida', false);
    searchIconTest(false);
    profileIconTest(false);
  });

  it('o componente header não aparece na página de comida em progesso', () => {
    renderWithRouterAndStore(<App />, '/comidas/31232/in-progress');
    const { headerTest, profileIconTest, searchIconTest } = TEST_PAGE;
    headerTest('Comida', false);
    searchIconTest(false);
    profileIconTest(false);
  });

  it('o componente header aparece na página de bebidas', () => {
    renderWithRedux(<Bebidas />);
    const { headerTest, profileIconTest, searchIconTest } = TEST_PAGE;
    headerTest('Bebidas');
    profileIconTest();
    searchIconTest();
  });

  it('o componente header não aparece na página de Bebidas detalhadas', () => {
    renderWithRouterAndStore(<App />, '/bebidas/31232');
    const { headerTest, profileIconTest, searchIconTest } = TEST_PAGE;
    headerTest('Bebida', false);
    searchIconTest(false);
    profileIconTest(false);
  });

  it('o componente header não aparece na página de Bebida em progesso', () => {
    renderWithRouterAndStore(<App />, '/bebidas/31232/in-progress');
    const { headerTest, profileIconTest, searchIconTest } = TEST_PAGE;
    headerTest('Bebida', false);
    searchIconTest(false);
    profileIconTest(false);
  });

  it('o componente header aparece na página de explorar', () => {
    renderWithRouter(<Explorar />);
    const { headerTest, profileIconTest, searchIconTest } = TEST_PAGE;
    headerTest('Explorar');
    profileIconTest();
    searchIconTest(false);
  });

  it('o componente header aparece na página de explorar comidas', () => {
    renderWithRouterAndStore(<App />, { route: '/explorar/comidas' });

    const { headerTest, profileIconTest, searchIconTest } = TEST_PAGE;
    headerTest('Explorar Comidas');
    profileIconTest();
    searchIconTest(false);
  });

  it('o componente header aparece na página de explorar Bebidas', () => {
    renderWithRouterAndStore(<App />, { route: '/explorar/bebidas' });
    const { headerTest, profileIconTest, searchIconTest } = TEST_PAGE;
    headerTest('Explorar Bebidas');
    profileIconTest();
    searchIconTest(false);
  });

  it('o componente header aparece na página de explorar origem', () => {
    renderWithRedux(<ExplorarComidasArea />);
    const { headerTest, profileIconTest, searchIconTest } = TEST_PAGE;
    headerTest('Explorar Origem');
    profileIconTest();
    searchIconTest();
  });

  it('o componente header aparece na página de perfil', () => {
    renderWithRedux(<Perfil />);
    const { headerTest, profileIconTest, searchIconTest } = TEST_PAGE;
    headerTest('Perfil');
    profileIconTest();
    searchIconTest(false);
  });

  it('o componente header aparece na página de receitas favoritas', () => {
    renderWithRouter(<ReceitasFavoritas />);
    const { headerTest, profileIconTest, searchIconTest } = TEST_PAGE;
    headerTest('Receitas Favoritas');
    profileIconTest();
    searchIconTest(false);
  });

  it('o componente header aparece na página de receitas feitas', () => {
    renderWithRouter(<ReceitasFeitas />);
    const { headerTest, profileIconTest, searchIconTest } = TEST_PAGE;
    headerTest('Receitas Feitas');
    profileIconTest();
    searchIconTest(false);
  });
});
