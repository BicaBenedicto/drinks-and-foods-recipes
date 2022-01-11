import React from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import Footer from '../components/Footer';
import Header from '../components/Header';
import '../styles/Perfil.css';

function Perfil() {
  const emailJSON = localStorage.getItem('user');
  const email = JSON.parse(emailJSON) || { email: '' };
  const history = useHistory();

  function clearAndRedirect() {
    localStorage.clear();
    history.push('/');
  }
  return (
    <>
      <Header pageTitle="Perfil" />
      <div className="perfil-receitas">
        <h1 data-testid="profile-email">{ email.email }</h1>
        <button
          type="button"
          data-testid="profile-done-btn"
          onClick={ () => history.push('/receitas-feitas') }
        >
          Receitas Feitas
        </button>
        <button
          type="button"
          data-testid="profile-favorite-btn"
          onClick={ () => history.push('/receitas-favoritas') }
        >
          Receitas Favoritas
        </button>
        <button
          type="button"
          data-testid="profile-logout-btn"
          onClick={ clearAndRedirect }
        >
          Sair
        </button>
      </div>
      <Footer />
    </>
  );
}

export default Perfil;
