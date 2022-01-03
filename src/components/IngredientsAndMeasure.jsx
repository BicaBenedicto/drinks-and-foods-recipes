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
