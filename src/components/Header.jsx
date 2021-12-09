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
  const search = useState(true);
  const [renderSearchBar, setRenderSearchBar] = useState(false);
  const { pageTitle } = props;

  return (
    <div>
      <header className="header-main" id="header-main">
        <button
          type="button"
          data-testid="profile-top-btn"
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
        { search && (
          <button type="button">
            <img
              src={ searchIcon }
              alt="search-icon"
              className="header-search-icon"
              data-testid="search-top-btn"
              onClick={ () => setRenderSearchBar(!renderSearchBar) }
            />
          </button>)}
      </header>
      { renderSearchBar && <SearchBar /> }
    </div>
  );
}

Header.propTypes = {
  pageTitle: PropTypes.string.isRequired,
};

export default Header;
