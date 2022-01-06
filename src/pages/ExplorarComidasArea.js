import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { actionFetchFoodArea, actionFetchName } from '../redux/actions/index';

function ExplorarComidasArea() {
  const disp = useDispatch();
  const history = useHistory();
  const [filterArea, setFilterArea] = useState('');
  const NUMBER_RENDER = 12;

  useEffect(() => {
    disp(actionFetchFoodArea('list'));
    disp(actionFetchName('', 'comidas'));
  }, []);

  const storageRedux = useSelector((state) => state.meal);
  const foodArea = [{ strArea: 'All' }].concat(storageRedux.categories);
  console.log(storageRedux);

  return (
    <>
      <Header pageTitle="Explorar Origem" />
      <div>
        {foodArea
          ? (
            <select
              data-testid="explore-by-area-dropdown"
              onChange={ (e) => {
                setFilterArea(e.target.value);
                disp(actionFetchFoodArea('search', e.target.value));
              } }
              value={ filterArea }
            >
              {foodArea.map(({ strArea }, index) => (
                <option
                  key={ index }
                  value={ strArea }
                  data-testid={ `${strArea}-option` }
                >
                  { strArea }
                </option>
              ))}
            </select>
          ) : <span>Carregando...</span>}
      </div>
      <div>
        {storageRedux.list.filter((_value, index) => index < NUMBER_RENDER)
          .map((item, index) => (
            <button
              type="button"
              onClick={ () => history.push(`/comidas/${item.idMeal}`) }
              data-testid={ `${index}-recipe-card` }
              key={ item.idMeal }
              className="card"
            >
              <img
                src={ item.strMealThumb }
                alt={ item.strMeal }
                data-testid={ `${index}-card-img` }
              />
              <span
                data-testid={ `${index}-card-name` }
              >
                { item.strMeal }
              </span>
            </button>
          ))}
      </div>
      <Footer />
    </>
  );
}

export default ExplorarComidasArea;
