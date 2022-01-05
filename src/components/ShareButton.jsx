import React, { useState } from 'react';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';

function ShareButton({ index }) {
  const [hasCoppied, toggleHasCoppied] = useState(false);
  const id = index >= 0 ? `${index}-horizontal-share-btn` : 'share-btn';
  const copyCodeToClipboar = () => {
    const URL = window.location.href.replace('/in-progress', '');
    navigator.clipboard.writeText(URL);
    toggleHasCoppied(true);
  };

  return (
    <div>
      <button
        type="button"
        data-testid={ id }
        onClick={ copyCodeToClipboar }
      >
        { hasCoppied ? 'Link copiado!' : <img src={ shareIcon } alt="share icon" /> }
      </button>
    </div>
  );
}

ShareButton.propTypes = {
  index: PropTypes.string.isRequired,
};

export default ShareButton;
