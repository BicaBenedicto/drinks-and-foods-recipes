import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import renderWithRedux from './renderWithRedux';
import { renderWithRouterAndStore } from './renderWithRouterAndRedux';
import App from '../App';
import Comidas from '../pages/Comidas';
import Bebidas from '../pages/Bebidas';
import Details from '../pages/Details';
import InProgress from '../pages/InProgress';
import Explorar from '../pages/Explorar';
import ExplorarBebidasOuComidas from '../pages/ExplorarBebidasOuComidas';
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

describe('Teste 2 do Header na tela de', () => {

  it('o componente header não aparece na página de Bebidas detalhadas', () => {
    renderWithRedux(<Details />);
    const { headerTest, profileIconTest, searchIconTest } = TEST_PAGE;
    headerTest('Bebida', false);
    searchIconTest(false);
    profileIconTest(false);
  });

  it('o componente header não aparece na página de Bebida em progesso', () => {
    renderWithRedux(<InProgress />);
    const { headerTest, profileIconTest, searchIconTest } = TEST_PAGE;
    headerTest('Bebida', false);
    searchIconTest(false);
    profileIconTest(false);
  });

  // it('o componente header aparece na página de explorar', () => {
  //   renderWithRouter(<Explorar />);
  //   const { headerTest, profileIconTest, searchIconTest } = TEST_PAGE;
  //   headerTest('Explorar');
  //   profileIconTest();
  //   searchIconTest(false);
  // });

  // it('o componente header aparece na página de explorar comidas', () => {
  //   renderWithRedux(<ExplorarBebidasOuComidas />);
  //   const { headerTest, profileIconTest, searchIconTest } = TEST_PAGE;
  //   headerTest('Explorar Comidas');
  //   profileIconTest();
  //   searchIconTest(false);
  // });

  // it('o componente header aparece na página de explorar Bebidas', () => {
  //   renderWithRedux(<ExplorarBebidasOuComidas />);
  //   const { headerTest, profileIconTest, searchIconTest } = TEST_PAGE;
  //   headerTest('Explorar Bebidas');
  //   profileIconTest();
  //   searchIconTest(false);
  // });

  // it('o componente header aparece na página de explorar ingredientes', () => {
  //   renderWithRedux(<ExplorarIngredientes />);
  //   const { headerTest, profileIconTest, searchIconTest } = TEST_PAGE;
  //   headerTest('Explorar Ingredientes');
  //   profileIconTest();
  //   searchIconTest(false);
  // });

  // it('o componente header aparece na página de explorar origem', () => {
  //   renderWithRedux(<ExplorarComidasArea />);
  //   const { headerTest, profileIconTest, searchIconTest } = TEST_PAGE;
  //   headerTest('Explorar Origem');
  //   profileIconTest();
  //   searchIconTest();
  // });

  // it('o componente header aparece na página de perfil', () => {
  //   renderWithRedux(<Perfil />);
  //   const { headerTest, profileIconTest, searchIconTest } = TEST_PAGE;
  //   headerTest('Perfil');
  //   profileIconTest();
  //   searchIconTest(false);
  // });

  // it('o componente header aparece na página de receitas favoritas', () => {
  //   renderWithRouter(<ReceitasFavoritas />);
  //   const { headerTest, profileIconTest, searchIconTest } = TEST_PAGE;
  //   headerTest('Receitas Favoritas');
  //   profileIconTest();
  //   searchIconTest(false);
  // });

  // it('o componente header aparece na página de receitas feitas', () => {
  //   renderWithRouter(<ReceitasFeitas />);
  //   const { headerTest, profileIconTest, searchIconTest } = TEST_PAGE;
  //   headerTest('Receitas Feitas');
  //   profileIconTest();
  //   searchIconTest(false);
  // });
});

