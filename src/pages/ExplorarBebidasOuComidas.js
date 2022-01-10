import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { actionFetchRandom } from '../redux/actions';

function ExplorarBebidas() {
  const disp = useDispatch();
  const { pathname } = useLocation();
  const history = useHistory();
  const stateRedux = useSelector((state) => state.meal.item[0]);
  const [, , TYPE] = pathname.split('/');
  const nameObj = (TYPE === 'comidas' ? 'idMeal' : 'idDrink');
  const PageType = (TYPE === 'comidas' ? 'Comidas' : 'Bebidas');
  const redirectName = (TYPE === 'comidas' ? 'comidas' : 'bebidas');

  useEffect(() => {
    disp(actionFetchRandom(redirectName));
  }, []);

  function randomRecipeAndRedirect() {
    const idItem = stateRedux[nameObj];
    history.push(`/${redirectName}/${idItem}`);
  }

  return (
    <>
      <Header pageTitle={ `Explorar ${PageType}` } />
      <div className="explorar-page">
        <button
          type="button"
          className="explorar-items"
          data-testid="explore-by-ingredient"
          onClick={ () => history.push(`/explorar/${redirectName}/ingredientes`) }
        >
          Por Ingredientes
        </button>
        { PageType === 'Comidas'
        && (
          <button
            type="button"
            className="explorar-items"
            data-testid="explore-by-area"
            onClick={ () => history.push('/explorar/comidas/area') }
          >
            Por Local de Origem
          </button>
        )}
        <button
          type="button"
          className="explorar-items"
          data-testid="explore-surprise"
          onClick={ randomRecipeAndRedirect }
        >
          Me Surpreenda!
        </button>
      </div>
      <Footer />
    </>
  );
}

export default ExplorarBebidas;
