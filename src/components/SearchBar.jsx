import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { actionFetchIngrediente, actionFetchName,
  actionFetchFirstLetter } from '../redux/actions';

function SearchBar() {
  const [searchFood, setSearchFood] = useState('');
  const { list } = useSelector((state) => state.meal);
  const pageActual = useLocation().pathname;
  const page = pageActual.replace('/', '');
  const dispatch = useDispatch();
  const history = useHistory();

  function handleChange({ target }) {
    if (target.name === 'searchInput') {
      return setSearchFood({ ...searchFood, value: target.value });
    }
    setSearchFood({ ...searchFood, type: target.value });
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (searchFood.type === 'ingrediente') {
      dispatch(actionFetchIngrediente(searchFood.value, page));
    } else if (searchFood.type === 'nome') {
      dispatch(actionFetchName(searchFood.value, page));
    } else if (searchFood.type === 'primeira-letra' && searchFood.value.length === 1) {
      dispatch(actionFetchFirstLetter(searchFood.value, page));
    } else {
      global.alert('Sua busca deve conter somente 1 (um) caracter');
    }
    setSearchFood({ value: '', type: 'nome' });
  }

  function oneRecipe() {
    if (list && list.length === 1) {
      const url = pageActual.includes('comidas')
        ? `${pageActual}/${list[0].idMeal}`
        : `${pageActual}/${list[0].idDrink}`;
      return history.push(url);
    }
  }

  return (
    <div className="search">
      <div className="search-container">
        <form onSubmit={ handleSubmit }>
          <input
            data-testid="search-input"
            type="text"
            placeholder="Buscar Receita"
            name="searchInput"
            value={ searchFood.value }
            onChange={ handleChange }
          />
          <label htmlFor="radio-ingredient">
            <input
              className="radio-input"
              type="radio"
              id="radio-ingredient"
              value="ingrediente"
              name="searchFilter"
              data-testid="ingredient-search-radio"
              onChange={ handleChange }
            />
            Ingrediente
          </label>
          <label htmlFor="radio-name">
            <input
              className="radio-input"
              type="radio"
              id="radio-name"
              value="nome"
              name="searchFilter"
              data-testid="name-search-radio"
              onChange={ handleChange }
            />
            Nome
          </label>
          <label htmlFor="radio-first-letter">
            <input
              className="radio-input"
              type="radio"
              value="primeira-letra"
              name="searchFilter"
              id="radio-first-letter"
              data-testid="first-letter-search-radio"
              onChange={ handleChange }
            />
            Primeira Letra
          </label>
          <button
            data-testid="exec-search-btn"
            className="btt-search"
            type="submit"
          >
            Buscar
          </button>
        </form>
      </div>
      {oneRecipe()}
    </div>
  );
}

export default SearchBar;
