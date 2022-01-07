import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';
import '../styles/header.css';

function Header(props) {
  const history = useHistory();
  const redirectToPerfil = () => history.push('/perfil');
  const [renderSearchBar, setRenderSearchBar] = useState(false);
  const { pageTitle } = props;

  const verifyPageActual = () => {
    const explorarVerify = pageTitle.includes('Explorar')
      && !pageTitle.includes('Origem');
    const perfilAndReceitasVerify = pageTitle.includes('Receitas')
      || pageTitle.includes('Perfil');
    if (explorarVerify || perfilAndReceitasVerify) return false;
    return true;
  };

  return (
    <>
      <header className="header-main" id="header-main">
        <button
          type="button"
          onClick={ redirectToPerfil }
          src={ profileIcon }
        >
          <img
            src={ profileIcon }
            alt="profile-icon"
            className="header-profile-icon"
            data-testid="profile-top-btn"
          />
        </button>
        <h1 className="header-page-title" data-testid="page-title">
          { pageTitle }
        </h1>
        { verifyPageActual() && (
          <button
            type="button"
            onClick={ () => setRenderSearchBar(!renderSearchBar) }
          >
            <img
              src={ searchIcon }
              alt="search-icon"
              className="header-search-icon"
              data-testid="search-top-btn"
            />
          </button>)}
      </header>
      { renderSearchBar && <SearchBar /> }
    </>
  );
}

Header.propTypes = {
  pageTitle: PropTypes.string.isRequired,
};

export default Header;
