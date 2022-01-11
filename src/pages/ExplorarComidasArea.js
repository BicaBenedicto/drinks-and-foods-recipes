import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { actionFetchFoodArea, actionFetchName } from '../redux/actions/index';
import '../styles/foodcard.css';

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

  return (
    <>
      <Header pageTitle="Explorar Origem" />
      <div className="main-page">
        {foodArea
          ? (
            <select
              data-testid="explore-by-area-dropdown"
              className="filtro-explorar"
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
      <div className="meals-cards">
        {storageRedux.list.filter((_value, index) => index < NUMBER_RENDER)
          .map((item, index) => (
            <div className="card" key={ item.idMeal }>
              <button
                type="button"
                onClick={ () => history.push(`/comidas/${item.idMeal}`) }
                data-testid={ `${index}-recipe-card` }
                className="foodcard"
              >
                <img
                  src={ item.strMealThumb }
                  alt={ item.strMeal }
                  data-testid={ `${index}-card-img` }
                />
                <span
                  data-testid={ `${index}-card-name` }
                  className="name-card-food"
                >
                  { item.strMeal }
                </span>
              </button>
            </div>
          ))}
      </div>
      <Footer />
    </>
  );
}

export default ExplorarComidasArea;
