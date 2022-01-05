import React, { useState } from 'react';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';

function ShareButton({ url, index }) {
  const [hasCoppied, toggleHasCoppied] = useState(false);
  console.log(index);
  const id = index >= 0 ? `${index}-horizontal-share-btn` : 'share-btn';
  const copyCodeToClipboar = () => {
    if (url) {
      toggleHasCoppied(true);
      return navigator.clipboard.writeText(url);
    }
    navigator.clipboard.writeText(window.location.href);
    toggleHasCoppied(true);
  };

  return (
    <div>
      <button
        type="button"
        onClick={ copyCodeToClipboar }
      >
        { hasCoppied
          ? 'Link copiado!'
          : <img data-testid={ id } src={ shareIcon } alt="share icon" /> }
      </button>
    </div>
  );
}

ShareButton.propTypes = {
  url: PropTypes.string.isRequired,
  index: PropTypes.string.isRequired,
};

export default ShareButton;
