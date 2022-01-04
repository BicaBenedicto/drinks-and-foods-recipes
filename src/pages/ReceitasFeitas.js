import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import ShareButton from '../components/ShareButton';

function ReceeitasFeitas() {
  // const  = localStorage.getItem('')
  const doneRecipes = [{
    id: '52977',
    type: 'comidas',
    area: ' area-da-receita-ou-texto-vazio',
    category: 'asdasd',
    alcoholicOrNot: 'alcoholic-ou-non-alcoholic-ou-texto-vazio',
    name: 'nome-da-receita',
    image: 'imagem-da-receita',
    doneDate: 'quando-a-receita-foi-concluida',
    tags: ['0', '1'],
  }];

  const [categories, setCategories] = useState('All');

  function filterCategories({ target }) {
    const checkboxes = document.querySelectorAll('input[type=checkbox]');
    checkboxes.forEach((checkbox) => {
      if (target.id !== checkbox.id) {
        checkbox.checked = false;
      }
      setCategories(target.value);
    });
  }

  return (
    <>
      <Header pageTitle="Receitas Feitas" />
      <div>
        <label htmlFor="All">
          <input
            className="all-categorie"
            data-testid="filter-by-all-btn"
            id="All"
            type="checkbox"
            name="category"
            value="All"
            onClick={ filterCategories }
          />
          All
        </label>
        <label htmlFor="Food">
          <input
            className="food-categorie"
            data-testid="filter-by-food-btn"
            id="Food"
            type="checkbox"
            name="category"
            value="comidas"
            onClick={ filterCategories }
          />
          Food
        </label>
        <label htmlFor="Drinks">
          <input
            className="drinks-categorie"
            data-testid="filter-by-drink-btn"
            id="Drinks"
            type="checkbox"
            name="category"
            value="bebidas"
            onClick={ filterCategories }
          />
          Drinks
        </label>
      </div>
      <div>
        { doneRecipes.filter((recipe) => {
          if (categories === 'All') return recipe;
          if (recipe.type === categories) return recipe;
          return null;
        }).map((recipe, index) => (
          <div key={ recipe.id }>
            <Link
              className="card"
              data-testid={ `${index}-recipe-card` }
              key={ recipe.id }
              to={ `/comidas/${recipe.id}` }
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
              data-testid={ `${index}-recipe-card` }
              key={ recipe.id }
              to={ `/comidas/${recipe.id}` }
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
              url={ (recipe.type === 'comidas'
                ? `/comidas/${recipe.id}` : `/bebidas/${recipe.id}`) }
              index={ index }
            />
          </div>
        ))}
      </div>
    </>
  );
}

export default ReceeitasFeitas;
