import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import ShareButton from '../components/ShareButton';

function ReceeitasFeitas() {
  const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
  const [categories, setCategories] = useState('All');

  function category(recipe, index) {
    console.log(recipe);
    if (recipe.type === 'comida') {
      return (
        <p
          className="categories-text"
          data-testid={ `${index}-horizontal-top-text` }
        >
          { `${recipe.area} - ${recipe.category}` }
        </p>);
    }
    return (
      <p
        className="categories-text"
        data-testid={ `${index}-horizontal-top-text` }
      >
        { `${recipe.alcoholicOrNot} - ${recipe.category}`}
      </p>);
  }

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
        { doneRecipes.filter((recipe) => {
          if (categories === 'All') return recipe;
          if (recipe.type === categories) return recipe;
          return null;
        }).map((recipe, index) => (
          <div key={ recipe.id }>
            <Link
              className="card"
              key={ recipe.id }
              to={ (recipe.type === 'comida'
                ? `/comidas/${recipe.id}` : `/bebidas/${recipe.id}`) }
            >
              <img
                data-testid={ `${index}-horizontal-image` }
                src={ recipe.image }
                alt={ recipe.name }
              />
            </Link>
            {category(recipe, index)}
            <Link
              className="card"
              key={ recipe.id }
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
              url={ (recipe.type === 'comida'
                ? `http://localhost:3000/comidas/${recipe.id}` : `http://localhost:3000/bebidas/${recipe.id}`) }
              index={ index }
            />
          </div>
        ))}
      </div>
    </>
  );
}

export default ReceeitasFeitas;
