import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import heartEmpty from '../images/whiteHeartIcon.svg';
import heartFull from '../images/blackHeartIcon.svg';
import Context from '../services/Context';

const verifyFavorite = (favoriteItem, ITEM, id, favoriteState) => {
  const { favorites, setFavorites } = favoriteState;
  if (favoriteItem) {
    if (favoriteItem
      .some((favorite) => Number(id) === Number(favorite.id))) {
      const newFavorites = favoriteItem
        .filter((favorite) => Number(favorite.id) !== Number(id));
      localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorites));
      setFavorites(newFavorites);
    } else {
      localStorage.setItem('favoriteRecipes', JSON.stringify([...favoriteItem, ITEM]));
      setFavorites([...favorites, ITEM]);
    }
  } else {
    localStorage.setItem('favoriteRecipes', JSON.stringify([ITEM]));
    setFavorites([ITEM]);
  }
};

export default function FavoriteButton({ index, RECIPE_ID }) {
  const [hasFavorite, changeFavorite] = useState(false);
  const { item, favoriteRecipes } = useContext(Context);
  const id = useParams().id || RECIPE_ID;

  useEffect(() => {
    const favoriteItem = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (favoriteItem && favoriteItem
      .some((favorite) => Number(id) === Number(favorite.id))) {
      changeFavorite(true);
    }
  }, []);

  const onClickFavoriteButton = () => {
    const favoriteItem = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const ITEM = {
      id: item.idMeal || item.idDrink,
      type: (item.idMeal ? 'comida' : 'bebida'),
      area: item.strArea || '',
      category: item.strCategory,
      alcoholicOrNot: item.strAlcoholic || '',
      name: item.strMeal || item.strDrink,
      image: item.strMealThumb || item.strDrinkThumb,
    };

    changeFavorite(!hasFavorite);
    verifyFavorite(favoriteItem, ITEM, id, favoriteRecipes);
  };

  const DATA_TESTID = (index >= 0 ? `${index}-horizontal-favorite-btn` : 'favorite-btn');

  return (
    <button
      type="button"
      onClick={ onClickFavoriteButton }
    >
      {hasFavorite
        ? (
          <img
            src={ heartFull }
            alt="coração preenchido"
            data-testid={ DATA_TESTID }
          />)
        : (
          <img
            src={ heartEmpty }
            alt="coração vazio"
            data-testid={ DATA_TESTID }
          />)}
    </button>
  );
}

FavoriteButton.propTypes = {
  index: PropTypes.string,
  RECIPE_ID: PropTypes.string,
};

FavoriteButton.defaultProps = {
  index: '',
  RECIPE_ID: '',
};
