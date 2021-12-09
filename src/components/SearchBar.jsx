import React, { Component } from 'react';

class SearchBar extends Component {
  render() {
    return (
      <div className="search">
        <div className="search-container">
          <input
            data-testid="search-input"
            type="text"
            placeholder="Buscar Receita"
            name="searchInput"
          />
          <form action="">
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
          </form>
          <button
            data-testid="exec-search-btn"
            className="btt-search"
            type="button"
          >
            Buscar
          </button>
        </div>
      </div>
    );
  }
}

export default SearchBar;
