import React from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import '../styles/explorar.css';

function Explorar() {
  const history = useHistory();
  return (
    <>
      <Header pageTitle="Explorar" />
      <div className="explorar-page">
        <button
          type="button"
          className="explorar"
          data-testid="explore-food"
          onClick={ () => history.push('/explorar/comidas') }
        >
          Explorar Comidas
        </button>
        <button
          type="button"
          className="explorar"
          data-testid="explore-drinks"
          onClick={ () => history.push('/explorar/bebidas') }
        >
          Explorar Bebidas
        </button>
      </div>
      <Footer />
    </>
  );
}

export default Explorar;
