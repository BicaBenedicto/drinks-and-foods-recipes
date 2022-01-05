import React from 'react';
import { useHistory, useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import Footer from '../components/Footer';
import Header from '../components/Header';

function ExplorarBebidas() {
  const { pathname } = useLocation();
  const [, , TYPE] = pathname.split('/');
  const PageType = (TYPE === 'comidas' ? 'Comidas' : 'Bebidas');
  const redirectName = (TYPE === 'comidas' ? 'comidas' : 'bebidas');
  const history = useHistory();

  return (
    <>
      <Header pageTitle={ `Explorar ${PageType}` } />
      <div>
        <button
          type="button"
          data-testid="explore-by-ingredient"
          onClick={ () => history.push(`/explorar/${redirectName}/ingredientes`) }
        >
          Por Ingredientes
        </button>
        { PageType === 'Comidas'
        && (
          <button
            type="button"
            data-testid="explore-by-area"
            onClick={ () => history.push('/explorar/comidas/area') }
          >
            Por Local de Origem
          </button>
        )}
        <button
          type="button"
          data-testid="explore-surprise"
        >
          Me Surpreenda!
        </button>
      </div>
      <Footer />
    </>
  );
}

export default ExplorarBebidas;
