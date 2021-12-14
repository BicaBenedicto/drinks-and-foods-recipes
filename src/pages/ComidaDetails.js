import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { actionFetchID, actionFetchName } from '../redux/actions';
import Recomendation from '../components/Recomendation';
import ShareButton from '../components/ShareButton';
import FavoriteButton from '../components/FavoriteButton';
import StartButton from '../components/StartButton';

export default function ComidaDetails() {
  const disp = useDispatch();
  const { pathname } = useLocation();
  const [, PAGE, ID] = pathname.split('/');
  const [loading, hasLoading] = useState(true);
  const { item, list } = useSelector((state) => state.meal);

  useEffect(() => {
    disp(actionFetchID(ID, PAGE));
    disp(actionFetchName('', (PAGE === 'comidas' ? 'bebidas' : 'comidas')));
  }, []);

  useEffect(() => {
    if (item && list.length !== 0) hasLoading(false);
  });

  return (
    <main>
      { loading ? <h1>Carregando...</h1>
        : (
          <>
            <div>
              <img
                data-testid="recipe-photo"
                alt="imagem-da-comida"
                width="100px"
                height="100px"
              />
              <h1 data-testid="recipe-title">titulo da comida</h1>
              <h4 data-testid="recipe-category">
                categoria da comida
              </h4>
              <span data-testid="instructions">intruções</span>
              <iframe
                title="titulounico"
                data-testid="video"
                width="420"
                height="345"
              />
            </div>
            <ShareButton />
            <FavoriteButton />
            <Recomendation />
            <StartButton />
          </>
        )}
    </main>
  );
}
