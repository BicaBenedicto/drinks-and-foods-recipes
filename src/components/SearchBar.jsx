import React, { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import Context from '../services/Context';
import typeAction from '../services/searchBarAction';

function SearchBar() {
  const { searchFood, setSearchFood } = useContext(Context);
  const pageActual = useLocation().pathname;
  const dispatch = useDispatch();
  const history = useHistory();
  const foods = useSelector((state) => state.user.foods);

  function handleChange({ target }) {
    if (target.name === 'searchInput') {
      return setSearchFood({ ...searchFood, value: target.value });
    }
    setSearchFood({ ...searchFood, type: target.value });
  }

  function handleSubmit(event) {
    event.preventDefault();
    const { ingrendiente, nameFood, firstLeter } = typeAction(pageActual);
    if (searchFood.type === 'ingrediente') {
      dispatch(ingrendiente(searchFood.value));
    }
    if (searchFood.type === 'nome') {
      dispatch(nameFood(searchFood.value));
    }
    if (searchFood.type === 'primeira-letra' && searchFood.value.length === 1) {
      dispatch(firstLeter(searchFood.value));
    } else {
      global.alert('Sua busca deve conter somente 1 (um) caracter');
    }
    setSearchFood({ value: '', type: 'nome' });
  }

  function oneRecipe() {
    if (foods && foods.length === 1) {
      const url = pageActual.includes('comidas')
        ? `/comidas/${foods[0].idMeal}`
        : `/bebidas/${foods[0].idDrink}`;
      return history.push(url);
    }
  }

  return (
    <div className="search">
      <div className="search-container">
        <form onChange={ handleChange } onSubmit={ handleSubmit }>
          <input
            data-testid="search-input"
            type="text"
            placeholder="Buscar Receita"
            name="searchInput"
            value={ searchFood.value }
          />
          <label htmlFor="radio-ingredient">
            <input
              className="radio-input"
              type="radio"
              id="radio-ingredient"
              value="ingrediente"
              name="searchFilter"
              data-testid="ingredient-search-radio"
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
