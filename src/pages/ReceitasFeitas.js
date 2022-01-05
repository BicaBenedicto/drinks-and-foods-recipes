import React, { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';
import Header from '../components/Header';
import ShareButton from '../components/ShareButton';

function renderUrl(type, id) {
  const URL = window.location.href.replace('/receitas-feitas', '');
  const TYPE = `${type}s`;
  return `${URL}/${TYPE}/${id}`;
}

function ReceitasFeitas() {
  const [categories, setCategories] = useState('All');
  const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
  const [hasDoneRecipes, toggleHasDoneRecipes] = useState(false);

  useEffect(() => {
    if (doneRecipes) toggleHasDoneRecipes(true);
  }, []);

  return (
    <>
      <Header pageTitle="Receitas Feitas" />
      <div>
        <button
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ () => setCategories('All') }
        >
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-food-btn"
          onClick={ () => setCategories('comida') }
        >
          Food
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ () => setCategories('bebida') }
        >
          Drinks
        </button>
        { hasDoneRecipes
          ? doneRecipes.filter((recipe) => {
            if (categories === 'All' || recipe.type === categories) return true;
            return false;
          }).map((recipe, index) => (
            <div key={ recipe.id }>
              <Link
                className="card"
                to={ (recipe.type === 'comida'
                  ? `/comidas/${recipe.id}` : `/bebidas/${recipe.id}`) }
              >
                <img
                  data-testid={ `${index}-horizontal-image` }
                  src={ recipe.image }
                  alt={ recipe.name }
                  className="horizontal-image"
                />
              </Link>
              <p
                className="categories-text"
                data-testid={ `${index}-horizontal-top-text` }
              >
                { `${recipe.area || recipe.alcoholicOrNot} - ${recipe.category}` }
              </p>
              <Link
                className="card"
                to={ (recipe.type === 'comida'
                  ? `/comidas/${recipe.id}` : `/bebidas/${recipe.id}`) }
              >
                <p
                  className="recipes-text"
                  data-testid={ `${index}-horizontal-name` }
                >
                  { recipe.name }
                </p>
              </Link>
              <p
                className="date"
                data-testid={ `${index}-horizontal-done-date` }
              >
                { recipe.doneDate }
              </p>
              <div>
                <p
                  data-testid={ `${index}-${recipe.tags}-horizontal-tag` }
                >
                  {recipe.tags}
                </p>
              </div>
              <ShareButton
                index={ index }
                url={ renderUrl(recipe.type, recipe.id) }
              />
            </div>
          ))
          : <h1>Você não tem receitas feitas ainda!</h1>}
      </div>
    </>
  );
}

export default ReceitasFeitas;
