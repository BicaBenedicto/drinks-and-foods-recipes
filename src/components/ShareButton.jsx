import React, { useState } from 'react';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';

function ShareButton({ index, url }) {
  const [hasCoppied, toggleHasCoppied] = useState(false);
  const id = index >= 0 ? `${index}-horizontal-share-btn` : 'share-btn';
  const copyCodeToClipboar = () => {
    const URL = window.location.href.replace('/in-progress', '');
    const URL2 = !url ? URL : url;
    navigator.clipboard.writeText(URL2);
    toggleHasCoppied(true);
  };

  return (
    <div>
      <button
        type="button"
        className="share-button"
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
  index: PropTypes.string.isRequired,
  url: PropTypes.string,
};

ShareButton.defaultProps = {
  url: '',
};

export default ShareButton;
