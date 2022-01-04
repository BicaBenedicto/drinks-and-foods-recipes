import React, { useState } from 'react';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';

function ShareButton({ url, index }) {
  const [hasCoppied, toggleHasCoppied] = useState(false);

  const copyCodeToClipboar = () => {
    if (url) {
      return navigator.clipboard.writeText(url);
    }
    navigator.clipboard.writeText(window.location.href);
    toggleHasCoppied(true);
  };

  return (
    <div>
      <button
        type="button"
        data-testid={ (index ? `${index}-horizontal-share-btn` : 'share-btn') }
        onClick={ copyCodeToClipboar }
      >
        { hasCoppied ? 'Link copiado!' : <img src={ shareIcon } alt="share icon" /> }
      </button>
      )
    </div>
  );
}

ShareButton.propTypes = {
  url: PropTypes.string.isRequired,
  index: PropTypes.string.isRequired,
};

export default ShareButton;
