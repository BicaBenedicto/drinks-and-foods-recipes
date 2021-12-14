import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export default function IngredientsAndMeasure() {
  const [ingredients, setIngredients] = useState([]);
  const [measure, setMeasure] = useState([]);
  const { ITEM } = useSelector((state) => state.meal);

  useEffect(() => {
    if (ITEM) {
      setIngredients(Object.entries(ITEM)
        .filter((i) => i.includes('strIngredient') && i[1]));
      setMeasure(Object.entries(ITEM)
        .filter((i) => i.includes('strMeasure') && i[1] !== ' '));
    }
  });

  return (
    <ol>
      <h2>Ingredientes</h2>
      {ingredients.map((ingredient, index) => (
        <li
          key="index"
          data-testid={ `${index}-ingredient-name-and-measure` }
        >
          {`${measure[index][1]}${ingredient[1]}`}
        </li>
      ))}
    </ol>
  );
}
