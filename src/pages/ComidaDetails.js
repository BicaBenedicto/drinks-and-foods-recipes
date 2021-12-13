import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { actionFetchID, actionFetchName } from '../redux/actions';
import Recomendation from '../components/Recomendation';

function ComidaDetails() {
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
    <div>
      { loading ? <h1>Carregando...</h1>
        : (
          <>
            <h1>detalhes da comida</h1>
            <div>
              Empty
            </div>
            <Recomendation />
          </>
        )}
    </div>
  );
}

export default ComidaDetails;
