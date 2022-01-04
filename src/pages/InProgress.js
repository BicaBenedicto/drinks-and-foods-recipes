import React from 'react';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import ShareButton from '../components/ShareButton';
import FavoriteButton from '../components/FavoriteButton';

function InProgress() {
  const { pathname } = useLocation();
  const [, PAGE, ID] = pathname.split('/');
  console.log(ID);
  const itemJson = localStorage.getItem('itemRecipe');
  const item = JSON.parse(itemJson);
  const ingredientsJSON = localStorage.getItem('inProgressRecipes');
  const ingredients = JSON.parse(ingredientsJSON);
  const TYPE = (PAGE === 'comidas' ? 'Meal' : 'Drink');
  const TYPE2 = (PAGE === 'comidas' ? 'meals' : 'cocktails');
  return (
    <>
      <ShareButton />
      <FavoriteButton />
      <h1 data-testid="recipe-title">{ item[`str${TYPE}`] }</h1>
      <img
        src={ item[`str${TYPE}Thumb`] }
        alt={ item[`str${TYPE}`] }
        data-testid="recipe-photo"
        width="100px"
        height="100px"
      />
      <p data-testid="recipe-category">{ item.strCategory }</p>
      <ol>
        {ingredients[TYPE2].ID.map((ingredient, index) => (
          <li key={ index } data-testid={ `${index}-ingredient-step` }>{ ingredient }</li>
        ))}
      </ol>
      <p data-testid="instructions">{ item.strInstructions }</p>
      <button type="button" data-testid="finish-recipe-btn">Finalizar receita</button>
    </>
  );
}

export default InProgress;
