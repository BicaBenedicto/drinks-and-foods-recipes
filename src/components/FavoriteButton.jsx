import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import heartEmpty from '../images/whiteHeartIcon.svg';
import heartFull from '../images/blackHeartIcon.svg';
import Context from '../services/Context';

export default function FavoriteButton() {
  const [hasFavorite, changeFavorite] = useState(false);
  const { item } = useContext(Context);
  const { id } = useParams();

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
      alcolohicOrNot: item.strAlcoholic || '',
      name: item.strMeal || item.strDrink,
      image: item.strMealThumb || item.strDrinkThumb,
    };

    changeFavorite(!hasFavorite);
    if (favoriteItem) {
      if (favoriteItem
        .some((favorite) => Number(id) === Number(favorite.id))) {
        const newFavorites = favoriteItem
          .filter((favorite) => Number(favorite.id) !== Number(id));
        localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorites));
      } else {
        localStorage.setItem('favoriteRecipes', JSON.stringify([...favoriteItem, ITEM]));
      }
    } else {
      localStorage.setItem('favoriteRecipes', JSON.stringify([ITEM]));
    }
  };

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
            data-testid="favorite-btn"
          />)
        : (
          <img
            src={ heartEmpty }
            alt="coração vazio"
            data-testid="favorite-btn"
          />)}
    </button>
  );
}
