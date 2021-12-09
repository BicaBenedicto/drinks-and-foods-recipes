import React from 'react';
import { screen } from '@testing-library/react';
import { fireEvent } from '@testing-library/dom';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import Comidas from '../pages/Comidas';
import ComidaDetails from '../pages/ComidaDetails';
import Bebidas from '../pages/Bebidas';
import BebidaDetails from '../pages/BebidaDetails';
import ComidaInProgress from '../pages/ComidaInProgress';
import BebidaInProgress from '../pages/BebidaInProgress';
import Explorar from '../pages/Explorar';
import ExplorarComidas from '../pages/ExplorarComidas';
import ExplorarBebidas from '../pages/ExplorarBebidas';
import ExplorarIngredientes from '../pages/ExplorarIngredientes';
import ExplorarComidasArea from '../pages/ExplorarComidasArea';
import Perfil from '../pages/Perfil';
import ReceitasFavoritas from '../pages/ReceitasFavoritas';
import ReceitasFeitas from '../pages/ReceitasFeitas';

const GET_BY = {
  header: (pageTitle = '') => screen.queryByRole('heading', {
    level: 1,
    name: pageTitle,
  }, 'header'),
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

describe('Teste do Header na tela de', () => {
  it('o componente teste não aparece na tela de login', () => {
    renderWithRouter(<App />);
    const { headerTest, searchIconTest, profileIconTest } = TEST_PAGE;
    headerTest('', false);
    searchIconTest(false);
    profileIconTest(false);
  });

  it('o componente header aparece na página de comidas', () => {
    renderWithRouter(<Comidas />);
    const { headerTest, profileIconTest, searchIconTest } = TEST_PAGE;
    headerTest('Comidas');
    profileIconTest();
    searchIconTest();

    const { searchIcon } = GET_BY;
    fireEvent.click(searchIcon());

    const searchInput = screen.getByTestId('search-input');
    expect(searchInput).toBeInTheDocument();
  });

  it('o componente header não aparece na página de comida detalhadas', () => {
    renderWithRouter(<ComidaDetails />);
    const { headerTest, profileIconTest, searchIconTest } = TEST_PAGE;
    headerTest('Comida', false);
    searchIconTest(false);
    profileIconTest(false);
  });

  it('o componente header não aparece na página de comida em progesso', () => {
    renderWithRouter(<ComidaInProgress />);
    const { headerTest, profileIconTest, searchIconTest } = TEST_PAGE;
    headerTest('Comida', false);
    searchIconTest(false);
    profileIconTest(false);
  });

  it('o componente header aparece na página de bebidas', () => {
    renderWithRouter(<Bebidas />);
    const { headerTest, profileIconTest, searchIconTest } = TEST_PAGE;
    headerTest('Bebidas');
    profileIconTest();
    searchIconTest();
  });

  it('o componente header não aparece na página de Bebidas detalhadas', () => {
    renderWithRouter(<BebidaDetails />);
    const { headerTest, profileIconTest, searchIconTest } = TEST_PAGE;
    headerTest('Bebida', false);
    searchIconTest(false);
    profileIconTest(false);
  });

  it('o componente header não aparece na página de Bebida em progesso', () => {
    renderWithRouter(<BebidaInProgress />);
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
    renderWithRouter(<ExplorarComidas />);
    const { headerTest, profileIconTest, searchIconTest } = TEST_PAGE;
    headerTest('Explorar Comidas');
    profileIconTest();
    searchIconTest(false);
  });

  it('o componente header aparece na página de explorar Bebidas', () => {
    renderWithRouter(<ExplorarBebidas />);
    const { headerTest, profileIconTest, searchIconTest } = TEST_PAGE;
    headerTest('Explorar Bebidas');
    profileIconTest();
    searchIconTest(false);
  });

  it('o componente header aparece na página de explorar ingredientes', () => {
    renderWithRouter(<ExplorarIngredientes />);
    const { headerTest, profileIconTest, searchIconTest } = TEST_PAGE;
    headerTest('Explorar Ingredientes');
    profileIconTest();
    searchIconTest(false);
  });

  it('o componente header aparece na página de explorar origem', () => {
    renderWithRouter(<ExplorarComidasArea />);
    const { headerTest, profileIconTest, searchIconTest } = TEST_PAGE;
    headerTest('Explorar Origem');
    profileIconTest();
    searchIconTest();
  });

  it('o componente header aparece na página de perfil', () => {
    renderWithRouter(<Perfil />);
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
