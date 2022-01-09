import React from 'react';
import { screen, cleanup, fireEvent } from '@testing-library/react';
import { renderWithRouterAndStore } from './renderWithRouterAndRedux';
import App from '../App';
import fetchMock from './mocks/fetch';

const mockFetch = () => {
  jest.spyOn(global, 'fetch')
    .mockImplementation(fetchMock);
};

const expectedFavoriteRecipeSaved = [
  {
    id: '52977',
    type: 'comida',
    area: 'Turkish',
    category: 'Side',
    alcoholicOrNot: '',
    name: 'Corba',
    image: 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg',
  },
];

const FIND_ITEMS = {
  cardImg: '0-card-img',
  cardRecipe: '0-recipe-card',
  favoriteButton: 'favorite-btn',
  heartEmpty: 'coração vazio',
  heartEmptyIcon: 'whiteHeartIcon.svg',
  heartFull: 'coração preenchido',
  heartFullIcon: 'blackHeartIcon.svg',
};

describe('Testes de favorito e página de receitas favoritas', () => {
  beforeEach(mockFetch);
  afterEach(() => {
    cleanup();
  });
  beforeAll(() => {
    localStorage.clear();
  });

  it('a receita de comida possui botão de favoritar', async () => {
    renderWithRouterAndStore(<App />, { route: '/comidas' });
    const receita = await screen.findByTestId(FIND_ITEMS.cardImg);
    expect(receita).toBeInTheDocument();

    const receitaCard = screen.getByTestId(FIND_ITEMS.cardRecipe);
    expect(receitaCard).toBeInTheDocument();
    fireEvent.click(receitaCard);

    const favoriteButton = await screen.findByTestId(FIND_ITEMS.favoriteButton);
    expect(favoriteButton).toBeInTheDocument();
  });

  it('a receita de comida é favoritada ao clicar no botão de favoritar', async () => {
    const { history } = renderWithRouterAndStore(<App />, { route: '/comidas' });
    const receita = await screen.findByTestId(FIND_ITEMS.cardImg);
    expect(receita).toBeInTheDocument();

    const receitaCard = screen.getByTestId(FIND_ITEMS.cardRecipe);
    expect(receitaCard).toBeInTheDocument();
    fireEvent.click(receitaCard);

    const favoriteButton = await screen.findByTestId(FIND_ITEMS.favoriteButton);
    expect(favoriteButton).toBeInTheDocument();
    fireEvent.click(favoriteButton);

    history.push('/receitas-favoritas');

    const userIcon = screen.getByTestId('profile-top-btn');
    expect(userIcon).toBeInTheDocument();

    expect(favoriteButton).not.toBeInTheDocument();

    const receitaCorba = await screen.findByTestId('0-horizontal-top-text');
    expect(receitaCorba).toBeInTheDocument();
  });

  it('a receita de bebida possui botão de favoritar', async () => {
    renderWithRouterAndStore(<App />, { route: '/bebidas' });
    const receita = await screen.findByTestId(FIND_ITEMS.cardImg);
    expect(receita).toBeInTheDocument();

    const receitaCard = screen.getByTestId(FIND_ITEMS.cardRecipe);
    expect(receitaCard).toBeInTheDocument();
    fireEvent.click(receitaCard);

    const favoriteButton = await screen.findByTestId(FIND_ITEMS.favoriteButton);
    expect(favoriteButton).toBeInTheDocument();
  });

  it('a receita de bebida é favoritada ao clicar no botão de favoritar', async () => {
    const { history } = renderWithRouterAndStore(<App />, { route: '/bebidas/15997' });
    const favoriteButton = await screen.findByTestId(FIND_ITEMS.favoriteButton);
    expect(favoriteButton).toBeInTheDocument();
    fireEvent.click(favoriteButton);

    history.push('/receitas-favoritas');

    const userIcon = screen.getByTestId('profile-top-btn');
    expect(userIcon).toBeInTheDocument();

    expect(favoriteButton).not.toBeInTheDocument();

    const receitaCorba = await screen.findByTestId('1-horizontal-top-text');
    expect(receitaCorba).toBeInTheDocument();
  });

  it('os elementos possuem botão de favoritar da forma correta', async () => {
    renderWithRouterAndStore(<App />, { route: '/comidas/53060' });

    const favoriteButton = await screen.findByTestId(FIND_ITEMS.favoriteButton);
    expect(favoriteButton).toBeInTheDocument();
    expect(favoriteButton).toHaveAttribute('alt', FIND_ITEMS.heartEmpty);
    expect(favoriteButton).toHaveAttribute('src', FIND_ITEMS.heartEmptyIcon);

    fireEvent.click(favoriteButton);

    expect(favoriteButton).toBeInTheDocument();
    expect(favoriteButton).toHaveAttribute('alt', FIND_ITEMS.heartFull);
    expect(favoriteButton).toHaveAttribute('src', FIND_ITEMS.heartFullIcon);

    fireEvent.click(favoriteButton);

    expect(favoriteButton).toBeInTheDocument();
    expect(favoriteButton).toHaveAttribute('alt', FIND_ITEMS.heartEmpty);
    expect(favoriteButton).toHaveAttribute('src', FIND_ITEMS.heartEmptyIcon);
  });

  it('os elementos possuem botão de favoritar da forma correta', async () => {
    localStorage.clear();
    renderWithRouterAndStore(<App />, { route: '/comidas/53060' });

    const favoriteButton = await screen.findByTestId(FIND_ITEMS.favoriteButton);
    expect(favoriteButton).toBeInTheDocument();
    expect(favoriteButton).toHaveAttribute('alt', FIND_ITEMS.heartEmpty);
    expect(favoriteButton).toHaveAttribute('src', FIND_ITEMS.heartEmptyIcon);

    fireEvent.click(favoriteButton);

    expect(favoriteButton).toBeInTheDocument();
    expect(favoriteButton).toHaveAttribute('alt', FIND_ITEMS.heartFull);
    expect(favoriteButton).toHaveAttribute('src', FIND_ITEMS.heartFullIcon);

    const receitasSalvas = JSON.parse(localStorage.getItem('favoriteRecipes'));

    expect(receitasSalvas).toEqual(expectedFavoriteRecipeSaved);

    fireEvent.click(favoriteButton);

    const receitasSalvas2 = JSON.parse(localStorage.getItem('favoriteRecipes'));

    expect(receitasSalvas2).not.toEqual(expectedFavoriteRecipeSaved);
  });
});
