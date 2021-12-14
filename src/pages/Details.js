import React, { useEffect, useState, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { actionFetchName } from '../redux/actions';
import Recomendation from '../components/Recomendation';
import ShareButton from '../components/ShareButton';
import FavoriteButton from '../components/FavoriteButton';
import StartButton from '../components/StartButton';
import IngredientsAndMeasure from '../components/IngredientsAndMeasure';
import Context from '../services/Context';

export default function Details() {
  const disp = useDispatch();
  const { pathname } = useLocation();
  const [, PAGE, ID] = pathname.split('/');
  const { item, setItem, setIngredients, setMeasures } = useContext(Context);

  useEffect(() => {
    const renderByID = {
      comidas: 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=',
      bebidas: 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=',
    };

    async function fetchID() {
      const response = await fetch(`${renderByID[PAGE.toLowerCase()]}${ID}`);
      const results = await response.json();
      const output = results.meals || results.drinks;
      console.log(output[0]);
      console.log(Object.entries(output[0]));

      setItem(output[0]);
      setIngredients(Object.entries(output[0])
        .filter((i) => i[0].includes('strIngredient') && i[1]));
      setMeasures(Object.entries(output[0])
        .filter((i) => i[0].includes('strMeasure') && i[1] !== ' ' && i[1]));
    }

    fetchID();
    disp(actionFetchName('', (PAGE === 'comidas' ? 'bebidas' : 'comidas')));
  }, []);

  const [loading, hasLoading] = useState(true);
  const { list } = useSelector((state) => state.meal);
  const TYPE = (PAGE === 'comidas' ? 'Meal' : 'Drink');

  useEffect(() => {
    if (item && list.length !== 0) hasLoading(false);
  });

  return (
    <main>
      { loading ? <h1>Carregando...</h1>
        : (
          <>
            <img
              data-testid="recipe-photo"
              src={ item[`str${TYPE}Thumb`] }
              alt={ item[`str${TYPE}`] }
              width="100px"
              height="100px"
            />
            <h1 data-testid="recipe-title">{ item[`str${TYPE}`] }</h1>
            <h4 data-testid="recipe-category">
              { item.strAlcoholic || item.strCategory }
            </h4>
            <IngredientsAndMeasure />
            <span data-testid="instructions">{ item.strInstructions }</span>
            { PAGE === 'comidas' && <iframe
              title={ item[`str${TYPE}`] }
              data-testid="video"
              src={ `https://www.youtube.com/embed/${item.strYoutube.split('=')[1]}` }
              width="420"
              height="345"
            /> }
            <Recomendation />
            <ShareButton />
            <FavoriteButton />
            <StartButton
              // page={ type }
              idReceita={ `id${TYPE}` }
              // storageType={ storageType }
            />
          </>
        )}
      ;
    </main>
  );
}
