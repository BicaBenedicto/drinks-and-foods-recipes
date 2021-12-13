import React from 'react';
import shareIcon from '../images/shareIcon.svg';

function ShareButton() {
  return (
    <div>
      <span data-testid="share-btn">Link copiado!</span>
      <img src={ shareIcon } alt="share icon" />
      )
    </div>
  );
}

export default ShareButton;
