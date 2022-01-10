// import React from 'react';
// import userEvent from '@testing-library/user-event';
// import { screen } from '@testing-library/react';
// import renderWithRedux from './renderWithRedux';

// // const SEARCH = 'a';
// const FOOD = 'Arrabiata';
// const NOT_FOOD = '123';
// const SEARCH_TOP_BTN = 'search-top-btn';

// const components = () => ({
//   ingredient: screen.getByTestId('ingredient-search-radio'),
//   nameSearch: screen.getByTestId('name-search-radio'),
//   firstLetter: screen.getByTestId('first-letter-search-radio'),
//   buttonSearch: screen.getByTestId('exec-search-btn'),
//   inputSearch: screen.getByTestId('search-input'),
// });

// global.fetch = jest.fn(() => Promise.resolve({
//   json: () => Promise.resolve({ list: mockApi }),
// }));

// describe('Header Search Bar', () => {
//   test(`Deve existir os data-testids tanto da barra de busca quanto de todos os
//   radio-buttons.`, () => {
//     renderWithRedux(<Comidas />);
//     const buttonTop = screen.getByTestId(SEARCH_TOP_BTN);
//     userEvent.click(buttonTop);
//     const {
//       inputSearch,
//       firstLetter,
//       buttonSearch,
//       nameSearch,
//       ingredient } = components();
//     expect(inputSearch).toBeInTheDocument();
//     expect(firstLetter).toBeInTheDocument();
//     expect(buttonSearch).toBeInTheDocument();
//     expect(nameSearch).toBeInTheDocument();
//     expect(ingredient).toBeInTheDocument();
//   });

//   test(`Redirecione para a tela de detalhes da receita caso apenas uma receita
//    seja encontrada, com o ID da mesma na URL`, async () => {
//     renderWithRedux(<Comidas />);
//     const buttonTop = screen.getByTestId(SEARCH_TOP_BTN);
//     userEvent.click(buttonTop);
//     const {
//       inputSearch,
//       buttonSearch,
//       nameSearch,
//     } = components();
//     userEvent.type(inputSearch, FOOD);
//     userEvent.click(nameSearch);
//     userEvent.click(buttonSearch);
//     const titleRecipe = await screen.findByText('Spicy Arrabiata Penne');
//     expect(titleRecipe).toBeInTheDocument();
//   });

//   test('Exiba um alert caso nenhuma receita seja encontrada', () => {
//     renderWithRedux(<Comidas />);
//     const buttonTop = screen.getByTestId(SEARCH_TOP_BTN);
//     userEvent.click(buttonTop);
//     const {
//       inputSearch,
//       buttonSearch,
//       ingredient,
//     } = components();
//     userEvent.type(inputSearch, NOT_FOOD);
//     userEvent.click(ingredient);
//     userEvent.click(buttonSearch);
//   });
// });
