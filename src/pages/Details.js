import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { actionFetchID, actionFetchName } from '../redux/actions';
import Recomendation from '../components/Recomendation';
import ShareButton from '../components/ShareButton';
import FavoriteButton from '../components/FavoriteButton';
import StartButton from '../components/StartButton';
import IngredientsAndMeasure from '../components/IngredientsAndMeasure';

export default function Details() {
  const disp = useDispatch();
  const { pathname } = useLocation();
  const [, PAGE, ID] = pathname.split('/');

  useEffect(() => {
    disp(actionFetchID(ID, PAGE));
    disp(actionFetchName('', (PAGE === 'comidas' ? 'bebidas' : 'comidas')));
  }, []);

  const [loading, hasLoading] = useState(true);
  const { item, list } = useSelector((state) => state.meal);
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
            { item.meals && <iframe
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
