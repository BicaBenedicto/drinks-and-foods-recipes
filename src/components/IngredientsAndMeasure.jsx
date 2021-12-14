import React, { useContext } from 'react';
import Context from '../services/Context';

export default function IngredientsAndMeasure() {
  const { ingredients, measures } = useContext(Context);
  console.log(ingredients);
  console.log(measures);

  return (
    <ol>
      <h2>Ingredientes</h2>
      {ingredients.map((ingredient, index) => (
        <li
          key="index"
          data-testid={ `${index}-ingredient-name-and-measure` }
        >
          {`${(measures[index]
            ? measures[index][1]
            : measures[0][1])}${ingredient[1]}`}
        </li>
      ))}
    </ol>
  );
}
