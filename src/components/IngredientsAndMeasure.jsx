import React, { useContext, useEffect } from 'react';
import Context from '../services/Context';

export default function IngredientsAndMeasure() {
  const { ingredients, measures, inProgressRecipes } = useContext(Context);
  const { setActualIngredients } = inProgressRecipes;

  useEffect(() => {
    setActualIngredients(ingredients.map((ingredient, index) => `${(measures[index]
      ? measures[index]
      : measures[0])} ${ingredient}`));
  }, []);

  return (
    <ol className="ingredients-list">
      <h2>Ingredientes</h2>
      {ingredients.map((ingredient, index) => (
        <li
          key={ index }
          data-testid={ `${index}-ingredient-name-and-measure` }
        >
          {`${(measures[index]
            ? measures[index]
            : measures[0])} ${ingredient}`}
        </li>
      ))}
    </ol>
  );
}
