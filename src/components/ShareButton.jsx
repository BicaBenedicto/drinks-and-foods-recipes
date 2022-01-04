import React, { useState } from 'react';
import shareIcon from '../images/shareIcon.svg';

function ShareButton() {
  const [hasCoppied, toggleHasCoppied] = useState(false);

  const copyCodeToClipboar = () => {
    navigator.clipboard.writeText(window.location.href);
    toggleHasCoppied(true);
  };

  return (
    <div>
      <button
        type="button"
        data-testid="share-btn"
        onClick={ copyCodeToClipboar }
      >
        { hasCoppied ? 'Link copiado!' : <img src={ shareIcon } alt="share icon" /> }
      </button>
      )
    </div>
  );
}

export default ShareButton;
