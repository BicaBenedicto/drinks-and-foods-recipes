import React, { useContext } from 'react';
import Context from '../services/Context';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header(props) {
  return (
    <header id="header-main">
      <img
        src={ profileIcon }
        alt="profile-icon"
        className="header-profile-icon"
        data-testid="profile-top-btn"
      />
      <h1
        className="header-page-title"
        data-testid="page-title"
      >
        {}
      </h1>
      <button type="button">
        <img
          src={ searchIcon }
          alt="search-icon"
          className="header-search-icon"
          data-testid="search-top-btn"
        />
      </button>
    </header>
  );
}

export default Header;
