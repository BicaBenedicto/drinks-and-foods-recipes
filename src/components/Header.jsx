import React from 'react';
import PropTypes from 'prop-types';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header(props) {
  const { pageTitle } = props;

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
        {pageTitle}
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

Header.propTypes = {
  pageTitle: PropTypes.string.isRequired,
};

export default Header;
