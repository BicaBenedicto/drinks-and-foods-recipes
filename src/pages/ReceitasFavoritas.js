import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import FavoriteButton from '../components/FavoriteButton';
import Header from '../components/Header';
import ShareButton from '../components/ShareButton';
import Context from '../services/Context';

function renderUrl(type, id) {
  const URL = window.location.href.replace('/receitas-favoritas', '');
  const TYPE = `${type}s`;
  return `${URL}/${TYPE}/${id}`;
}

function ReceitasFavoritas() {
  const [categories, setCategories] = useState('All');
  const { favoriteRecipes: favoriteState } = useContext(Context);
  const favoriteRecipes = favoriteState.favorites;
  const [hasfavoriteRecipes, toggleHasFavoriteRecipes] = useState(false);

  useEffect(() => {
    if (favoriteRecipes) toggleHasFavoriteRecipes(true);
  }, []);

  return (
    <div className="receitas-feitas-page">
      <Header pageTitle="Receitas Favoritas" />
      <div className="buttons-filter">
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
          Foods
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ () => setCategories('bebida') }
        >
          Drinks
        </button>
      </div>
      { hasfavoriteRecipes
        ? favoriteRecipes.filter((recipe) => {
          if (categories === 'All' || recipe.type === categories) return true;
          return false;
        }).map((recipe, index) => (
          <div key={ recipe.id } className="card-item">
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
            <div>
              <div className="categories-text">
                <p
                  className="categories-text"
                  data-testid={ `${index}-horizontal-top-text` }
                >
                  { `${recipe.area || recipe.alcoholicOrNot} - ${recipe.category}` }
                </p>
                { recipe.tags && recipe.tags.map((tag, i) => (
                  <p
                    data-testid={ `${index}-${tag}-horizontal-tag` }
                    key={ i }
                  >
                    {tag}
                  </p>
                ))}
              </div>
              <div>
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
                <ShareButton
                  index={ index }
                  url={ renderUrl(recipe.type, recipe.id) }
                />
              </div>
            </div>
            <FavoriteButton
              index={ index }
              RECIPE_ID={ recipe.id }
            />
          </div>
        ))
        : <h1>Você não tem receitas favoritas ainda!</h1>}
    </div>
  );
}

export default ReceitasFavoritas;
