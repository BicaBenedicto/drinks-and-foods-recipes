import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import './Recomendation.css';

function ComidaDetails() {
  const { pathname } = useLocation();
  const [, PAGE] = pathname.split('/');

  const TYPE = (PAGE === 'comidas' ? 'Drink' : 'Meal');
  const MAX_RECOMENDATION = 6;
  const { list } = useSelector((state) => state.meal);
  const renderList = list.filter((_item, index) => index < MAX_RECOMENDATION);

  return (
    <div className="recomendation">
      { renderList.map((itemList) => (
        <div key={ itemList[`id${TYPE}`] } className="recomendation-item" data-testid="recomendation-card">
          <span>{ itemList[`str${TYPE}`] }</span>
          <img src={ itemList[`str${TYPE}Thumb`] } alt={ itemList[`str${TYPE}`] } />
        </div>
      )) }
    </div>
  );
}

export default ComidaDetails;
