import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { actionFetchIngredientList, actionFetchIngrediente } from '../redux/actions';

export default function ExploreIngredientes() {
  const disp = useDispatch();
  const history = useHistory();
  const [strIngredients, setStrIngredient] = useState(null);
  const location = window.location.pathname.split('/')[2];
  const TYPE = (location === 'bebidas');
  const MAX_INGREDIENTS = 12;
  const dbType = TYPE ? 'thecocktaildb' : 'themealdb';

  useEffect(() => {
    disp(actionFetchIngredientList(location));
  }, []);

  const ingredients = useSelector((state) => state.meal.list);

  useEffect(() => {
    if (ingredients.length !== 0) {
      setStrIngredient(ingredients.filter((_, index) => index < MAX_INGREDIENTS));
    }
  }, [ingredients]);
  if (!ingredients || !strIngredients) {
    return <p>Carregando...</p>;
  }

  const onIngredientClick = (name) => {
    disp(actionFetchIngrediente(name, location));
    history.push({ pathname: `/${location}`, state: { fromExplorar: true } });
  };

  return (
    <div className="main-page">
      <Header pageTitle="Explorar Ingredientes" />
      <div className="meals-cards">
        {
          strIngredients.map((value, index) => (
            <div className="card" key={ value.idIngredient }>
              <button
                type="button"
                data-testid={ `${index}-ingredient-card` }
                onClick={ () => onIngredientClick(value.strIngredient
                  || value.strIngredient1) }
                className="foodcard"
              >
                <img
                  src={ `https://www.${dbType}.com/images/ingredients/${
                    value.strIngredient || value.strIngredient1}-Small.png` }
                  alt={ value.strIngredient || value.strIngredient1 }
                  data-testid={ `${index}-card-img` }
                />
                <h5 data-testid={ `${index}-card-name` } className="name-card-food">
                  { value.strIngredient || value.strIngredient1 }
                </h5>
              </button>
            </div>
          ))
        }
      </div>
      <Footer />
    </div>
  );
}
