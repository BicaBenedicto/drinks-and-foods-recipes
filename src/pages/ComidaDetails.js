import React from 'react';
import ShareButton from '../components/ShareButton';
import FavoriteButton from '../components/FavoriteButton';
import StartButton from '../components/StartButton';

export default function comidaDetails() {
  return (
    <main>
      <div>
        <img
          data-testid="recipe-photo"
          alt="imagem-da-comida"
          width="100px"
          height="100px"
        />
        <h1 data-testid="recipe-title">titulo da comida</h1>
        <h4 data-testid="recipe-category">
          categoria da comida
        </h4>
        <span data-testid="instructions">intruções</span>
        <iframe
          title="titulounico"
          data-testid="video"
          width="420"
          height="345"
        />
        ))
      </div>
      <ShareButton />
      <FavoriteButton />
      <StartButton />
    </main>
  );
}
