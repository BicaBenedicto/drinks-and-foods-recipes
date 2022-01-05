import React, { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';
import Header from '../components/Header';
import ShareButton from '../components/ShareButton';

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
          onClick={ () => setCategories('comidas') }
        >
          Food

        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ () => setCategories('bebidas') }
        >
          Drinks

        </button>
        { hasDoneRecipes
          ? doneRecipes.filter((recipe) => {
            if (categories === 'All') return true;
            if (recipe.type === categories) return true;
            return false;
          }).map((recipe, index) => (
            <div key={ recipe.id }>
              <Link
                className="card"
                to={ (recipe.type === 'comidas'
                  ? `/comidas/${recipe.id}` : `/bebidas/${recipe.id}`) }
              >
                <img
                  data-testid={ `${index}-horizontal-image` }
                  src={ recipe.image }
                  alt={ recipe.name }
                />
              </Link>
              <p
                className="categories-text"
                data-testid={ `${index}-horizontal-top-text` }
              >
                { recipe.category }
              </p>
              <Link
                className="card"
                to={ (recipe.type === 'comidas'
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
                {recipe.tags.map((tag) => (
                  <p
                    key={ tag }
                    data-testid={ `${index}-${tag}-horizontal-tag` }
                  >
                    {tag}
                  </p>
                ))}
              </div>
              <ShareButton
                index={ index }
              />
            </div>
          ))
          : <h1>Você não tem receitas feitas ainda!</h1>}
      </div>
    </>
  );
}

export default ReceitasFeitas;
